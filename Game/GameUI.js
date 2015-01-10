//GameLayer
 function GameUI(){
	//游戏场景引用
 	this.gameScene = null;
 	this.isTouchEnabled=true;


	
	this.initObjects = function(){
		$("div#game_scene").append("<div id='game_ui'>");
		//Title "X-Match"
		$("#game_ui").append("<div id='title' class='title'>X-MATCH</div>");
		//Current Score
		$("#game_ui").append("<div id='current_score' class='score'>0</div>");
		//Max Score
		$("#game_ui").append("<div id='max_score' class='stat'>BEST</div>");
		//Moves
		$("#game_ui").append("<div id='moves' class='stat'>MOVES</div>");
	}

	//初始化底下的按钮
	this.initOptions = function(){
		var l_gameUI = this;

		//Options div
		$("#game_ui").append("<div id='options_bg'></div>");
		$("#options_bg").addClass("button_option");
		$("#options_bg").click(function(event){
			if(l_gameUI.gameScene != null && l_gameUI.isTouchEnabled){
				l_gameUI.gameScene.showGamePause(g_config.statePause.spManual);
			}
		});
		$("#options_bg").append("<img id='options_img' src='res/UI/mxGear.png'></img>");

		var l_btY=810;
		var l_btXInt=100;
		var l_startX=5;
		//FB按钮
		$("#game_ui").append("<img id='bt_fb' src='res/UI/mxIconFB.png'></img>");
		$("#bt_fb").addClass("bt_sns").css({left: l_startX,top: l_btY}).click(function(event){
			if (l_gameUI.isTouchEnabled) {
				window.open("https://www.facebook.com/geekmouse.xmatch");
			}
		});
		//Twitter按钮
		$("#game_ui").append("<img id='bt_tw' src='res/UI/mxIconTwitter.png'></img>");
		$("#bt_tw").addClass("bt_sns").css({left: l_btXInt+l_startX,top: l_btY}).click(function(event){
			if (l_gameUI.isTouchEnabled) {
				window.open("https://twitter.com/geek_mouse");
			}
		});
		//Paypal按钮
		$("#game_ui").append("<img id='bt_pp' src='res/UI/mxIconPaypal.png'></img>");
		$("#bt_pp").addClass("bt_sns").css({left: l_btXInt*2+l_startX,top: l_btY}).click(function(event){
			if( l_gameUI.isTouchEnabled){
				l_gameUI.gameScene.loseControl();
				var l_viewPaypal=new ViewPaypal();
				l_viewPaypal.gameScene=l_gameUI.gameScene;
			}
		});

		//Mail按钮
		$("#game_ui").append("<img id='bt_mail' class='bt_sns' src='res/UI/mxIconMail.png'></img>");
		$("#bt_mail").css({left: l_btXInt*3+l_startX,top: l_btY,}).click(function(event){
			if (l_gameUI.isTouchEnabled) {
				window.open("mailto:geek.mouse.game@gmail.com?subject=X-MATCH Feedback");
			}
		});
	}
	
	//更新回合
	this.updateRound = function(){
		cc.log("GameUI updateRound"+g_gameMgr.round);
		var l_strRound = "MOVES: "+g_gameMgr.round.toString();
		$("#moves").text(l_strRound);
		//this.labelRound.setString(l_strRound);
	}
	
	//更新分数
	this.updateScore = function(){
		cc.log("GameUI updateScore"+g_gameMgr.currentScore);
		var l_strScore = g_gameMgr.currentScore.toString();
		//this.labelCurrentScore.setString(l_strScore);
		$("#current_score").text(l_strScore);
		
		l_strScore = "BEST: "+g_gameMgr.maxScore.toString();
		$("#max_score").text(l_strScore);
		//this.labelMaxScore.setString(l_strScore);
	}

	//更新Visitor
	this.updateVisitor = function(){
		//读取
		var l_visitCount_global = g_gameMgr.globalVisitorAll;
		var l_visitCount_today = g_gameMgr.globalVisitorToday;

		l_visitCount_global = this.convertToReadable(l_visitCount_global);
		l_visitCount_today = this.convertToReadable(l_visitCount_today);

		$("#visitor_all").text("All:"+l_visitCount_global);
		$("#visitor_today").text("Today:"+l_visitCount_today);

	}
	
	
	
	//转换为易读数字 "14250" -> "14,250"
	this.convertToReadable = function(p_strNumber){
		var l_strOldNumber = p_strNumber;
		var l_strNewNumber;
		var l_iIndex = p_strNumber.length - 3;
		while(l_iIndex > 0){
			l_strNewNumber = l_strOldNumber.substring(0, l_iIndex) + "," + l_strOldNumber.substring(l_iIndex);
			l_iIndex -= 3;
			l_strOldNumber = l_strNewNumber;
		}
		return l_strOldNumber;
	}

	this.initObjects();
	this.initOptions();

	
}


