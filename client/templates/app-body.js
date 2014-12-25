TO_MAIN = "mainPage";
Session.setDefault(TO_MAIN, true);

TO_NEW_COURSE = "addCoursePage";
Session.setDefault(TO_NEW_COURSE, false);


Template.appBody.helpers({
    school: function () {
    	var s = Meteor.user().profile['school'];
      return Schools.find({name: s}).fetch()[0].name;
    }, 
    toMain: function() {
      return Session.get(TO_MAIN);
    },
    toAddCourse: function() {
      return Session.get(TO_NEW_COURSE);
    }
}); 

Template.appBody.events({
	'click .js-logout': function() {
    	Meteor.logout();
      Session.set(TO_MAIN, true);
      Session.set(TO_NEW_COURSE, false);
	},
  'click .js-to-main': function() {
      Session.set(TO_MAIN, true);
      Session.set(TO_NEW_COURSE, false);
  }
});	