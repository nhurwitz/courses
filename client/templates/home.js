Template.home.helpers({
    courses: function() {
      return Courses.find({school: Meteor.user().profile['school']}).fetch();
    } 
}); 
