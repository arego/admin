function Country(options) {
	var that = this;
	that = BaseModel.call(that, options);
	null != options.CountryCode && (that.CountryCode = options.CountryCode);
	null != options.CountryName && (that.CountryName = options.CountryName);
	null != options.Description && (that.Description = options.Description);
	null != options.AltName && (that.AltName = options.AltName);

	return that;
}
//Country.defaultOptions = new Country({ ID: -1, CountryName: 'Select.....' });