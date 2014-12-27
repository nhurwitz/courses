Template.currentCourse.helpers({
  name: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return course.name;
  },
  dept: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return course.department;
  },
  courseNumber: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return course.courseNumber;
  },
  courseRating: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return course.rating.overall;
  },
  courseHours: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return course.rating.hours;
  },
  courseInteresting: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return course.rating.interesting;
  },
  courseDifficulty: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return course.rating.easy;
  },
  reviews: function() {
    return Reviews.find({school: Meteor.user().school, course: Session.get(CURRENT_COURSE_VIEW)});
  }
});_