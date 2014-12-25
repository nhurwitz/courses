Template.main.helpers({
    courses: [
      {name: "Course 1"},
      {name: "Course 2"},
      {name: "Course 3"},
      {name: "Course 4"} 
    ] 
}); 

Template.main.events({
  'click .js-add-course': function() {
      Session.set(TO_MAIN, false);
      Session.set(TO_NEW_COURSE, true);
  },
}); 