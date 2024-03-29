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
    return toFixed(course.metrics.overall, 2);
  },
  courseHours: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return toFixed(course.metrics.hours, 2);
  },
  courseInteresting: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return toFixed(course.metrics.interest, 2);
  },
  courseDifficulty: function() {
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    return toFixed(course.metrics.difficulty, 2);
  },
  reviews: function() {
    return Reviews.find({school: Meteor.user().school, course: Session.get(CURRENT_COURSE_VIEW)});
  },
  professorNames: function() {
    return Object.keys(Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0].professor);
  }
});

Template.currentCourse.events({
  'click .js-back-button': function() {
    Session.set(TO_MAIN, true);
    Session.set(TO_NEW_COURSE, false);
    Session.set(TO_COURSE_VIEW, false);
    Session.set(TO_NEW_REVIEW, false);
  },
  'click .js-new-review': function() {
    Session.set(TO_MAIN, false);
    Session.set(TO_NEW_COURSE, false);
    Session.set(TO_COURSE_VIEW, false);
    Session.set(TO_NEW_REVIEW, true);
  },
});_