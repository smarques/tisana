updateTaskSearch = function()
{
	Session.set('taskSearch',$('#taskSearch').val());
}; 
getSelectedTasks = function()
{
	var search = Session.get( 'taskSearch' );
	
	if(search)
	{
		var mongoDbArr = [];
		mongoDbArr.push({'details.name': new RegExp(search,"i")});
		mongoDbArr.push({'details.notes': new RegExp(search,"i")});
		mongoDbArr.push({'details.tags.name': new RegExp(search,"i")});
		return Tasks.find( { $or: mongoDbArr } );
	}
	else
	{
		return Tasks.find();
	}
};
clearTaskSearch = function()
{
	Session.set('taskSearch','');
}
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
	    	var wasRunning = button.hasClass('btn-danger');
	    	stopRunningJobs();
	    	if(!wasRunning)
	    	{
	    		//start
		    	$('#'+this._id+" .stopwatch").addClass('btn-danger');
		    	$('#'+this._id+" .stopwatch").stopwatch().bind('tick.stopwatch', function(e, elapsed){
		    		 Session.set('runningTaskSeconds', elapsed / 1000 );
		    		/*console.log( elapsed );
		    		if (elapsed % 30000 == 0) {
		    	       Session.set('runningTaskSeconds', elapsed / 30000 );
		    	       console.log( elapsed % 30000 );
		    	    }*/
		    	});
	    		$('#'+this._id+" .stopwatch").stopwatch().stopwatch('start');
	    		//console.log(this);
	    		Session.set('runningTaskName',this.details.name);
	    		Session.set('runningTaskId',this._id);
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