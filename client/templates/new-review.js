var ERRORS_KEY = 'reviewErrors';

Template.newReview.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.newReview.helpers({
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
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.newReview.events({
  'click .js-back-button': function() {
    Session.set(TO_MAIN, false);
    Session.set(TO_NEW_COURSE, false);
    Session.set(TO_COURSE_VIEW, true);
    Session.set(TO_NEW_REVIEW, false);
  }, 
  'submit': function(event, template) {
    event.preventDefault();

    var overall = template.$('[name=overall]').val();
    var hours = template.$('[name=hours]').val();
    var interest = template.$('[name=interest]').val();
    var difficulty = template.$('[name=difficulty]').val();
    var comment = template.$('[name=comment]').val();
    var school = Meteor.user().school;
    var course = Session.get(CURRENT_COURSE_VIEW);

    var errors = {};

    if(isNaN(overall)) {
      errors.overall = "Rating Required";
    } else {
      overall = parseFloat(overall);
    }

    if (isNaN(hours)) {
      errors.hours = 'Hours Required';
    } else {
      hours = parseFloat(hours);
    }

    if (isNaN(interest)) {
      errors.interest = 'Interest Required';
    } else {
      interest = parseFloat(interest);
    }

    if (isNaN(difficulty)) {
      errors.difficulty = 'Difficulty Required';
    } else {
      difficulty = parseFloat(difficulty);
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    if(!comment) {
      Reviews.insert({
        school: school,
        course: course,
        overall: overall,
        hours: hours,
        difficulty: difficulty,
        interest: interest,
      });
    } else {
      Reviews.insert({
        school: school,
        course: course,
        overall: overall,
        hours: hours,
        difficulty: difficulty,
        interest: interest,
        comment: comment
      });
    }
    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    var numReviews = course.numReviews + 1;
    var setOverall = ((course.overall * (numReviews-1)) + overall)/numReviews;
    var setHours = ((course.hours * (numReviews-1)) + hours)/numReviews;
    var setDifficulty = ((course.difficulty * (numReviews-1)) + difficulty)/numReviews;
    var setInterest = ((course.interest * (numReviews-1)) + interest)/numReviews;

    Courses.update({
      _id:Session.get(CURRENT_COURSE_VIEW)
    },
    {
      $set: {
        numReviews: numReviews,
        overall: setOverall,  
        difficulty: setDifficulty,
        hours: setHours,
        interest: setInterest
      }
    });
      

    Session.set(TO_MAIN, false);
    Session.set(TO_NEW_COURSE, false);
    Session.set(TO_COURSE_VIEW, true);
    Session.set(TO_NEW_REVIEW, false);
  }
});
