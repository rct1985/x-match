//这一处的第几个Brick, 解决移除时，同时移除两个的问题
function GameGrid (){
	this.leftOriginal = 0;
	this.topOriginal = 0;
	this.brickIndex = 0;
	this.gameBrick = null;

	//判断是否为空
	this.empty = function(){
		return (this.gameBrick == null)
	}

	//移除GameBrick
	this.removeGameBrick = function(){
		if(this.gameBrick != null){
			this.gameBrick = null;
		}else{
			cc.log("error Here GameGrid removeGameBrick");
		}
	}

	//设置GameBrick
	this.addGameBrick = function(p_gameBrick){
		if(this.gameBrick == null){
			this.brickIndex++;
			this.gameBrick = p_gameBrick;
		}else{
			cc.log("error Here GameGrid setGameBrick");
		}
	}
};

function GameBrick (p_iNumber, p_strID, p_bWithDelay){
	//默认参数
	if(typeof(p_bWithDelay) == undefined){
		p_bWithDelay = true;
	}
	
	this.number = p_iNumber;
	this.brick_id = p_strID;
	
	


	
	//出现动画
	this.showAppearAction = function(p_bWithDelay){
		var l_brick = this;
		$("#"+this.brick_id).css({
			"opacity": 0.0,
			//"left" : l_brick.leftOriginal + g_config.coo.gridSize_x/2,
			//"top" : l_brick.topOriginal + g_config.coo.gridSize_y/2,
			"width" : g_config.coo.gridSize_x,
			"height" : g_config.coo.gridSize_y,
		});

		$("#"+this.brick_id).delay(150);
		$("#"+this.brick_id).animate({
			width: g_config.coo.gridSize_x,
			height: g_config.coo.gridSize_y,
			//left : l_brick.leftOriginal,
			//top : l_brick.topOriginal,
			opacity:1,
			},
			200
			);
		//$("#"+this.brick_id).fadeIn(200);
	}
	
	this.showDisAppearAction = function(p_targetPosition){
		var l_brick = this;
		$("#"+this.brick_id).animate({
			left: p_targetPosition.x, 
			top: p_targetPosition.y, 
			opacity:0.1},
			200, function(){
			l_brick.removeMyself();
		});
	}
	
	this.removeMyself = function(p_object){
		$("#"+this.brick_id).remove();
	}

	//this.showAppearAction(p_bWithDelay);

	return this;	
};
