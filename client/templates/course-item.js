Template.course.helpers({

});

Template.course.events({
  'click .list-item': function() {
    Session.set(CURRENT_COURSE_VIEW, this._id);
    Session.set(TO_MAIN, false);
    Session.set(TO_NEW_COURSE, false);
    Session.set(TO_COURSE_VIEW, true);
    Session.set(TO_NEW_REVIEW, false);
  },
});