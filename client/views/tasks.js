
Template.tasks.rendered = function()
{
	
};
Template.tasks.getEstimatedTime=function(taskid)
{
	var hours = parseFloat($('#task_'+taskid+' span.estimatedTimeInput input.estimatedHours').val()) || 0;
	var mins = parseFloat($('#task_'+taskid+' span.estimatedTimeInput input.estimatedMins').val()) || 0;
	
	$('#task_'+taskid+' span.estimatedTimeInput').hide();
	$('#task_'+taskid+' span.estimatedSecs').show();
	var secs = Math.floor(hours * 60 * 60 + mins * 60);
	jobManagement.setTaskEstimatedTime(taskid, secs);
};
Template.tasks.updateTaskSearch = function()
{
	Session.set('taskSearch',$('#taskSearch').val());
}; 

Template.tasks.clearTaskSearch = function()
{
	
	Session.set('taskSearch','');
};
Template.tasks.helpers({
	"tasks":function()
	{
		return jobManagement.getSelectedTasks();
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
	"estimatedMins":function()
	{
		if(!this.estimatedSecs) return;
		return Math.floor((this.estimatedSecs % (3600))/60);
	},
	"estimatedHours":function()
	{
		if(!this.estimatedSecs) return;
		return Math.floor(this.estimatedSecs / (3600));
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
	},
	'overRunning':function(){
		
		return( (this.estimatedSecs > 0) && (this.workedSecs > this.estimatedSecs));
	}
  });
  Template.tasks.events({

	    'click .stopwatch': function()
	    {
	    	
	    	var button = $('#'+this._id+" .stopwatch");
	    	var wasRunning = (this._id == Session.get('runningTaskId') );
	    	
	    	jobManagement.stopRunningJobs();
	    	if(!wasRunning)
	    	{	    		
	    		jobManagement.startTask(this);
	    	}
	    	
	    },
	    'keyup #taskSearch': function()
	    {
	    	Template.tasks.updateTaskSearch();	
	    } ,
	    'click a.clearTaskSearch': function()
	    {
	    	
	    	Template.tasks.clearTaskSearch();
	    } ,
	    'click .tag': function()
	    {
	    	Session.set('taskSearch',this.name);
	    },
	    'blur span.estimatedTimeInput input':function()
	    {	var task=this;
	    	setTimeout(function(){
	    		   //same row
	    		
	    			var rowInputs = $('#task_'+task._id+' span.estimatedTimeInput input:focus');
	    			if(!rowInputs.length)
	    				{
	    				Template.tasks.getEstimatedTime(task._id);
	    				}
	    			}, 500);

	    	
	    },
	    'click span.estimatedSecs':function()
	    	{
	    		if(usersLib.isAdmin(Meteor.user()))
	    		{
	    		$('#task_'+this._id+' span.estimatedSecs').hide();
	    		$('#task_'+this._id+' span.estimatedTimeInput').show();
	    		$('#task_'+this._id+' span.estimatedTimeInput input:first').show().focus().select();
	    		}
	    	},
	    'keypress span.estimatedTimeInput input': function(ev)
	    {
	    	var w = ev.which;
	    	if(w==13)//enter
	    	{
	    		
	    		Template.tasks.getEstimatedTime(this._id);
	    	}
	    }
  
  } );