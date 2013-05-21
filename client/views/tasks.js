
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
	"formatEstimatedSecs":function(){
		if(this.estimatedSecs)
		return formatTime(this.estimatedSecs);
		return '-';
		
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
	},
	'dueDate':function(){
		if(!this.details.due_on) return '';
		return this.details.due_on;
	},
	'overDue':function(){
		
		return( Date.parse(this.details.due_on) < (new Date()));
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
	    },
	    'blur input.estimatedSecs':function()
	    {	    	
	    	
	    	var fee = parseFloat($('#task_'+this._id+' input.estimatedSecs').val());
	    	if(fee)
	    		{
	    			//setUserFee(this._id, fee);
	    		}
	    	$('#task_'+this._id+' input.estimatedSecs').hide();
    		$('#task_'+this._id+' span.estimatedSecs').show();
	    },
	    'click span.estimatedSecs':function()
	    	{
	    		$('#task_'+this._id+' span.estimatedSecs').hide();
	    		$('#task_'+this._id+' input.estimatedSecs').show().focus().select();
	    	},
	    'keypress input.estimatedSecs': function(ev)
	    {
	    	var w = ev.which;
	    	if(w==13)//enter
	    	{
	    		var fee = parseFloat($('#task_'+this._id+' input.estimatedSecs').val());
		    	if(fee)
		    		{
		    			//setUserFee(this._id, fee);
		    		}
		    	$('#task_'+this._id+' input.estimatedSecs').hide();
	    		$('#task_'+this._id+' span.estimatedSecs').show();
	    	}
	    }
  
  } );