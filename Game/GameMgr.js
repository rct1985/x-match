var cc = {
	p:function(x,y){
		if (x == undefined)
        return {x: 0, y: 0};
    if (y == undefined)
        return {x: x.x, y: x.y};
    return {x:x, y:y};
	},

	color:function(r,g,b){
		if(r == undefined || g== undefined || b == undefined){
			cc.log("cc.color error here");
		}else{
			var l_strR = r.toString(16);
			if(l_strR.length < 2){
				l_strR = "0"+l_strR;
			}
			var l_strG = g.toString(16);
			if(l_strG.length < 2){
				l_strG = "0"+l_strG;
			}
			var l_strB = b.toString(16);
			if(l_strB.length < 2){
				l_strB = "0"+l_strB;
			}
			return "#"+l_strR+l_strG+l_strB;
		}
	},

	log:function(p_strContent){
		console.log(p_strContent);
	},


}

var g_gameMgr = {
	//游戏场景
	gameScene:null,

	// 描画数组
	arrayGrid:null,
	// 统计数组
	arrayNumCount:null,
	arrayConnectPoint:null,
	
	// 存档数据
	jsonSaveData:null,
	
	//String数据
	jsonString:null,
	
	_lang:null,

	// 当前分数
	currentScore:0,
	
	// 最高分数
	maxScore:0,
	
	// 回合数
	round:0,
	//本局是否破纪录
	bNewRecord:false,

	//全球总共来访者次数
	globalVisitorAll:0,
	//今日来访者次数
	globalVisitorToday:0,
	
	// 初始化
	init:function(){
		_lang=window.navigator.language.toLowerCase();
		console.log("GameMgr init begin");
		this.arrayGrid = new Array();
		this.arrayNumCount = new Array();
		this.arrayConnectPoint = new Array();
		console.log("loadData");
		this.loadData();
		this.initMapData();
		this.clearGame();
		console.log("GameMgr init end");
	},
	
	readString:function(key){
		if(_lang.substr(0,2)=="zh"){
			return g_string;
		}
	},

	// 初始二维数组
	initMapData:function(){

		console.log("GameMgr init map");
		for (var i = 0; i < g_config.gridCount_y; i++) {
			this.arrayGrid[i] = new Array();
			for (var j=0; j<g_config.gridCount_x; j++){
				this.arrayGrid[i][j] = new GameGrid();
			}
		}
	},
	
	/*
	 * 根据gridPoint得到 位置
	 */
	getPositionByGrid:function(p_gridPoint){
		return cc.p(
				(g_config.coo.gridLeft + p_gridPoint.x * g_config.coo.gridInterval_x),
				(g_config.coo.gridTop + p_gridPoint.y * g_config.coo.gridInterval_y)
		);
	},

	/*
	 * 根据位置得到Brick
	 */
	getBrick:function(p_gridPoint){
		if(this.arrayGrid[p_gridPoint.y][p_gridPoint.x].gameBrick != null){
			return this.arrayGrid[p_gridPoint.y][p_gridPoint.x].gameBrick;
		}else{
			return null;
		}
	},

	/*
	 * 根据数据得到颜色
	 */
	 getNumberColor:function(p_iNumber){
		var l_color = cc.color(255, 255, 255, 255);
		switch(p_iNumber){
		case 0:
			l_color = cc.color(255,0,0,255);
			break;
		case 1:
			l_color = cc.color(229,120,13,255);
			break;
		case 2:
			l_color = cc.color(43,188,215,255);
			break;
		case 3:
			l_color = cc.color(217,180,37,255);
			break;
		case 4:
			l_color = cc.color(207,85,191,255);
			break;
		case 5:
			l_color = cc.color(131,53,111,255);
			break;
		case 6:
			l_color = cc.color(160,189,46,255);
			break;
		case 7:
			l_color = cc.color(43,139,14,255);
			break;
		case 8:
			l_color = cc.color(155,79,11,255);
			break;
		case 9:
			l_color = cc.color(79,100,125,255);
			break;
		case 10:
			l_color = cc.color(255,255,255,255);
			break;
		default:
			break;
		}
		return l_color;
	},

	/*
	 * 增加一个Brick数据 成功 return true 失败 return false
	 */
	addBrick:function(p_gameBrick, p_gridPoint){
		if(this.arrayGrid[p_gridPoint.y][p_gridPoint.x].gameBrick == null){
			this.arrayGrid[p_gridPoint.y][p_gridPoint.x].addGameBrick(p_gameBrick);
			return true;
		}else{
			console.log("error here GameMgr_addBrick");
			return false;
		}
	},

	/*
	 * 增加一个Brick数据
	 * 
	 * return value: true 增加成功 false 增加失败
	 */
	removeBrick:function(p_gridPoint){
		if(this.arrayGrid[p_gridPoint.y][p_gridPoint.x].gameBrick != null){
			this.arrayGrid[p_gridPoint.y][p_gridPoint.x].removeGameBrick();
			return true;
		}else{
			console.log("error here GameMgr_removeBrick");
			return false;
		}
	},

	/*
	 * 点击格子处理
	 * 
	 * return value: -1 : 不能点击 0~9: 点击完得数 10: 得到一个X 20: 消除两个X
	 */
	clickGrid:function(p_gridPoint){
		this.clearNumCountArray();
		this.clearConnectPointArray();
		// 不为空的话直接返回 -1
		if(! this.isGridEmpty(p_gridPoint)){
			return g_config.empty;
		}else{
			this.calculateByGrid(p_gridPoint);
	
			// 能点击
			if(this.canGridClicked(p_gridPoint)){
				var l_targetNum = this.calculateTargetNum();
				return l_targetNum;
			}
			// 不能点击
			else{
				return g_config.empty;
			}
		}
	},

	// 清理统计数组
	clearNumCountArray:function(){
		for (var i = 0; i <= g_config.numX; i++) {
			this.arrayNumCount[i] = 0;
		}
	},
	// 清理连接点数组
	clearConnectPointArray:function(){
		// this.arrayConnectPoint = new Array();
		for(var i=0; i<g_config.directCount; i++){
			this.arrayConnectPoint[i] = null;
		}
	},

	// 判断格子为空
	isGridEmpty:function(p_gridPoint){
		return (this.arrayGrid[p_gridPoint.y][p_gridPoint.x].gameBrick == null);
	},

	// 判断能不能点击，它不能独立工作，前面要加calculateByGrid
	canGridClicked:function(p_gridPoint){
		var l_result = false;
		// 如果这一点上有数，不能点击
		if(! this.isGridEmpty(p_gridPoint)){
			return l_result;
		}
		var l_strTemp = "";
		for (var i = 0; i <= g_config.numX; i++) {
			l_strTemp += this.arrayNumCount[i]+",";
			// 多个一样的
			if(this.arrayNumCount[i] > 1){
				l_result = true;
				break;
			}
		}
		return l_result;
	},

	// 点击之后的目标值
	calculateTargetNum:function(){
		var l_targetNum = 0;
		for (var i = 0; i <= g_config.numX; i++) {
			var l_iNum = i;
			// 多个一样的
			if(this.arrayNumCount[i] > 1){
				l_targetNum += this.arrayNumCount[i]*l_iNum;
				// 消除了Crossing
				if(l_iNum == g_config.numX){
					// 120, 130, 140分别对应 2X, 3X, 4X
					l_targetNum = g_config.numMultiX + (g_config.numX * this.arrayNumCount[i]);
					return l_targetNum;
				}

			}
		}
		if(l_targetNum > g_config.numX){
			l_targetNum = g_config.numX;
		}
		return l_targetNum;
	},

	// 统计这一点四周的数字
	calculateByGrid:function(p_gridPoint){
		var l_iConnectPointIndex = 0;

		// toward left
		for (var i = p_gridPoint.x-1; i >=0; i--) {
			if(this.arrayGrid[p_gridPoint.y][i].gameBrick != null){
				var l_iNum = this.arrayGrid[p_gridPoint.y][i].gameBrick.number;
				this.arrayNumCount[l_iNum]++;
				// 记录位置
				this.arrayConnectPoint[l_iConnectPointIndex++] = cc.p(i, p_gridPoint.y);
				break;
			}
		};
		// toward right
		for (var i = p_gridPoint.x+1; i < g_config.gridCount_x; i++) {
			if(this.arrayGrid[p_gridPoint.y][i].gameBrick != null){
				var l_iNum = this.arrayGrid[p_gridPoint.y][i].gameBrick.number;
				this.arrayNumCount[l_iNum]++;
				// 记录位置
				this.arrayConnectPoint[l_iConnectPointIndex++] = cc.p(i, p_gridPoint.y);
				break;
			}
		};
		// toward up
		for (var i = p_gridPoint.y-1; i >=0; i--) {
			if(this.arrayGrid[i][p_gridPoint.x].gameBrick != null){
				var l_iNum = this.arrayGrid[i][p_gridPoint.x].gameBrick.number;
				this.arrayNumCount[l_iNum]++;
				// 记录位置
				this.arrayConnectPoint[l_iConnectPointIndex++] = cc.p(p_gridPoint.x, i);
				break;
			}
		};
		// toward down
		for (var i = p_gridPoint.y+1; i < g_config.gridCount_y; i++) {
			if(this.arrayGrid[i][p_gridPoint.x].gameBrick != null){
				var l_iNum = this.arrayGrid[i][p_gridPoint.x].gameBrick.number;
				this.arrayNumCount[l_iNum]++;
				// 记录位置
				this.arrayConnectPoint[l_iConnectPointIndex++] = cc.p(p_gridPoint.x, i);
				break;
			}
		};

		// 输出connectPoint
		var l_strTemp = "";
		for(var i=0; i<g_config.directCount; i++){
			var l_gridPoint = this.arrayConnectPoint[i];
			if(l_gridPoint != null){
				var l_iNum = this.getBrick(l_gridPoint).number;
				l_strTemp += (l_gridPoint.x+"-"+l_gridPoint.y+":"+l_iNum+"; ");
			}
		}
		console.log("connectPoint before: "+l_strTemp);

                // 排除单一的点位置
		for(var i=0; i<g_config.directCount; i++){
			var l_pointA = this.arrayConnectPoint[i];
			// A点不为空
			if(l_pointA != null){
				var l_numA = this.getBrick(l_pointA).number;
				var l_bRemove = true;
				for(var j=0; j<g_config.directCount; j++){
					var l_pointB = this.arrayConnectPoint[j];
					// B点不一样,且不为空
					if(i != j && l_pointB != null){
						var l_numB = this.getBrick(l_pointB).number;
						if(l_numA == l_numB){
							l_bRemove = false;
							break;
						}
					}
				}
				if(l_bRemove){
					this.arrayConnectPoint[i] = null;
				}
			}
		}

		// 输出connectPoint
		var l_strTemp = "";
		for(var i=0; i<g_config.directCount; i++){
			var l_gridPoint = this.arrayConnectPoint[i];
			if(l_gridPoint != null){
				l_strTemp += (l_gridPoint.x+","+l_gridPoint.y+"; ");
			}
		}
		console.log("connectPoint after: "+l_strTemp);
	},
	
	// 判断游戏结束
	checkGameOver:function(){
		
		
		// var l_bResult = true;
		for(var i=0; i<g_config.gridCount_y; i++){
			for(var j=0; j<g_config.gridCount_x; j++){
				var l_gridPoint = cc.p(i, j);
				//对每个点都要算一遍
				this.clearNumCountArray();
				this.clearConnectPointArray();
				this.calculateByGrid(l_gridPoint);
				if(this.canGridClicked(l_gridPoint)){
					return false;
				}
			}
		}
		return true;
	},
	
	
	// 一局前清理
	clearGame:function(){
		console.log("GameMgr clearGame...");
		// 移除所有Brick
		for(var i=0; i<g_config.gridCount_y; i++){
			for(var j=0; j<g_config.gridCount_x; j++){
				var l_gridPoint = cc.p(j, i);
				
				if(this.getBrick(l_gridPoint) != null){
					//TODO
					this.getBrick(l_gridPoint).removeMyself();
					this.arrayGrid[i][j].removeGameBrick();
				}
			}
		}
		
		// 初始化分数
		this.currentScore = 0;
		// this.maxScore = 0;
		this.round = 0;
		this.bNewRecord=false;
	},
	
	// 增加回合数
	addRound:function(){
		this.round ++;
	},
	
	// 增加分数
	addCurrentScore:function(p_iScore){
		this.currentScore += p_iScore;
		
		// 超过最大值的话，更新最大值
		if(this.currentScore > this.maxScore){
			bNewRecord=true;
			this.maxScore = this.currentScore;
		}
	},
	
	/*
	 * 向服务器请求全局访问次数和今日访问次数
	 * 
	 * 前端需求:
	 * 1.POST请求
	 * 2.内容为json格式，(暂时为空请求)
	 * 
	 * 后端返回:
	 * 一个整型数字
	 */
	requestVisitCount:function(){
		var l_gameMgr = this;
		var l_httpRequest=$.ajax({
			url:"http://www.geekmouse.net/Server_mx_product/web_gameInterface.php",
			async:true,
			success:function(p_data){
				cc.log(p_data);
				var l_strResponse = p_data;
				var l_jsonObj = JSON.parse(l_strResponse);
				l_gameMgr.globalVisitorAll = l_jsonObj["global"];
				l_gameMgr.globalVisitorToday = l_jsonObj["today"];

				if(l_gameMgr.gameScene != null){
					l_gameMgr.gameScene.gameUI.updateVisitor();
				}
			}
			});
		
	},

	//当前局读取档
	loadSaveDataOfThisGame:function(){
		console.log("GameMgr loadSaveDataOfThisGame");
		var l_jsonData = this.jsonSaveData[g_config.saveData.key_modeOriginal];
		if(l_jsonData == undefined){
			console.log("GameMgr loadSaveDataOfThisGame error ");
		}
		this.round = l_jsonData[g_config.saveData.key_round];
		this.currentScore = l_jsonData[g_config.saveData.key_currentScore];
		this.maxScore = l_jsonData[g_config.saveData.key_maxScore];
		this.bNewRecord = (l_jsonData[g_config.saveData.key_isNewRecord] == 1);
		this.globalVisitorAll = l_jsonData[g_config.saveData.key_globalVisit];
		this.globalVisitorToday = l_jsonData[g_config.saveData.key_todayVisit];
	},
	
	//得到存档下当前局面某个格子里的数
	getSaveLoadNumByGrid:function(p_gridPoint){
		var l_jsonData = this.jsonSaveData[g_config.saveData.key_modeOriginal];
		return l_jsonData[g_config.saveData.key_status][p_gridPoint.y][p_gridPoint.x];
	},
	
	// 读档
	loadData:function(){
		console.log("GameMgr loadData");
		if(window.localStorage){
			var l_strJsonData = window.localStorage.getItem(g_config.saveData.key_root);
			if(l_strJsonData == undefined || l_strJsonData == ""){
				console.log("first run no saveData exist");
				this.jsonSaveData = {};
			}else{
				console.log("load data:"+l_strJsonData);
				this.jsonSaveData = JSON.parse(l_strJsonData);
				console.log("load Data success");
			}
		}else{
			cc.log("not support localStorage");
		}
	},
	
	parseJson:function(p_key, p_value){
		return p_value;
	},

	// 存档
	saveData:function(){
		if(this.jsonSaveData == null){
			this.jsonSaveData = {};
		}
		if(this.jsonSaveData[g_config.saveData.key_modeOriginal] == undefined){
			this.jsonSaveData[g_config.saveData.key_modeOriginal] = {};
		}
		var l_jsonData = this.jsonSaveData[g_config.saveData.key_modeOriginal];
		
		// 赋值
		l_jsonData[g_config.saveData.key_maxScore] = this.maxScore;
		l_jsonData[g_config.saveData.key_round] = this.round;
		l_jsonData[g_config.saveData.key_currentScore] = this.currentScore;
		if(this.globalVisitorAll > 0 && this.globalVisitorToday > 0){
			l_jsonData[g_config.saveData.key_globalVisit] = this.globalVisitorAll;
			l_jsonData[g_config.saveData.key_todayVisit] = this.globalVisitorToday;
		}
		if(this.bNewRecord){
			l_jsonData[g_config.saveData.key_isNewRecord] = 1;
		}else{
			l_jsonData[g_config.saveData.key_isNewRecord] = 0;
		}
		l_jsonData[g_config.saveData.key_status] = new Array();
		for(var i=0;i<g_config.gridCount_y;i++){
			// 第一次存档
			if((l_jsonData[g_config.saveData.key_status][i] == undefined) || (l_jsonData[g_config.saveData.key_status][i].length == 0)){
				l_jsonData[g_config.saveData.key_status][i] = new Array();
			}
			for(var j=0;j<g_config.gridCount_x;j++){
				var l_iNumber = g_config.empty;
				if(this.arrayGrid[i][j].gameBrick != null){
					l_iNumber = this.arrayGrid[i][j].gameBrick.number;
				}
				l_jsonData[g_config.saveData.key_status][i][j] = l_iNumber;
			}
		}

		// Json.parse
		var l_strJsonData = JSON.stringify(this.jsonSaveData);
		console.log("savedata: " + l_strJsonData);
		
		window.localStorage.setItem(g_config.saveData.key_root, l_strJsonData);
	},
	
	

};
