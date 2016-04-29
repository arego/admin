function BaseModel(options) {
	var that = this;
	that.ID = options.ID;
	null != options.CreatedDate && (that.CreatedDate = options.CreatedDate);
	null != options.CreatedBy && (that.CreatedBy = options.CreatedBy);
	null != options.ModifiedDate && (that.ModifiedDate = options.ModifiedDate);
	null != options.ModifiedBy && (that.ModifiedBy = options.ModifiedBy);

	return that;
}