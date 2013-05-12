isAdmin=function(user){
	
	//console.log(user);
  if(!user || typeof user === 'undefined')
    return false;
 // console.log(user);
  return (user.profile.role=="admin");
}
isAdminById=function(userId){
	  var user = Meteor.users.findOne(userId);
	  return user && isAdmin(user);
	};
getAsanaId=function(userId)
{
	var user = Meteor.users.findOne(userId);
	  return user.services.asana.id;
}