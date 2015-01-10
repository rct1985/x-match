

var MXFrameAppStore= cc.Layer.extend({
	//_menu
	_lbText:null,
	_btIOS:null,
	_gamelayer:null,
	ctor:function(){
		this._super();
	},
	
	onAssignCCBMemberVariable:function(target,memberVariableName,node){
		if(target == this && memberVariableName == "lbText"){
			if(node instanceof cc.LabelTTF){
				this._lbText=node;
			}
			return true;
		}
		if(target == this && memberVariableName == "lbText"){
			if(node instanceof cc.MenuItemImage){
				this._btIOS=node;
			}
			return true;
		}
		return false;
	},
	//接受Button对象  
	onResolveCCBCCControlSelector:function(target,selectorName){  
//		if(this == target && "onIOS" == selectorName){  
//			return this.onClickIOS;  
//		}  
		return null;  
	},
	
	onResolveCCBCCMenuItemSelector:function(target,selectorName){
		if(this == target && "onIOS" == selectorName){
			return this.onClickIOS; 
		}
		return null;
	},
	
	onClickIOS:function(){
		cc.log("click IOS");
		window.open("http://www.sohu.com");
	},
	
	initView:function(p_titleViewPara,gamelayer){
		this._gamelayer=gamelayer;
		this._lbText.setString("[NEWS] Play offline? More game modes? Try the apps!! Coming to AppStore soon!");
	}
});

MXFrameAppStore.create=function(){
	var ret=new MXFrameAppStore();
	if (ret && ret.init()) {
		return ret;
	}
	else return null;
}

var MXFrameAppStoreLoader=cc.LayerLoader.extend({
	_createCCNode:function(parent,ccbReader){
		return MXFrameAppStore.create();
	}
});