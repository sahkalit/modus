SimpleSchema.debug = true;

safeRead = function() {
	var current, formatProperty, obj, prop, props, val, _i, _len;
 
	obj = arguments[0], props = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
 
	read = function(obj, prop) {
		if ((obj != null ? obj[prop] : void 0) == null) {
			return;
		}
		return obj[prop];
	};
 
	current = obj; 
	for (_i = 0, _len = props.length; _i < _len; _i++) {
		prop = props[_i];
 
		if (val = read(current, prop)) {
			current = val;
		} else {
			return '';
		}
	}
	return current;
};