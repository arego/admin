BaseModel.select = function (id) {
	if (null == id) {
		return null;
	}
	let row = sessionStorage.getItem(id);

	if(row){
		let option = JSON.parse(row);
		let model = new BaseModel(option);
		return model;
	}
	return null;
}