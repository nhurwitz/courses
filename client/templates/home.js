Template.home.helpers({
  courses: function() {
    return Courses.find({school: Meteor.user().profile['school']}, {sort: {"metrics.numReviews": -1}}).fetch();
  } 
});

