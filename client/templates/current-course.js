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
  }
});_