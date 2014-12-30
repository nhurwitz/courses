var ERRORS_KEY = 'reviewErrors';

Template.newReview.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.newReview.rendered = function() {
  Meteor.typeahead.inject();
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
  },
  professors: function() {
    return Object.keys(Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0]
      .professor);
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
    var professor = template.$('[name=professor]').val();
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

    if(!professor) {
      errors.professor = 'Professor Required';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    if(!comment) {
      Reviews.insert({
        school: school,
        course: course,
        professor: professor,
        overall: overall,
        hours: hours,
        difficulty: difficulty,
        interest: interest
      });
    } else {
      Reviews.insert({
        school: school,
        course: course,
        professor: professor,
        overall: overall,
        hours: hours,
        difficulty: difficulty,
        interest: interest,
        comment: comment
      });
    }

    var course = Courses.find({_id:Session.get(CURRENT_COURSE_VIEW)}).fetch()[0];
    // OVERALL
    var numReviews = course.metrics.numReviews + 1;
    var setOverall = ((course.metrics.overall * (numReviews-1)) + overall)/numReviews;
    var setHours = ((course.metrics.hours * (numReviews-1)) + hours)/numReviews;
    var setDifficulty = ((course.metrics.difficulty * (numReviews-1)) + difficulty)/numReviews;
    var setInterest = ((course.metrics.interest * (numReviews-1)) + interest)/numReviews;

    //PROFESSOR
    if(!(professor in course.professor)) {
      var prof = course.professor;
      prof[professor] = {
        name: professor,
        overall: overall,
        difficulty: difficulty,
        interest: interest,
        hours: hours,
        numReviews: 1
      };
      Courses.update({
        _id:Session.get(CURRENT_COURSE_VIEW)
      }, {
        $set: {
          professor: prof
        }
      });
    } else {
      var pNumReviews = course.professor[professor].numReviews + 1;
      var pOverall = ((course.professor[professor].overall * (pNumReviews-1)) + overall)/pNumReviews;
      var pHours = ((course.professor[professor].hours * (pNumReviews-1)) + hours)/pNumReviews;
      var pDifficulty = ((course.professor[professor].difficulty * (pNumReviews-1)) + difficulty)/pNumReviews;
      var pInterest = ((course.professor[professor].interest * (pNumReviews-1)) + interest)/pNumReviews;
      
      var prof = course.professor;
      prof[professor] = {
        name: professor,
        overall: pOverall,
        difficulty: pDifficulty,
        interest: pInterest,
        hours: pHours,
        numReviews: pNumReviews
      };
      Courses.update({
        _id:Session.get(CURRENT_COURSE_VIEW)
      }, {
        $set: {
          professor: prof
        }
      });
    }

    Courses.update({
      _id:Session.get(CURRENT_COURSE_VIEW)
    }, {
      $set: {
        "metrics.numReviews": numReviews,
        "metrics.overall": setOverall,  
        "metrics.difficulty": setDifficulty,
        "metrics.hours": setHours,
        "metrics.interest": setInterest
      }
    });
      

    Session.set(TO_MAIN, false);
    Session.set(TO_NEW_COURSE, false);
    Session.set(TO_COURSE_VIEW, true);
    Session.set(TO_NEW_REVIEW, false);
  }
});
