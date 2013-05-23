TimerElapsedTime=0;
TaskTimer = $.timer(function(){
	TimerElapsedTime+=1;
	jobManagement.setRunningTaskElapsedSeconds(TimerElapsedTime);
	}, 1000, false);

formatTime = function (seconds)
{
	 sec_numb    = parseInt(seconds, 10); // don't forget the second parm
	    var hours   = Math.floor(sec_numb / 3600);
	    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
	    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    var time    = hours+':'+minutes+':'+seconds;
	    return time;
}
getSessionTimeOnTask = function(taskId)
{
	var st = Session.get('timeOnTasks') || {};
	if(st[taskId]){return st[taskId];}
	return 0;
}
getSessionTotalTime = function()
{
	var st = Session.get('timeOnTasks') || {};
	var tot = 0;
	for(  el in st )
	{
		tot+=st[el];
	}
	var current = Session.get('runningTaskSeconds');
	return tot + current;
}

