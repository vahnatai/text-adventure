class Item {
	constructor(name, quickDesc, floorDesc, moreInfo, useCallback) {
		this.name = name;
		this.quickDesc = quickDesc;
		this.floorDesc = floorDesc;
		this.moreInfo = moreInfo;
		this.useCallback = useCallback;
	}

	getQuickDescription() {
		return this.quickDesc;
	}

	getFloorDescription() {
		return this.floorDesc + ' You might see more if you took a closer look at it.';
	}
	
	getInventoryDescription() {
		return this.floorDesc + ' ' + this.moreInfo;
	}
	
	use() {
		return this.useCallback();
	}
}

export default Item;
