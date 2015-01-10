

var MXFrameStory= cc.Layer.extend({
	_lbStory:null,
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
		if(target == this && memberVariableName == "lbStory"){
			if(node instanceof cc.LabelTTF){
				this._lbStory=node;
			}
			return true;
		}
		return false;
	},

	onTouchEnd:function(touch,event){
		var target = event.getCurrentTarget();
		target.removeFromParent();
		this._gamelayer._touchUIListener.setEnabled(true);
	},

	onEnter: function (){
		var locListener = this._touchListener;
		if (!locListener._isRegistered())
			cc.eventManager.addListener(locListener, this);
		cc.Node.prototype.onEnter.call(this);
		var l_strWords="People who love freedom and innovation:\n\nI, on behalf of IndieUnion(IU), beg your assistant.\n\nThe super software company Xcent has launched their app “Xcan”, which, by scanning apps with the phone camera, can auto-generate the infringement-less clones in 3 minutes. Xcan destroyed the last hope of indie developers, since they cannot win a lawsuit, and the clones are supported by more powerful marketing .\n\nFor the final stand, we scanned Xcan by Xcan to get its source and attempt to inject the virus to its server, which is protected by ten layers of weird ciphers: They look like ten modes of puzzles! We are exhausted in defending Xcent and could only publish these puzzles as “X-Match” here. The method of deciphering is straight:  SCORE 100 IN ONE MODE,  UNLOCK THE NEXT MODE.\n\nTime is limited and you are our last hope!\n\nDaniele LePan";
		this._lbStory.setString(l_strWords);
	},
});

MXFrameStory.create=function(){
	var ret=new MXFrameStory();
	if (ret && ret.init()) {
		return ret;
	}
	else return null;
}

var MXFrameStoryLoader=cc.LayerLoader.extend({
	_createCCNode:function(parent,ccbReader){
		return MXFrameStory.create();
	}
});