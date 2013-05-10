window.onbeforeunload = function (e) {
		if(haveRunningJobs())
			{

			    return "You have a running job. Please stop it before you leave";
			}
	};