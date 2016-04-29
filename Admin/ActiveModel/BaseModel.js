BaseModel.select = function (id) {
    if (null == id) {
        return null
    }
    var row = sessionStorage.getItem(id);
    if(row){
        var option = JSON.parse(row);
        var model = new BaseModel(option);
        return model;
    }
    return null;
}