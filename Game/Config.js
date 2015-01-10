var g_config = {
	//游戏配置


	//数字
	empty:-1
	,numStart:0
	,numX:10
	,numMultiX:100 //消除多个X时返回值 120：2"X" 130:3"X" 140:4"X"
	
	//Font Number
	,numFontName:"Britannic Bold"
	//,numFontName:"Helvetica"

	,numFontSize:96

	//Font UI
	,uiFontName:"Britannic Bold"
	,uiFontsize:20
	
	//方向
	,directCount:4

		
	//Grid的大小
	,gridCount_x:7
	,gridCount_y:7
	,gridCount_total:(49)
	
	//背景格子图大小
	,grid_image_width:128
	
	//初始块数
	,brickNum_init:8
	,brickNum_everyRound:2
	
	//坐标
	,coo:{
		//GameScene
		gameSceneWidth:640
		,gameSceneHeight:960

		//Grid Map
		,gridLeft:5
		,gridTop:150
		,gridInterval_x:90
		,gridInterval_y:90
		,gridSize_x:80
		,gridSize_y:80
		,xSize:70
		
		//CurrentScore
		,currentScore_x:320
		,currentScore_y:90
		,currentScore_size:55
		
		//MaxScore
		,maxScore_x:320
		,maxScore_y:140
		,maxScore_size:20
		
		//Round回合
		,round_x:320
		,round_y:170
		,round_size:20
		
		//Visitor
		,visitor_x:4
		,visitor_y:20
		,visitor_size:30
		
		//All
		,visitCount_x:4
		,visitCount_y:50
		,visitcount_size:27

		//Today
		,visitCount_today_x:4
		,visitCount_today_y:70
		,visitcount_today_size:27
		
		//Title
		,title_x:320
		,title_y:40
		,title_size:52


		//Bottom 
		,uiBottomLeft:320
		,uiBottomTop:880

		//Pause
		,pauseButtonLeft:160
		,pauseButtonLeft2:350
		,pauseButtonTop:480
		,pauseButtonTop2:580
		,pauseButtonInterval_y: 80

		,buttonWidth:120
		,buttonHeight:40
		,buttonLabelOffset_x:20
		,buttonLabelOffset_y:10

		//Option
		,uiOptionLeft:560
		,uiOptionTop:100
		,uiOptionSide:70
	}

	,statePause:{
		spManual:0
		,spEnd:1
		,spEndNew:2
	}
	
	//zorder
	,zorder:{
		//GamePause:1
		GameBG:10
		,GameObject:20
		,GameBottom:25
		,GameTip:30
		,GameUI:40
		,GamePause:50
		,GameTut:1000
	}

	//动作参数
	,actionPara:{
		//球出现， 绽放和透明度的改变
		dur_brickAppear:0.4
		,dur_brickAppearDelay:0.2
		,dur_brickMoveToTarget:0.2
		,opacity_start:180
		,opacity_end:255
		,scale_start:0.8
		,scale_end:1.0
	}
	
	/*
	 * 	"save_data":{
	 * 		"modeOriginal":{
	 * 			"currentScore":10
	 * 			,"round":20
	 * 			,"maxScore":30
	 * 			,"status":[]
	 * 		}
	 * }
	 */
	,saveData:{
		key_root:"save_data"
		,key_modeOriginal:"modeOriginal"
		,key_currentScore:"currentScore"
		,key_maxScore:"maxScore"
		,key_round:"round"
		,key_status:"status"
		,key_isNewRecord:"newRecord"
		,key_globalVisit:"globalVisit"
		,key_todayVisit:"todayVisit"
		
	}
	
	//UI参数 
	,uiActionPara:{
		dur_action_in:0.5
		,dur_action_out:0.5
		,in_pos_y:0
		,out_pos_y:-200
	},
	
	//调出TitleView接口参数
	titleViewPara:{
		firstRun_withoutSD:0		//第一次进入，无存档
		,firstRun_withSD:1			//第一次进入，有存档
		,pauseGame:2				//手动暂停
		,gameOver_withNewR:3		//游戏结束，有新记录
		,gameOver_withoutNewR:4		//游戏结束，无新记录
	},
	
	//TitleView回调参数
	callBackPara:{
		empty:0							//无参数,继续游戏
		,restartGame:1		//开始游戏
	},
	
	
};