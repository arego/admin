function State(option) {
	let that = this;

	BaseModel.call(that, option);
	that.StateName = option.StateName;
	that.StateName2 = option.StateName;

	if (null != option.StateCode) {
		that.StateCode = option.StateCode;
	}
	if (null != option.CountryID) {
		that.CountryID = option.CountryID;
		if (Array.isArray(option.countryList)) {

			let country = option.countryList.filter(function (item) {
				return item.CountryID == that.CountryID;
			});
		}
	}
}
State.defaultOptions = new State({ ID: -1, StateName: 'Select.....' });
