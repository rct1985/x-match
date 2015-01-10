
var MXFrameBottom=cc.Layer.extend({
	_layergame:null,
	_btRestart:null,
	onAssignCCBMemberVariable:function(target,memberVariableName,node){
		if(target == this && memberVariableName == "btRestart"){
			if(node instanceof cc.MenuItemImage){
				this._btRestart=node;
			}
			return true;
		}
		return false;
	},
	initView:function(){

		//this._lbText.setString("Welcome to play X-Match. Come on and score 100.");
	},

	onResolveCCBCCMenuItemSelector:function(target,selectorName){
		if(this == target && "onPaypal" == selectorName){
			return this.onClickPaypal; 
		}
		else if(this == target && "onLike" == selectorName){
			return this.onClickLike; 
		}
		else if(this == target && "onTwitter" == selectorName){
			return this.onClickTwitter; 
		}
		else if(this == target && "onMail" == selectorName){
			return this.onClickMail; 
		}
		else if(this == target && "onRestart" == selectorName){
			return this.onClickRestart; 
		}
		return null;
	},

	onClickPaypal:function(){},
	onClickLike:function(){
		window.open("https://www.facebook.com/geekmouse.xmatch");
	},
	onClickTwitter:function(){
		window.open("https://twitter.com/geek_mouse");
	},
	onClickMail:function(){
		window.open("mailto:geek.mouse.game@gmail.com?subject=X-MATCH Feedback");
	},
	onClickRestart:function(){
		this._layergame.showTitleView(g_config.titleViewPara.pauseGame);
		this._btRestart.setEnabled(false);
	}

});

MXFrameBottom.create=function(){
	var ret=new MXFrameBottom();
	if (ret && ret.init()) {
		return ret;
	}
	else return null;
}

var MXFrameBottomLoader=cc.LayerLoader.extend({
	_createCCNode:function(parent,ccbReader){
		return MXFrameBottom.create();
	}
});