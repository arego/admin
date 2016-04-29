Function.isFunction = function (f) {
	return 'function' == typeof (f);
}

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
}