

Deps.autorun(function() {
	  if (Meteor.userId()) {
	    // do something when they've just logged in.
		  showLoader();
		  Meteor.call('listWorkspaces', function(err, data) {
			  stopLoader();
			 
			  if (err)
				  {
				 
				  userManagement.requestReauthorization(err);
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
		  //stopRunningJobs();
		  showLoader();
		  Meteor.call('listWorkspaceProjects', Session.get('currentWorkspace'), function(err, data) {
			  stopLoader();
			  if (err)
			    console.log(err);
		
			  Session.set('projects', data);
			});
	  }
	});
  
 TasksHandle = null;

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


Deps.autorun(function() {
	  if (Meteor.userId() && usersLib.isAdmin(Meteor.user())) {
		  Meteor.subscribe('allUsers');
	  }
	});