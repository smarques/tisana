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
		currentRunning.stopwatch().unbind('tick.stopwatch');
		currentRunning.stopwatch().stopwatch('stop');
		Session.set('runningTaskName',null);
		Session.set('runningTaskId',null);
		Session.set('runningTaskSeconds', 0 );
	}
	
};

addSessionTimeOnTask = function(secs, taskId)
{
	var st = Session.get('timeOnTasks') || {};
	if(st[taskId]){st[taskId]+=secs;}
	else st[taskId]=secs;
	Session.set('timeOnTasks', st);
}
