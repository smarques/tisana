 // code to run on server at startup
	Meteor.publish("userData", function () {
		  return Meteor.users.find({_id: this.userId},
		                           {
			  fields: 
			  	{
				 'isAdmin': true
				  }
		  });
		});

Meteor.publish('userProjectTasks', function (projectId) {
	  return Tasks.find({
		  $and: [
		
		  {"details.projects.id":projectId},
		  {"details.completed":false}
		  ]
		  });
	});
Meteor.publish('userWorkspaceTasks', function (wsId) {
	  return Tasks.find({
		  $and: [
		
		  {"details.workspace.id":wsId},
		  {"details.completed":false}
		  ]
		  });
	});
Meteor.publish('allUsers', function() {
	  if (this.userId && isAdminById(this.userId)) {
	    // if user is admin, publish all fields
	    return Meteor.users.find();
	  }else{
		  return false;
	  }
	});