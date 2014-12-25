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

    var firstName = template.$('[name=first-name]').val();
    var lastName = template.$('[name=last-name]').val();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();
    var school = validEmail(email);

    var errors = {};

    if(! firstName) {
      errors.firstName = "First Name Required";
    }

    if(! lastName) {
      errors.lastName = "Last Name Required";
    }

    if (! email) {
      errors.email = 'Email required';
    }

    if(school == INVALID_EMAIL) {
      errors.edu = '.edu address required';
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
      name: firstName + " " + lastName,
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