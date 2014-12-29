validEmail = function(email) {
	var domain = email.replace(/.*@/, "");
	if(domain in SCHOOLS) {
		return SCHOOLS[domain];
	} else {
		return INVALID_EMAIL;
	}	
}

toFixed = function(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}