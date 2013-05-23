window.onbeforeunload = function (e) {
		if(jobManagement.haveRunningJobs())
			{

			    return "You have a running job. Please stop it before you leave";
			}
	};