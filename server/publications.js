 // code to run on server at startup
	Meteor.publish("userData", function () {
		  return Meteor.users.find({_id: this.userId},{'currentlyWorkingOn':1});
		});

Meteor.publish('userProjectTasks', function (projectId) {
	  return Tasks.find({
		  $and: [
		
		  {"details.projects.id":projectId},
		  {"details.completed":false},
		  {"asanaUser":usersLib.getAsanaId(this.userId)}
		  ]
		  });
	});
Meteor.publish('userWorkspaceTasks', function (wsId) {
	  return Tasks.find({
		  $and: [
		
		  {"details.workspace.id":wsId},
		  {"details.completed":false},
		  {"asanaUser":usersLib.getAsanaId(this.userId)}
		  ]
		  });
	});
Meteor.publish('allUsers', function() {
	  if (this.userId && usersLib.isAdminById(this.userId)) {
	    // if user is admin, publish all fields
	    return Meteor.users.find({},{'currentlyWorkingOn':1});
	  }else{
		  return false;
	  }
	});

Meteor.startup(function(){
	Tasks.allow({
	      insert: function(userId, doc){
	        return false;
	      }
	    , update: function(userId, doc, fields, modifier){
	        return usersLib.isAdminById(userId) || (doc.asanaUser && doc.asanaUser == usersLib.getAsanaId(userId));
	      }
	    , remove: function(userId, doc){
	       return false;
	      }
	  });
	Meteor.users.allow({
	      insert: function(userId, doc){
	        return false;
	      }
	    , update: function(userId, doc, fields, modifier){
	        return usersLib.isAdminById(userId) || (doc._id && doc._id == userId);
	      }
	    , remove: function(userId, doc){
	       return false;
	      }
	  });
	});