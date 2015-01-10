

var MXFrameWelcome=cc.Layer.extend({
	_lbText:null,
	_gamelayer:null,
	onAssignCCBMemberVariable:function(target,memberVariableName,node){
		if(target == this && memberVariableName == "lbText"){
			if(node instanceof cc.LabelTTF){
				this._lbText=node;
			}
			return true;
		}
		return false;
	},
	initView:function(p_titleViewPara,gamelayer){
		this._gamelayer=gamelayer;
		if (p_titleViewPara==g_config.titleViewPara.firstRun_withoutSD) {
			this._lbText.setString("Welcome to play X-Match. Try to score 100+ !");
		}
		if(g_tools.isHitRandom(50)){
			this._lbText.setString("This is the 'Mode Original'. You can play other 9 modes by download the app.");
		}
		else{
			this._lbText.setString("Follow our twitter for the updates of other game modes of X-Match!");
		}
	}
});

MXFrameWelcome.create=function(){
	var ret=new MXFrameWelcome();
	if (ret && ret.init()) {
		return ret;
	}
	else return null;
}

var MXFrameWelcomeLoader=cc.LayerLoader.extend({
	_createCCNode:function(parent,ccbReader){
		return MXFrameWelcome.create();
	}
});