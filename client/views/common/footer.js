Template.footer.helpers({
	  'totalSessionTime':function(){
		  var sessTime = getSessionTotalTime();
		  if( sessTime )
		  {
			  return formatTime(sessTime);
	  	  }
		  return '';
	  },
	  'selectedTasks':function(){
		return  getSelectedTasksCount();
	  },
	  'runningTaskShortName':function(){
		  if( Session.get('runningTaskName'))
		  return Session.get('runningTaskName').substr(0,40);
	  },
	  'runningTaskFullName':function(){
		  if( Session.get('runningTaskName'))
		  return Session.get('runningTaskName');
	  }
	  
});
Template.footer.events({
	'click #cronWatchButtonCurrent':function()
		{
		stopRunningJobs();
		}
});