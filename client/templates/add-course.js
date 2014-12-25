var ERRORS_KEY = 'newCourseErrors';

Template.addCourse.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.addCourse.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.addCourse.events({
  'submit': function(event, template) {
    event.preventDefault();

    var courseName = template.$('[name=course-name]').val()
      .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    var department = template.$('[name=department]').val()
      .toUpperCase();
    var courseNumber = template.$('[name=course-number]').val();
    var professor = template.$('[name=professor]').val()
      charAt(0).toUpperCase() + string.slice(1);
    var school = Meteor.user().profile['school'];

    var errors = {};

    if(! courseName) {
      errors.courseName = "Course Name Required";
    }

    if(! department) {
      errors.department = "Department Required";
    }

    if (! courseNumber) {
      errors.courseNumber = 'Course Number required';
    }

    var courseId = department + courseNumber;
    var courses = Schools.find({name: school}).fetch()[0].courses;
    if(Courses.find({
      school: school,
      department: department, 
      courseNumber: courseNumber
    }).count() != 0) {
      errors.exists = "Course Already Exists";
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    Courses.insert({
      school: school,
      name: courseName,
      department: department,
      courseNumber: courseNumber,
      professor: [professor]
    }); 
    Session.set(TO_MAIN, true);
    Session.set(TO_NEW_COURSE, false);
  }
});