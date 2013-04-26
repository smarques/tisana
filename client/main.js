Tasks = new Meteor.Collection("Tasks");
Loader = new Spinner();
showLoader = function()
{
	  Loader.spin(document.getElementsByTagName("body")[0]);
};
stopLoader = function(){Loader.stop();};
Template.topbar.events({
    'click #sync' : function () {
      // template data, if any, is available in 'this'
    	showLoader();
    	Meteor.call('resyncAsana',Session.get('currentWorkspace'), function(err, data){stopLoader();});
    },
    'click #workspaces li': function()
    {
    	Session.set('currentProject', null );
    	Session.set('currentWorkspace', this.id);
    	Session.set('currentWorkspaceName', this.name);
    },
    'click #projects li': function()
    {
    	Session.set('currentProject', this.id);
    }
  });
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
  });
  Template.tasks.helpers({
	"tasks":function()
	{
		return Tasks.find();
	}
  })
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
  
 Deps.autorun(function() {
	  if (Meteor.userId()) {
	    // do something when they've just logged in.
		  showLoader();
		  Meteor.call('listWorkspaces', function(err, data) {
			  stopLoader();
			  if (err)
				  {
			    requestReauthorization(err);
				  }

			  Session.set('workspaces', data);
			});
	  }
	  else
	  {
			Session.set('currentProject', null );
	    	Session.set('currentWorkspace', null);
		  Meteor.call('resetAsana');
	  }
	});
  
  Deps.autorun(function() {
	  if (Session.get('currentWorkspace')) {
		  showLoader();
		  Meteor.call('listWorkspaceProjects', Session.get('currentWorkspace'), function(err, data) {
			  stopLoader();
			  if (err)
			    console.log(err);
		
			  Session.set('projects', data);
			});
	  }
	});
  
var TasksHandle = null;
//Always be subscribed to the todos for the selected list.
Deps.autorun(function () {
 var currP = Session.get('currentProject');
 if (currP)
	 TasksHandle = Meteor.subscribe('userProjectTasks', currP);
 else
	 TasksHandle = null;
});