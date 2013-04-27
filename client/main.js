Tasks = new Meteor.Collection("Tasks");
Loader = new Spinner({color:'#FFF', radius:5, length:8});
showLoader = function()
{
	
	 Loader.spin(document.getElementById("asloader"));
};
stopLoader = function(){
	Loader.stop();
	
};

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
    	Session.set('currentProjectName', this.name);
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
	  'workspaceMenuLabel':function()
	  {
		  
		  return Session.get('currentWorkspaceName') || 'Workspaces';
	  },
	  'projectMenuLabel':function()
	  {
		  
		  return Session.get('currentProjectName') || 'Projects';
	  }
  });
  Template.tasks.helpers({
	"tasks":function()
	{
		return Tasks.find();
	},
	"hasTasks":function()
	{
		return Tasks.find().count();
	}
  });
  Template.tasks.events({

	    'click .stopwatch': function()
	    {
	    	console.log(this);
	    	$('#tasks .stopwatch').removeClass('btn-danger');
	    	$('#'+this._id+" .stopwatch").addClass('btn-danger');
	    	
	    }  
  } );
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