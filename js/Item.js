class Item {
	constructor(name, quickDesc, floorDesc, invDesc, useCallback) {
		this.name = name;
		this.quickDesc = quickDesc;
		this.floorDesc = floorDesc;
		this.invDesc = invDesc;
		this.useCallback = useCallback;
	}
	
	use() {
		return this.useCallback();
	}
}

export default Item;
