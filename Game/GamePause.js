//GameLayer
 function GamePause(iState){
 	//游戏场景引用
 	this.gameScene = null;
 	this.state=iState;

	this.initOptions = function(){
		var l_gamePause = this;
		//Create game_pause
		$("div#game_scene").append("<div id='game_pause'></div>");
		$("#game_pause").css({
			"z-index" : g_config.zorder.GamePause,
			});

		//中心方块
		$("#game_pause").append("<div id='game_pause_center' class='pause_back'></div>");
		//统计
		$("#game_pause").append("<p id='game_pause_state' class='pause_stat'></p>");
		$("#game_pause_state").append("<hr><p>You are playing today's game <span style='color:red;'>#"+g_gameMgr.globalVisitorToday+"</span>,</p><p>which is also the <span style='color:red;'>#"+g_gameMgr.globalVisitorAll+"</span> game in history on this site</p>");

		var l_btLeft0=125;
		var l_btLeft1=330;
		var l_btTop0=580;
		var l_btTop1=680;
		//Continue button
		$("#game_pause").append("<div id='bt_ps_cont' >CONTINUE</div>");
		$("#bt_ps_cont").addClass("bt_pause").css({"left":l_btLeft0,"top": l_btTop0}).click(function(event) {
			l_gamePause.gameScene.hideGamePause();
		});

		//Restart button
		$("#game_pause").append("<div id='bt_ps_rest' >RESTART</div>");
		$("#bt_ps_rest").addClass("bt_pause").css({"left":l_btLeft1,"top":l_btTop0}).click(function(event) {
			l_gamePause.gameScene.initRandomMap();
			l_gamePause.gameScene.hideGamePause();	
		});

		//Tutorial button
		$("#game_pause").append("<div id='bt_ps_tut' >TUTORIAL</div>");
		$("#bt_ps_tut").addClass("bt_pause").css({"left":l_btLeft0,"top":l_btTop1}).click(function(event) {
			l_gamePause.gameScene.hideGamePause();	
			l_gamePause.gameScene.showGameTutorial();
		});

		//Share button
		$("#game_pause").append("<div id='bt_ps_share' >TWEET IT</div>");
		$("#bt_ps_share").addClass("bt_pause").css({"left":l_btLeft1,"top":l_btTop1}).click(function(event) {
			cc.log("pause clickButton share");
			var l_maxScore=g_gameMgr.maxScore;
			var l_url="http://geekmouse.net/games/x-match";
			var l_account=" @geek_mouse ";
			var l_shareString="http://twitter.com/home?status="+l_maxScore+" Xs!That's my record in Code Original.Can you beat me in"+l_account+l_url;
			window.open(l_shareString);
		});

		switch(iState){
			case g_config.statePause.spManual:{
				
				break;
			}
			case g_config.statePause.spEnd:{
				$("#game_pause").append("<div id='title_ps' class='tut_title' >GAME OVER</div>");
				break;
			}
			case g_config.statePause.spEndNew:{
				$("#game_pause").append("<div id='title_ps' class='tut_title' >NEW RECORD</div>");
				break;
			}
		}
	}


	//出现动画
	this.appear = function(){
		//$("#game_pause").slideToggle(400);
	}

	//消失动画
	this.disappear = function(){
		$("#game_pause").remove();
		//$("#game_pause").slideToggle(400);
	}

	this.initOptions();
}

function ViewPaypal(){
	this.gameScene = null;
	this.initPaypal=function(){
		var l_viewPaypal = this;
		$("div#game_scene").append("<div id='view_paypal'></div>");
		$("#view_paypal").css({"z-index" : g_config.zorder.GamePause});

		$("#view_paypal").append("<div id='paypal_back' class='paypal_back'></div>");

		$("#paypal_back").append("<div id='paypal_ps' class='paypal_list'></div>");
		$("#paypal_ps").load("paypal.txt");

		$("#paypal_back").append("<div id='bt_paypal' class='paypal_bt'>DONATE</div>");
		$("#bt_paypal").click(function(event){
			$("#paypal_form").submit();
		});

		$("#paypal_back").append("<div id='bt_cancel' class='paypal_bt_cancel'>CANCEL</div>");
		$("#bt_cancel").click(function(event){
			l_viewPaypal.gameScene.onControl();
			$("#view_paypal").remove();
		});


	}
	this.initPaypal();
}


