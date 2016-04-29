function BaseModelList(options) {
	let list = this;
	if (options) {
		list.db = options.db;
		list.entity = options.entity;

		list.data = options.data || list.db[list.entity];
		'string' == typeof list.data && (list.data = JSON.parse(list.data));
		list.model = options.model;
		list = list.select();
	}
	return list;
}

BaseModelList.SORT_DIRECTION = {
	ASC: 0,
	DESC: 1
}
BaseModelList.prototype = Array.prototype;

BaseModelList.prototype.SortDirection = {};

BaseModelList.prototype.select = function () {
	let list = this;
	list.length = 0;
	for (let i = 0; i < list.data.length; i++) {
		let model = new list.model('string' == typeof list.data[i] ? JSON.parse(list.data[i]) : list.data[i]);
		null != model && list.push(model);
	}
	return list;
}
BaseModelList.prototype.sortList = (that, dir, field) =>{
	let list = that;
	list.SortDirection[field] = !list.SortDirection[field];

	return list.sort((prev, next) => eval('prev[field]' + (list.SortDirection[field] ? '>' : '<') + 'next[field]'));
}

BaseModelList.prototype.delete = function (pk) {
	let list = this;
	list.data = [];
	list.forEach(function (item, i) {
		if (pk == item.ID) {
			delete list[i];
		} else {
			var strItem = JSON.stringify(item);
			list.data.push(strItem);
		}
	});
	list.db[list.entity] = JSON.stringify(list.data);
}