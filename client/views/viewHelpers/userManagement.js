requestReauthorization = function( err )
  {
	  if(err.error == 401)
	  {
		  //alert
		  Meteor.logout();
	  }
	  else
	  console.log(err);
  };
  
  getAllUsers = function(){
		  return Meteor.users.find();
  
 };
 updateUserSearch = function()
 {
 	Session.set('userSearch',$('#userSearch').val());
 }; 
 getSelectedUsers = function()
 {
 	var search = Session.get( 'userSearch' );
 	
 	if(search)
 	{
 		var mongoDbArr = [];
 		mongoDbArr.push({'profile.name': new RegExp(search,"i")});
 	/*	mongoDbArr.push({'details.notes': new RegExp(search,"i")});
 		mongoDbArr.push({'details.tags.name': new RegExp(search,"i")});*/
 		return Meteor.users.find( { $or: mongoDbArr } );
 	}
 	else
 	{
 		return Meteor.users.find();
 	}
 };
 clearTaskSearch = function()
 {
 	Session.set('userSearch','');
 };