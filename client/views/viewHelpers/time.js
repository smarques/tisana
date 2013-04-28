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