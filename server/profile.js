Accounts.onCreateUser(function(options, user) {
    if(!user.profile) {
    	user.profile = {};
    }
    user.profile['name'] = options.name;
    user.profile['school'] = options.school;

    return user
});