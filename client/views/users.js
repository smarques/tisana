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
	    	
	    	var fee = parseFloat($('#user_'+this._id+' input.fee').val());
	    	if(fee)
	    		{
	    			setUserFee(this._id, fee);
	    		}
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
	    		var fee = parseFloat($('#user_'+this._id+' input.fee').val());
		    	if(fee)
		    		{
		    			setUserFee(this._id, fee);
		    		}
		    	$('#user_'+this._id+' input.fee').hide();
	    		$('#user_'+this._id+' span.fee').show();
	    	}
	    }
	    
});