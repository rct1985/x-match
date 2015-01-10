$(document).ready(function(){
  	
	$("p").text("Hello ... jQuery");
	GameScene.init();

	//for
    //FastClick.attach(document.body);

    //for mini
    var attachFastClick = Origami.fastclick;    
    attachFastClick(document.body);

});

var GameScene = {

	gameUI:null,
	gamePause:null,
	gameTutorial:null,
	isTouchEnabled:true,

	init:function(){
		this.initData();
		this.initObjects();
		this.initBg();
		

		//游戏相关
		g_gameMgr.init();
		g_gameMgr.gameScene = this;

		//有存档
		if(g_gameMgr.jsonSaveData[g_config.saveData.key_modeOriginal] != undefined ){
			this.initMapBySaveData();
			//继续上次游戏, 
			if(!g_gameMgr.checkGameOver()){
				cc.log("GameScene showTitleView firstRun_withSD");
				//this.showTitleView(g_config.titleViewPara.firstRun_withSD);
			}
			//存档中游戏已经结束
			else{
				//是最高记录,
				if(g_gameMgr.bNewRecord){
					cc.log("GameScene showTitleView gameOver_withNewR");
					//this.showTitleView(g_config.titleViewPara.gameOver_withNewR);
				}
				//非最高记录
				else{
					cc.log("GameScene showTitleView gameOver_withoutNewR");
					//this.showTitleView(g_config.titleViewPara.gameOver_withoutNewR);
				}
			}
			
		}
		//第一次玩
		else{
			this.initRandomMap();
			cc.log("GameScene showTitleView firstRun_withoutSD");
			//this.showTitleView(g_config.titleViewPara.firstRun_withoutSD);
			this.showGameTutorial();
		}

	},


	//init Data
	initData:function(){

	},

	//失去控制
	loseControl:function(){
		//绑定格子点击事件
		for (var i = 0; i < g_config.gridCount_y; i++) {
			for(var j = 0; j < g_config.gridCount_x; j++){
				//点击事件
				var l_strSuffix = "_click";
				$("#bg_"+i+""+j+l_strSuffix).unbind();
			}
		}	

		this.gameUI.isTouchEnabled=false;
		cc.log('loss control');
		//this.isTouchEnabled = false;
	},

	//得到控制
	onControl:function(){
		var l_gameScene = this;
		//绑定格子点击事件
		for (var i = 0; i < g_config.gridCount_y; i++) {
			for(var j = 0; j < g_config.gridCount_x; j++){
				//点击事件
				var l_strSuffix = "_click";
				$("#bg_"+i+""+j+l_strSuffix).unbind();
				$("#bg_"+i+""+j+l_strSuffix).bind('click', function(event) {
					/* Act on the event */

					var l_strID = $(this).attr("id");
					var l_gridPoint = cc.p(0,0);
					l_gridPoint.y = parseInt(l_strID.substr(3,1));
					l_gridPoint.x = parseInt(l_strID.substr(4,1));
					cc.log("click"+l_gridPoint.x+","+l_gridPoint.y);
					l_gameScene.processClickGrid(l_gridPoint);
				});
			}
		}
		this.gameUI.isTouchEnabled=true;
		cc.log('on control');
		//this.isTouchEnabled = true;
	},

	//初始化HTML元素
	initBg:function(){
		var l_gameScene = this;

		//$("div#game_scene").append('<p>nihao</p>');
		$("div#game_scene").width(640).height(960);
		$("div#game_scene").css({
			"position" : "relative",
			"left" : 0 ,
			"right" : 0,
			"text-align" : "center",
			"margin" : "auto"
			}
			);
		//$("div#game_scene").css("left", 0);
		//$("div#game_scene").css("top", 0);


//		$("div#game_scene").text('some text');

		//背景
		for (var i = 0; i < g_config.gridCount_y; i++) {
			for(var j = 0; j < g_config.gridCount_x; j++){
				$("div#game_scene").append("<div id=bg_"+i+""+j+"></div>");
				$("#bg_"+i+""+j).css("position", "absolute");
				$("#bg_"+i+""+j).css("left", g_gameMgr.getPositionByGrid(cc.p(j,i)).x);
				$("#bg_"+i+""+j).css("top", g_gameMgr.getPositionByGrid(cc.p(j,i)).y);

				var l_strColor = "#"
				if((i+j)%2 == 0){
					l_strColor="#BDDEF0";
				}else{
					l_strColor="#99D2F0";
				}
				$("#bg_"+i+""+j).css("background-color", l_strColor);
				$("#bg_"+i+""+j).width(g_config.coo.gridInterval_x).height(g_config.coo.gridInterval_y);
			}
		}

		//格子点击事件
		for (var i = 0; i < g_config.gridCount_y; i++) {
			for(var j = 0; j < g_config.gridCount_x; j++){
				$("div#game_scene").append("<div id='bg_"+i+""+j+"_click'></div>");
				$("#bg_"+i+""+j+"_click").css("position", "absolute");
				$("#bg_"+i+""+j+"_click").css("left", g_gameMgr.getPositionByGrid(cc.p(j,i)).x);
				$("#bg_"+i+""+j+"_click").css("top", g_gameMgr.getPositionByGrid(cc.p(j,i)).y);
				$("#bg_"+i+""+j+"_click").css("z-index", g_config.zorder.GameTip);
				//$("#bg_"+i+""+j+"_click").css("background-color", "#ff0000");
				$("#bg_"+i+""+j+"_click").width(g_config.coo.gridInterval_x).height(g_config.coo.gridInterval_y);

			}
		}

		this.onControl();
	},

	//initObjects
	initObjects:function(){
		//GameUI
		if(this.gameUI == null){
			cc.log("initGameUI");
			this.gameUI = new GameUI();
			this.gameUI.gameScene = this;
		}
	},

	//弹出暂停界面
	showGamePause:function(iState){
		//GamePause
		if(this.gamePause == null){
			this.loseControl();

			cc.log("initGamePause");
			this.gamePause = new GamePause(iState);
			this.gamePause.gameScene = this;
			this.gamePause.appear();
		}
	},

	//隐藏GamePause
	hideGamePause:function(){
		if(this.gamePause != null){
			this.gamePause.disappear();
			this.gamePause = null;
			this.onControl();
		}
	},

	//弹出教学
	showGameTutorial:function(){
		//GamePause
		if(this.gameTutorial == null){
			this.loseControl();

			cc.log("showGameTutorial");
			this.gameTutorial = new GameTutorial();
			this.gameTutorial.gameScene = this;
			this.gameTutorial.appear();
		}
	},

	//隐藏教学
	hideGameTutorial:function(){
		if(this.gameTutorial != null){
			this.gameTutorial.disappear();
			this.gameTutorial = null;
			this.onControl();
		}
	},

	initRandomMap:function(){
		cc.log("initRandomMap WithoutSD");
		g_gameMgr.clearGame();
		this.addBricksByNum(g_config.brickNum_init);
		this.updateUI();

		//每次开局请求一次
		g_gameMgr.requestVisitCount();
	},


	//根据存档加载地图
	initMapBySaveData:function(){
		g_gameMgr.loadSaveDataOfThisGame();
		for(var i=0; i<g_config.gridCount_y; i++){
			for(var j=0; j<g_config.gridCount_x; j++){
				var l_gridPoint = cc.p(j, i);
				var l_iNumber = g_gameMgr.getSaveLoadNumByGrid(l_gridPoint);
				if(l_iNumber >= 0){
					this.addBrick(l_iNumber, l_gridPoint);
				}
			}
		}
		this.updateUI();

		//加载上次存档请求一次
		g_gameMgr.requestVisitCount();
	},

	//每回合
	addBricksEveryRound:function(){
		this.addBricksByNum(g_config.brickNum_everyRound);
	},
	// 随机增加一定数目的Brick
	 addBricksByNum:function(p_iCount){
		var l_iBrickNum = 0;
		var l_arrayNum_basic = [1,2];
		// var l_arrayNum_basic = [1,2,3,4,5,6,7,8,9];
		while(l_iBrickNum < p_iCount){
			var l_iGridX = 0;
			var l_iGridY = 0;
			var l_gridPoint;
			do{
				var l_iRandomIndex = g_tools.random(0, g_config.gridCount_total);
				l_iGridX = Math.floor(l_iRandomIndex%g_config.gridCount_x);
				l_iGridY = Math.floor(l_iRandomIndex/g_config.gridCount_x);

			}while(g_gameMgr.arrayGrid[l_iGridY][l_iGridX].gameBrick != null);

			var l_iIndex = g_tools.random(0, l_arrayNum_basic.length);
			var l_iNum = l_arrayNum_basic[l_iIndex];
			var l_gameBrick = this.addBrick(l_iNum, cc.p(l_iGridX, l_iGridY));
			
			l_iBrickNum ++;
		}
	},

	// 增加一个Brick进入场景
	addBrick:function(p_iNum, p_gridPoint){
		var l_strIDBrick = "brick_"+p_gridPoint.y+""+p_gridPoint.x;
		var l_iBrickIndex = g_gameMgr.arrayGrid[p_gridPoint.y][p_gridPoint.x].brickIndex + 1;
		l_strIDBrick = l_strIDBrick + "_" + l_iBrickIndex;
		var l_gameBrick = new GameBrick(p_iNum, l_strIDBrick);
		l_gameBrick.leftOriginal = g_gameMgr.getPositionByGrid(p_gridPoint).x + 5;
		l_gameBrick.topOriginal = g_gameMgr.getPositionByGrid(p_gridPoint).y + 5;
		g_gameMgr.addBrick(l_gameBrick, p_gridPoint);

		$("div#game_scene").append("<div id='"+l_strIDBrick+"'></div>");
		$("#"+l_strIDBrick).addClass("brick_back");
		$("#"+l_strIDBrick).css("left", l_gameBrick.leftOriginal);
		$("#"+l_strIDBrick).css("top", l_gameBrick.topOriginal);

		// $("#"+l_strIDBrick).css("position", "absolute");
		// $("#"+l_strIDBrick).css("-moz-border-radius", "15px");
		// $("#"+l_strIDBrick).css("-webkit-border-radius", "15px");
		//$("#"+l_strIDBrick).corner();
		//$("#"+l_strIDBrick).css("display", "none");

		var l_strColor = g_gameMgr.getNumberColor(p_iNum);
		$("#"+l_strIDBrick).css("background-color", l_strColor);

		if(p_iNum == g_config.numX){
			var l_strIDBg = l_strIDBrick+"_bg";
			$("#"+l_strIDBrick).append("<img id='"+l_strIDBg+"' src="+res.brick_num_x_png+"></img>");
			$("#"+l_strIDBg).addClass("brick_x");
		}
		else{
			//Number
			var l_strIDNumber = l_strIDBrick+"_number";
			$("#"+l_strIDBrick).append("<div id='"+l_strIDNumber+"'/>");
			$("#"+l_strIDNumber).addClass("brick_number");
			$("#"+l_strIDNumber).text(p_iNum);
		}
		l_gameBrick.showAppearAction();

		//cc.log("add brick");
		//设置半透明
		//$("#"+l_strIDBrick).css("opacity", 0.2);

		return l_strIDBrick;
	},


	/*
	 * 移除连接点的brick
	 * 
	 * p_gridPoint_clicked, 因为这个点为，而移除
	 */
	removeConnectPoint:function(p_gridPoint_clicked){
		for(var i=0; i<g_config.directCount; i++){
			var l_gridPoint = g_gameMgr.arrayConnectPoint[i];
			if(l_gridPoint != null){
				this.removeBrick(l_gridPoint, p_gridPoint_clicked);
			}
		}
	},

	/*
	 * 移除一个brick
	 * 
	 * p_gridPoint: 要移除的点
	 * p_gridPoint_clicked: 因为这里的点而移除
	 */
	removeBrick:function(p_gridPoint, p_gridPoint_clicked){
		var l_brick = g_gameMgr.getBrick(p_gridPoint);
		if(l_brick != null){
			//l_brick.removeFromParent();
			var l_targetPoint = g_gameMgr.getPositionByGrid(p_gridPoint_clicked);
			l_brick.showDisAppearAction(l_targetPoint);
			g_gameMgr.removeBrick(p_gridPoint);
		}else{
			cc.log("error here removeBrick");
		}
	},
	//处理点击格子
	processClickGrid:function(p_gridPoint){
		var l_targetNum = g_gameMgr.clickGrid(p_gridPoint);
		cc.log("--<"+p_gridPoint.x+","+p_gridPoint.y+"> --> "+l_targetNum);
		//消除了Crossing
		if(l_targetNum >= g_config.numMultiX){
			this.removeConnectPoint(p_gridPoint);
			
			var l_iScoreThisRound = (l_targetNum - g_config.numMultiX)/10;
			
			//增加round
			g_gameMgr.addRound();
			g_gameMgr.addCurrentScore(l_iScoreThisRound);
			cc.log("score:"+ g_gameMgr.currentScore);
		}
		//正常消除普通数字
		else if(l_targetNum >= g_config.numStart && l_targetNum <= g_config.numX){
			this.removeConnectPoint(p_gridPoint);
			this.addBrick(l_targetNum, p_gridPoint);
			this.addBricksEveryRound();
			
			//增加round
			g_gameMgr.addRound();
		}
		//不能点击
		else{
			//this.addBrick(l_targetNum, p_gridPoint);
			this.showForbid(p_gridPoint);
		}
		
		this.updateUI();
		
		//判断结束
		if(g_gameMgr.checkGameOver()){
			//this.dealGameBeforeStart(false);
			if(g_gameMgr.bNewRecord){
				cc.log("GameScene showTitleView gameOver_withNewR");
				//this.showTitleView(g_config.titleViewPara.gameOver_withNewR);
				this.showGamePause(g_config.statePause.spEndNew);
			}
			else{
				cc.log("GameScene showTitleView gameOver_withoutNewR");
				//this.showTitleView(g_config.titleViewPara.gameOver_withoutNewR);
				this.showGamePause(g_config.statePause.spEnd);
			}
		}

		//存档
		g_gameMgr.saveData();
	},

	//不能点击动画
	showForbid:function(p_gridPoint){
		var l_position = g_gameMgr.getPositionByGrid(p_gridPoint);
		$("div#game_scene").append("<img id='forbid' src='" + res.forbid_png + "'/>");
		$("#forbid").css({
				"position" : "absolute",
				"left" : l_position.x,
				"top" : l_position.y,
				"z-index" : g_config.zorder.GameTip,
			});
		$("#forbid").animate({
			left:l_position.x,
			top:l_position.y,
			},
			200, function() {
				$(this).remove();
			}
		);
	},
	
	// removeForbid:function(p_object){
	// 	p_object.removeFromParent();
	// },
	
	//更新UI
	updateUI:function(){
		//cc.log(this.gameUI.updateRound);
		if(this.gameUI != null){
			this.gameUI.updateRound();
			this.gameUI.updateScore();
		}
	},
}
