Meteor.Router.add({
	'/':{to:'home',as:'home'},
    '/tasks': {to:'tasks',as:'tasks'},
     '/users': {to:'users',as:'users'}
  });
Meteor.startup(function() {
    Meteor.autorun(function() {
      // grab the current page from the router, so this re-runs every time it changes
    
      Meteor.Router.page();
      });
});