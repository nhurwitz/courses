var ERRORS_KEY = 'newCourseErrors';

Template.addCourse.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.addCourse.rendered = function() {
  Meteor.typeahead.inject();
};

Template.addCourse.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  department: function() {
    return Object.keys(DEPARTMENTS);
  }
});

Template.addCourse.events({
  'submit': function(event, template) {
    event.preventDefault();

    var courseName = template.$('[name=course-name]').val()
      .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    var department = template.$('[name=department]').val();
    var courseNumber = template.$('[name=course-number]').val();
    var professor = template.$('[name=professor]').val()
      .charAt(0).toUpperCase() + template.$('[name=professor]').val().slice(1);
    var school = Meteor.user().profile['school'];

    var errors = {};

    if(! courseName) {
      errors.courseName = "Course Name Required";
    }

    if(! department) {
      errors.department = "Department Required";
    }

    if(!department in DEPARTMENTS) {
      errors.department = "Invalid Department";
    }

    if (! courseNumber) {
      errors.courseNumber = 'Course Number Required';
    }

    if (isNaN(courseNumber)) {
      errors.courseNumber = 'Course Number Required';
    }
    department = DEPARTMENTS[department];
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
      professor: [professor],
      overall: 0,
      difficulty: 0,
      interest: 0,
      hours: 0,
      numReviews: 0
    }); 
    Session.set(TO_MAIN, true);
    Session.set(TO_NEW_COURSE, false);
  },
  'click .js-back-button': function() {
    Session.set(TO_MAIN, true);
    Session.set(TO_NEW_COURSE, false);
    Session.set(TO_COURSE_VIEW, false);
    Session.set(TO_NEW_REVIEW, false);
  }
});
