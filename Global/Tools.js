var g_tools = {
	member:0,
	
	/*
	 * 取得指定区间内的随机整型数
	 * 
	 * p_iStart p_iEnd; 前闭后开区间
	 */
	random:function(p_iStart, p_iEnd){
		return p_iStart + Math.floor( Math.random()*(p_iEnd - p_iStart) );
	},
	isHitRandom:function(p_iPercent){
		return this.random(0, 100)<p_iPercent;
	}

};