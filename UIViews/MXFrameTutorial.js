

var MXFrameTutorial= cc.Layer.extend({
	//_menu
	_spTut:null,
	_index:0,
	_touchListener:null,
	_gamelayer:null,
	ctor:function(){
		this._super();
		this._touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan: function (touch, event) {return true;},
			onTouchEnded:this.onTouchEnd.bind(this),
		});
		//cc.eventManager.addListener(this._touchListener, this);
	},

	onAssignCCBMemberVariable:function(target,memberVariableName,node){
		if(target == this && memberVariableName == "spTut"){
			if(node instanceof cc.Sprite){
				this._spTut=node;
			}
			return true;
		}
		return false;
	},
	
	onTouchEnd:function(touch,event){
		var target = event.getCurrentTarget();
		if (target._index==0) {//第一页
			target._index=1;
			target._spTut.setTexture("res/UI/Step2.png");
		}
		else{
			target.removeFromParent();
			this._gamelayer._touchUIListener.setEnabled(true);
		}
	},
	
	onEnter: function (){
		var locListener = this._touchListener;
		if (!locListener._isRegistered())
			cc.eventManager.addListener(locListener, this);
		cc.Node.prototype.onEnter.call(this);
	},
});

MXFrameTutorial.create=function(){
	var ret=new MXFrameTutorial();
	if (ret && ret.init()) {
		return ret;
	}
	else return null;
}

var MXFrameTutorialLoader=cc.LayerLoader.extend({
	_createCCNode:function(parent,ccbReader){
		return MXFrameTutorial.create();
	}
});