Template.appBody.events({
	'click .js-logout': function() {
    	Meteor.logout();
	}
});