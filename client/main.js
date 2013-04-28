Tasks = new Meteor.Collection("Tasks");
Loader = new Spinner({color:'#FFF', radius:5, length:8});
showLoader = function()
{
	
	 Loader.spin(document.getElementById("asloader"));
};
stopLoader = function(){
	Loader.stop();
};
haveRunningJobs =function()
{
	var currentRunning = $('#tasks .stopwatch.btn-danger');
	return(currentRunning.length);
}
stopRunningJobs = function()
{
	var currentRunning = $('#tasks .stopwatch.btn-danger');
	if(currentRunning.length)
	{
		//get the is so we can update the record
		var id = currentRunning.parents('tr.task').attr('id');
		var elapsed = currentRunning.data('stopwatch').elapsed / 1000;
		Tasks.update({_id:id}, {$inc:{workedSecs:elapsed}});
		addSessionTimeOnTask(elapsed, id );
		currentRunning.removeClass('btn-danger');
		currentRunning.stopwatch().stopwatch('stop');
		
	}
	
};
Template.footer.helpers({
	  'totalSessionTime':function(){
		  return formatTime(getSessionTotalTime());
	  }
});
function addSessionTimeOnTask(secs, taskId)
{
	var st = Session.get('timeOnTasks') || {};
	if(st[taskId]){st[taskId]+=secs;}
	else st[taskId]=secs;
	Session.set('timeOnTasks', st);
}
function getSessionTimeOnTask(taskId)
{
	var st = Session.get('timeOnTasks') || {};
	if(st[taskId]){return st[taskId];}
	return 0;
}
function getSessionTotalTime()
{
	var st = Session.get('timeOnTasks') || {};
	var tot = 0;
	for(  el in st )
	{
		tot+=st[el];
	}
	return tot;
}
function freezeScreen(ms){

    var s=(new Date).getTime();

    while(((new Date).getTime())-s<ms){}

};
window.onbeforeunload = function (e) {
		if(haveRunningJobs())
			{

			    return "You have a running job. Please stop it before you leave";
			}
	};
Template.topbar.events({
    'click #sync' : function () {
      // template data, if any, is available in 'this'
    	stopRunningJobs();
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
	},
	"formatWorkedSecs":function(){
		return formatTime(this.workedSecs);
		
	},
	"formatWorkedSessionSecs":function(){
		return formatTime(getSessionTimeOnTask(this._id));
	}
  });
  Template.tasks.events({

	    'click .stopwatch': function()
	    {
	    	var button = $('#'+this._id+" .stopwatch");
	    	var wasRunning = button.hasClass('btn-danger');
	    	stopRunningJobs();
	    	if(!wasRunning)
	    	{
	    		//start
		    	$('#'+this._id+" .stopwatch").addClass('btn-danger');
	    		$('#'+this._id+" .stopwatch").stopwatch().stopwatch('start');
	    	}
	    	/*
	    	$('#'+this._id+" .stopwatch").stopwatch().stopwatch('start')*/
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