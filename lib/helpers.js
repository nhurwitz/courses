validEmail = function(email) {
	var domain = email.replace(/.*@/, "");
	if(domain in SCHOOLS) {
		return SCHOOLS[domain];
	} else {
		return INVALID_EMAIL;
	}	
}