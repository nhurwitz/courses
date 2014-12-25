Accounts.onCreateUser(function(options, user) {
    if(!user.profile) {
    	user.profile = {};
    }
    user.profile['name'] = options.name;
    user.profile['school'] = options.school;

    if(Schools.find({name: options.school}).count() == 0) {
    	Schools.insert({
    		name: options.school,
    		registered: 1
    	})
    } else {
    	Schools.update({name: options.school}, {$inc: {registered: 1}});
    }
    

    return user
});