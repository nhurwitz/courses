Template.home.helpers({
    courses: function() {
      return Courses.find({school: Meteor.user().profile['school']}).fetch();
    } 
}); 

Template.home.events({
  'click .js-add-course': function() {
      Session.set(TO_MAIN, false);
      Session.set(TO_NEW_COURSE, true);
  },
}); 