//GameLayer
 function GameTutorial(){
 	//游戏场景引用
 	this.gameScene = null;
 	this.imgIndex = 0;
 	this.isTouchEnabled=false;

	this.initTutorial = function(){
		var l_gameTutorial = this;
		l_gameTutorial.isTouchEnabled=false;
		//Create game_pause
		$("div#game_scene").append("<div id='game_tutorial'></div>");
		$("#game_tutorial").css({
			"z-index" : g_config.zorder.GameTut,
			});

		$("#game_tutorial").append("<img id='game_tut_img' class='pause_back' src='res/UI/Step1.png'></img>");
		$("#game_tut_img").css({"z-index":1000,"cursor":"pointer"});
		//$("#game_tutorial").append("<div id='game_tut_img' class='tut_back'></div>");
		$("#game_tutorial").append("<div id='game_tut_loading' class='tut_load' >LOADING... </div>");

		$("#game_tutorial").click(function(event) {
			if (l_gameTutorial.isTouchEnabled) {
				l_gameTutorial.imgIndex++;
				if(l_gameTutorial.imgIndex == 1){
					l_gameTutorial.isTouchEnabled=false;
					$("#game_tut_img").attr("src","res/UI/Step2.png");
					//$("#game_tutorial").append("<img id='game_tut_img1' top=9999px src='res/UI/Step2.png'></img>");//假装加载
					//$("#game_tutorial").append("<div id='game_tutorial_title' class='tut_title' >TUTORIAL</div>");
					$("#game_tutorial").append("<div id='game_tut_loading' class='tut_load'>Loading... </div>");

				}else{
					if(l_gameTutorial.gameScene != null){
						l_gameTutorial.gameScene.hideGameTutorial();
					}
				}
			};
			
		});
		$("#game_tut_img").load(function(){
			$("#game_tut_loading").remove();
			l_gameTutorial.isTouchEnabled=true;
		});		

		// $("#game_tut_img1").load(function(){
		// 	$("#game_tut_loading").remove();
			
		// 	l_gameTutorial.isTouchEnabled=true;
		// });	

		$("#game_tutorial").append("<div id='game_tutorial_title' class='tut_title' >TUTORIAL</div>");

	}

	//出现动画
	this.appear = function(){
		//$("#game_tutorial").slideToggle(400);
	}

	//消失动画
	this.disappear = function(){
		$("#game_tutorial").remove();
		//$("#game_tutorial").slideToggle(400).remove();
	}

	this.initTutorial();
}


