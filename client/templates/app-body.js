Template.appBody.helpers({
    school: function () {
      return Meteor.user().profile['school'];
    }
  });

Template.appBody.events({
	'click .js-logout': function() {
    	Meteor.logout();
	}
});	