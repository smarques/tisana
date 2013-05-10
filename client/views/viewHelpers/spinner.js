
Loader = new Spinner({color:'#FFF', radius:5, length:8});
showLoader = function()
{
	
	 Loader.spin(document.getElementById("asloader"));
};
stopLoader = function(){
	Loader.stop();
};
