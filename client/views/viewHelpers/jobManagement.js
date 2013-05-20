updateTaskSearch = function()
{
	Session.set('taskSearch',$('#taskSearch').val());
}; 
getSelectedTasks = function()
{
	var search = Session.get( 'taskSearch' );
	var res =[];
	if(search)
	{
		var mongoDbArr = [];
		mongoDbArr.push({'details.name': new RegExp(search,"i")});
		mongoDbArr.push({'details.notes': new RegExp(search,"i")});
		mongoDbArr.push({'details.tags.name': new RegExp(search,"i")});
		res= Tasks.find( { $or: mongoDbArr } ).fetch();
	}
	else
	{
		res = Tasks.find().fetch();
	}
	// no subfield in minimongo (YET)
	return _.sortBy(res, 
			function(val){
		if(!val.details || !val.details.due_on){return 60*60*24*365*1000;}//if not set default to 1 yr
		return 1*(Date.parse(val.details.due_on)- (new Date()));
		}
	);
	return res;
};
getSelectedTasksCount=function()
{
	return getSelectedTasks().length;
};
clearTaskSearch = function()
{
	
	Session.set('taskSearch','');
};

haveRunningJobs =function()
{
	var currentRunning = Session.get('runningTaskId');
	return(currentRunning != null);
};

stopRunningJobs = function()
{
	var currentRunning = Session.get('runningTaskId');
	if(currentRunning)
	{
		
		var elapsed = Session.get('runningTaskSeconds');
		var id = currentRunning;
		
		if(elapsed)
		{
			Tasks.update({_id:id}, {$inc:{workedSecs:elapsed}});
			addSessionTimeOnTask(elapsed, id );
		}
		
		

		Session.set('runningTaskName',null);
		Session.set('runningTaskId',null);
		Session.set('runningTaskSeconds', 0 );
		TaskTimer.stop();
		TimerElapsedTime=0;
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
	TaskTimer.play();
	Session.set('runningTaskName',task.details.name);
	Session.set('runningTaskId',task._id);

	// Session.set('runningTaskSeconds', 0 );
	
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

