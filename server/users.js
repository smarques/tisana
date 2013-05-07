Accounts.onCreateUser(function(options, user){
  user.profile = options.profile || {};
  
  
  // if this is the first user ever, make them an admin, (stolen from meteor-teloscope, thank you!)
  if ( !Meteor.users.find().count() )
    user.isAdmin = true;

  return user;
});