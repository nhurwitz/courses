var ERRORS_KEY = 'joinErrors';

Template.join.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();

    var name = template.$('[name=name]').val()
      .replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();
    var school;

    var errors = {};

    if(! name) {
      errors.name = "First Name Required";
    }

    if (! email) {
      errors.email = 'Email required';
    }

    if(validEmail(email) == INVALID_EMAIL) {
      errors.email = 'Invalid .edu Address'
    } else {
      school = validEmail(email);
    }

    if (! password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
  
    Accounts.createUser({
      name: name,
      school: school,
      email: email,
      password: password,
      profile: {}
    }, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }

      Router.go('dispatch');
    });
  }
});