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
};

haveRunningJobs =function()
{
	var currentRunning = $('#tasks .stopwatch.btn-danger');
	return(currentRunning.length);
};

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
		Meteor.users.update({_id:Meteor.userId()},
				{
				$set:{
					'currentlyWorkingOn':
						{
							'name':null,
							'taskId':null,
							'elapsedSeconds':null
							
						}
					}
				});
	}
	
};

addSessionTimeOnTask = function(secs, taskId)
{
	var st = Session.get('timeOnTasks') || {};
	if(st[taskId]){st[taskId]+=secs;}
	else st[taskId]=secs;
	Session.set('timeOnTasks', st);
};

startTask = function(task)
{
	Session.set('runningTaskName',task.details.name);
	Session.set('runningTaskId',task._id);
	 Session.set('runningTaskSeconds', 0 );
	Meteor.users.update({_id:Meteor.userId()},
		{
		$set:{
			'currentlyWorkingOn':
				{
					'name':task.details.name,
					'taskId':task._id
				}
			}
		});
};

setRunningTaskElapsedSeconds = function(secs)
{
	Session.set('runningTaskSeconds', secs );
	if (secs % 10 == 0) 
	{
		Meteor.users.update({_id:Meteor.userId()},
				{
				$set:{
					'currentlyWorkingOn.elapsedSeconds':secs
					}
				});
	}
};

