  Template.topbar.helpers({
	  'userLogged': function()
	  {
		  return Meteor.userId();
	  },
	  'workspaces':function()
	  {
		 return Session.get('workspaces');
	  },
	  'workspaceSelected':function()
	  {
		  return Session.get('currentWorkspace');
	  },
	  'currentWorkspaceName':function()
	  {
		  return Session.get('currentWorkspaceName');
	  },
	  'projects':function()
	  {
		 return Session.get('projects');
	  },
	  'projectSelected':function()
	  {
		  return Session.get('currentProject');
	  },
	  'workspaceMenuLabel':function()
	  {
		  
		  return Session.get('currentWorkspaceName') || 'Workspaces';
	  },
	  'projectMenuLabel':function()
	  {
		  
		  return Session.get('currentProjectName') || 'Projects';
	  }
  });
  
  
  Template.topbar.events({
	    'click #sync' : function () {
	      // template data, if any, is available in 'this'
	    //	stopRunningJobs();
	    	showLoader();
	    	Meteor.call('resyncAsana',Session.get('currentWorkspace'), function(err, data){stopLoader();});
	    },
	    'click #workspaces li': function()
	    {
	    	//stopRunningJobs();
	    	Session.set('currentProject', null );
	    	Session.set('currentWorkspace', this.id);
	    	Session.set('currentWorkspaceName', this.name);
	    },
	    'click #projects li': function()
	    {
	    	
	    	if(this.id)
	    	{
	    	Session.set('currentProject', this.id);
	    	Session.set('currentProjectName', this.name);
	    	}
	    	else
	    	{
	    		Session.set('currentProject', null );
	        	Session.set('currentProjectName', null );
	    	}
	    }
	  });