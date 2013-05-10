Tasks = new Meteor.Collection("Tasks");

Meteor.startup(function () {
   
  });

Meteor.methods({
	  getAccessToken : function() {
	    try {
	      return Meteor.user().services.asana.accessToken;
	    } catch(e) {
	      return null;
	    }
	  },
	  resyncAsana: function(wspace, proj){
		
			var user = Meteor.user();
			var wp=AsanaClient.getTasks(wspace, proj,user.services.asana.id);
			AsanaClient.syncTasks(wp);
			//console.log(wp);
		  
	  },
	  resetAsana: function()
	  {
		  AsanaClient.reset();
	  },
	  listWorkspaces: function(){
			//this.unblock();
		 
		
			  	AsanaClient.setToken(Meteor.call('getAccessToken'));
			  	var wp = AsanaClient.getWorkspaces();
		
		  return wp;
	  },
	  listWorkspaceProjects: function(workspace)
	  {
		 
		  var wp = AsanaClient.getWorkspaceProjects(workspace);
			 // console.log('pippo');
			  //return "pippo";
			  return wp;
	  },
	 
	}); 

