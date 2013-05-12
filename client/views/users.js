Template.users.helpers({
	"users":function()
	{
		return getSelectedUsers();
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
	    } 
});