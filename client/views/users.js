Template.users.helpers({
	"users":function()
	{
		return getSelectedUsers();
	},
	"canPromote":function()
	{
		//console.log(this);
		return (this.profile.role != 'admin' && isAdmin(Meteor.user()));
	},
	"canDemote":function()
	{
		
		return (this._id!= Meteor.userId() && this.profile.role != 'user' && isAdmin(Meteor.user()));
	}
});
Template.users.events({
	 'keyup #userSearch': function()
	    {
	    	updateUserSearch();	
	    } ,
	    'click a.clearUserSearch': function()
	    {
	    	clearUserSearch();
	    },
	    'click div.demote': function()
	    {
	    	demoteUser(this._id);
	    },
	    'click div.promote': function()
	    {
	    	promoteUser(this._id);
	    },
	    'blur input.fee':function()
	    {	    	
	    	
	    	var fee = parseFloat($('#'+this._id+' input.fee').val());
	    	if(fee)
	    		{
	    			setUserFee(this._id, fee);
	    		}
	    }
});