

var MXFrameShare= cc.Layer.extend({
	//_menu
	//_lbText:null,
	_lbGO:null,
	_gamelayer:null,
	ctor:function(){
		this._super();
	},

	onAssignCCBMemberVariable:function(target,memberVariableName,node){
//		if(target == this && memberVariableName == "lbText"){
//			if(node instanceof cc.LabelTTF){
//				this._lbText=node;
//			}
//			return true;
//		}
		if(target == this && memberVariableName == "lbGameOver"){
			if(node instanceof cc.LabelTTF){
				this._lbGO=node;
			}
			return true;
		}
		
		return false;
	},

	onResolveCCBCCMenuItemSelector:function(target,selectorName){
		if(this == target && "onRestart" == selectorName){
			return this.onClickRestart; 
		}
		if(this == target && "onShare" == selectorName){
			return this.onClickShare; 
		}
		if(this == target && "onHelp" == selectorName){
			return this.onClickHelp; 
		}
		if(this == target && "onStory" == selectorName){
			return this.onClickStory; 
		}
		return null;
	},

	onClickRestart:function(){
		this._gamelayer.hideTitleView(g_config.callBackPara.restartGame);
	},
	
	onClickShare:function(){
		var l_maxScore=g_gameMgr.maxScore;
		var l_url="http://geekmouse.net/games/x-match";
		var l_account=" @geek_mouse ";
		var l_shareString="http://twitter.com/home?status="+l_maxScore+" Xs!That's my record in Code Original.Can you beat me in"+l_account+l_url;
		window.open(l_shareString);
		//window.open("http://twitter.com/home?status=Billboards that Monitor and Respond to API Activity - http://apievangelist.com/2011/04/01/billboards-that-monitor-and-respond-to-api-activity via @apievangelist");
	},
	
	onClickHelp:function(){
		this._gamelayer.launchTutorial();
	},
	
	onClickStory:function(){
		this._gamelayer.launchStory();
	},
	
	toggleGameover:function(pGameover){
//		var l_bGameover=true;
//		if (pGameover==g_config.titleViewPara.pauseGame) {
//			l_bGameover=false;
//		}
		//this._lbText.setVisible(!l_bGameover);
		//this._lbGO.setVisible(l_bGameover);
		
		switch(pGameover){
			case g_config.titleViewPara.gameOver_withNewR:
				this._lbGO.setString("NEW RECORD!!");
				break;
			case g_config.titleViewPara.gameOver_withoutNewR:
				this._lbGO.setString("GAME OVER");
				break;
			case g_config.titleViewPara.pauseGame:
				this._lbGO.setString("What do you want?");
				break;
		}
		
	},
	initView:function(p_titleViewPara,gamelayer){
		this._gamelayer=gamelayer;
		//this._lbText.setString("What do you want?");
	}
});

MXFrameShare.create=function(){
	var ret=new MXFrameShare();
	if (ret && ret.init()) {
		return ret;
	}
	else return null;
}

var MXFrameShareLoader=cc.LayerLoader.extend({
	_createCCNode:function(parent,ccbReader){
		return MXFrameShare.create();
	}
});