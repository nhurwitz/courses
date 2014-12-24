Router.configure({

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  // loadingTemplate: 'appLoading',
});

// Router.route('/', function () {
//   this.render('dispatch');
// });

Router.map(function() {
  this.route('join');
  this.route('signin');
  this.route('dispatch', {
    path: '/'
  });
});