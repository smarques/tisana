isAdmin=function(user){
	//console.log(user);
  if(!user || typeof user === 'undefined')
    return false;
  return !!user.isAdmin;
}
isAdminById=function(userId){
	  var user = Meteor.users.findOne(userId);
	  return user && isAdmin(user);
	}