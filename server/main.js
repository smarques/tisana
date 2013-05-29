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
	  resyncAsanaUsers:function(){
			
			var user = Meteor.user();
			var wp=AsanaClient.resyncVisibleUsers();
			
			//console.log(wp);
		  
	  },
	  resetAsana: function()
	  {
		  AsanaClient.reset();
	  },
	  listWorkspaces: function(){
			//this.unblock();
		 
		
			  	
			  	try {
			  		AsanaClient.setToken(Meteor.call('getAccessToken'));
					  var wp = AsanaClient.getWorkspaces();
				    } catch(e) {
				    	throw e;
				    }
			  	
		
		  return wp;
	  },
	  listWorkspaceProjects: function(workspace)
	  {
		  try {
			  var wp = AsanaClient.getWorkspaceProjects(workspace);
		    } catch(e) {
		    
		      return null;
		    }
		 
			 // 
			  //return "pippo";
			  return wp;
	  }
	 
	}); 

