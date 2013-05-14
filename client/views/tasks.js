
Template.tasks.rendered = function()
{
	//$('input.clearable').clearable();
}
Template.tasks.helpers({
	"tasks":function()
	{
		return getSelectedTasks();
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
	},
	"taskHasDetails": function()
	{
		return (this.details.notes.length > 0);
	},
	"taskIsRunning": function()
	{
		return (this._id == Session.get('runningTaskId'));
	},
	"currentSearchString": function()
	{
		
		return Session.get( 'taskSearch' );
	},
	'tags': function (){
		var res = this.details.tags;
		
		return res;
	}
  });
  Template.tasks.events({

	    'click .stopwatch': function()
	    {
	    	
	    	var button = $('#'+this._id+" .stopwatch");
	    	var wasRunning = (this._id == Session.get('runningTaskId') );
	    	
	    	stopRunningJobs();
	    	if(!wasRunning)
	    	{
	    		
		    	
	    		
	    		startTask(this);
	    	}
	    	/*
	    	$('#'+this._id+" .stopwatch").stopwatch().stopwatch('start')*/
	    },
	    'keyup #taskSearch': function()
	    {
	    	updateTaskSearch();	
	    } ,
	    'click a.clearTaskSearch': function()
	    {
	    	clearTaskSearch();
	    } ,
	    'click .tag': function()
	    {
	    	Session.set('taskSearch',this.name);
	    }
  
  } );