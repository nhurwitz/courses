TO_MAIN = "mainPage";
Session.setDefault(TO_MAIN, true);

TO_NEW_COURSE = "addCoursePage";
Session.setDefault(TO_NEW_COURSE, false);

TO_COURSE_VIEW = "courseViewPage";
Session.setDefault(TO_COURSE_VIEW, false);

CURRENT_COURSE_VIEW = "currentCourseView";


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
    },
    toCourseView: function() {
      return Session.get(TO_COURSE_VIEW);
    }
}); 

Template.appBody.events({
	'click .js-logout': function() {
    	Meteor.logout();
      Session.set(TO_MAIN, true);
      Session.set(TO_NEW_COURSE, false);
      Session.set(TO_COURSE_VIEW, false);
	},
  'click .js-to-main': function() {
      Session.set(TO_MAIN, true);
      Session.set(TO_NEW_COURSE, false);
      Session.set(TO_COURSE_VIEW, false);
  },
  'click .js-add-course': function() {
      Session.set(TO_MAIN, false);
      Session.set(TO_NEW_COURSE, true);
      Session.set(TO_COURSE_VIEW, false);
  }
});	