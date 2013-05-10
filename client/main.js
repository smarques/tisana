Tasks = new Meteor.Collection("Tasks");
Meteor.subscribe("userData");

Loader = new Spinner({color:'#FFF', radius:5, length:8});
showLoader = function()
{
	
	 Loader.spin(document.getElementById("asloader"));
};
stopLoader = function(){
	Loader.stop();
};


window.onbeforeunload = function (e) {
		if(haveRunningJobs())
			{

			    return "You have a running job. Please stop it before you leave";
			}
	};

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
		  stopRunningJobs();
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

Deps.autorun(function () {
 var currP = Session.get('currentProject');
 var currW = Session.get('currentWorkspace');
 if (currP)
	 TasksHandle = Meteor.subscribe('userProjectTasks', currP);
 else if(currW)
	 TasksHandle = Meteor.subscribe('userWorkspaceTasks', currW);
 else
	 TasksHandle = null;
});