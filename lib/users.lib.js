usersLib = 
{
		isAdmin:function(user){
			
			//console.log(user);
		  if(!user || typeof user === 'undefined')
		    return false;
		 // console.log(user);
		  return (user.profile.role=="admin");
		},
		isAdminById:function(userId){
			  var user = Meteor.users.findOne(userId);
			  return user && usersLib.isAdmin(user);
		},
		getAsanaId : function(userId)
		{
			var user = Meteor.users.findOne(userId);
			  return user.services.asana.id;
		},
		demoteUser : function( userId)
		{
			
			if(Meteor.userId()!=userId)//we make sure there always be one admin
			{
				Meteor.users.update(
						{_id: userId},{$set:{"profile.role":'user'}} );
			}
			else
			{
				throw new Meteor.Error('You can note demote yourself. Be nice to yourself.');
			}
		},
		promoteUser : function( userId)
		{
			Meteor.users.update(
					{_id: userId},{$set:{"profile.role":'admin'}} );
		},
		setUserFee: function( userId, fee)
		{
			Meteor.users.update(
					{_id: userId},{$set:{"fee":fee}} );
		}
}




