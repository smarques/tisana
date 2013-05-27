Template.users.rendered = function () {
	var users = userManagement.getSelectedUsers().fetch();
	for (var i = 0; i < users.length; i++) {
		var user = users[i];
		if(user.currentlyWorkingOn.name)
		{//http://bl.ocks.org/mbostock/4061961
		var selector = "tr#user_"+user._id+" td.currentProgress";
		console.log(user.currentlyWorkingOn);
	    $(selector).html(user.currentlyWorkingOn.name);
		}
	    //Do something
	}
    //this.node = this.find('#video-map');
  }

Template.users.updateUserSearch = function()
 {
 	Session.set('userSearch',$('#userSearch').val());
 }; 
 Template.users.clearUserSearch = function()
 {
 	Session.set('userSearch','');
 };
 Template.users.updateUserFee = function(userId)
 {
	 var fee = parseFloat($('#user_'+userId+' input.fee').val());
 	if(fee)
 		{
 			usersLib.setUserFee(userId, fee);
 		}
 }
Template.users.helpers({
	"users":function()
	{
		return userManagement.getSelectedUsers();
	},
	"canPromote":function()
	{
		//console.log(this);
		return (this.profile.role != 'admin' && usersLib.isAdmin(Meteor.user()));
	},
	"canDemote":function()
	{
		
		return (this._id!= Meteor.userId() && this.profile.role != 'user' && usersLib.isAdmin(Meteor.user()));
	},
	'formattedFee':function()
	{
		var fee = (this.fee || '0');
		return accounting.formatMoney(fee, "", 2, ".", ",");
	}
});
Template.users.events({
	 'keyup #userSearch': function()
	    {
		 	Template.users.updateUserSearch();	
	    } ,
	    'click a.clearUserSearch': function()
	    {
	    	Template.users.clearUserSearch();
	    },
	    'click div.demote': function()
	    {
	    	usersLib.demoteUser(this._id);
	    },
	    'click div.promote': function()
	    {
	    	usersLib.promoteUser(this._id);
	    },
	    'blur input.fee':function()
	    {	    	
	    	Template.users.updateUserFee( this._id );
	    	
	    	$('#user_'+this._id+' input.fee').hide();
    		$('#user_'+this._id+' span.fee').show();
	    },
	    'click span.fee':function()
	    	{
	    		$('#user_'+this._id+' span.fee').hide();
	    		$('#user_'+this._id+' input.fee').show().focus().select();
	    	},
	    'keypress input.fee': function(ev)
	    {
	    	var w = ev.which;
	    	if(w==13)//enter
	    	{
	    		Template.users.updateUserFee( this._id );
	    		
		    	$('#user_'+this._id+' input.fee').hide();
	    		$('#user_'+this._id+' span.fee').show();
	    	}
	    }
	    
});