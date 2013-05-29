Template.footer.helpers({
	  'totalSessionTime':function(){
		  var sessTime = getSessionTotalTime();
		  if( sessTime )
		  {
			  return formatTime(sessTime);
	  	  }
		  return '';
	  },
	  'sessionTimeOnJob' : function(){
		  return 12;
		 
		 
	  },
	  'selectedTasks':function(){
		return  jobManagement.getSelectedTasksCount();
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
		 jobManagement.stopRunningJobs();
		}
});