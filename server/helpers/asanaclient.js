AsanaClient = { _token:'' , _baseUrl : 'https://app.asana.com/api/1.0'};
AsanaClient.setToken = function(token){this._token=token;};

AsanaClient.reset = function(){this._token=null;};
AsanaClient._query = function (method, url)
{
	if(!this._token)
	{
		throw new Meteor.Error(401,"no token set in AsanaClient");
	}

	var header = "Bearer "+this._token;
	  
	var result = Meteor.http.call( method, this._baseUrl + url, {headers:{'Authorization':header},timeout:30000});
	if(result.statusCode==200) {
		    var respJson = EJSON.parse(result.content);
		  
		       
		        return respJson;
		   
		} else {
		    console.log("Content issue: ", result.statusCode,result.content );
		    if(result.statusCode == '401' )
		    {
		    	throw new Meteor.Error(401, "Unauthorized");
		    }
		    else
		    {
		    throw new Meteor.Error(result.statusCode+':'+result.content);
		    }
		}
};

AsanaClient.getWorkspaces = function()
{

	//var url="/tasks?assignee=me";
	var url = "/workspaces";
	var res = this._query('GET', url);
	return res.data;
};
AsanaClient.getWorkspaceProjects = function(wspace)
{
	var url = "/workspaces/"+wspace+"/projects";
	var res = this._query('GET', url);
	return res.data;
};
AsanaClient.getTasks = function(workspace, proj, userid)
{
	var url = "/tasks?";
	
	if(proj){ url += "project="+proj+"&";}
	else if(workspace){ url += "workspace="+workspace+"&";}
	if(userid){ url += "assignee="+userid;}
	//console.log(url);
	var res = this._query('GET', url);
	return res.data;
};
AsanaClient.getFullTask = function(taskid)
{
	var url = "/tasks/"+taskid;	
	var res = this._query('GET', url);
	return res.data;
};
AsanaClient.getUserProfile = function (uid)
{//@todo
};
AsanaClient.syncTasks = function(mytasks)
{
	//console.log(mytasks);
	for (var i = 0; i < mytasks.length; i++) {
		{
			task =mytasks[i];
		}
			
			var fullTask=this.getFullTask(task.id);
			
			task.id+='';
			if (typeof ( item = Tasks.findOne({_id:task.id}) ) == 'undefined')
				Tasks.insert({_id:task.id,workedSecs:0, asanaUser:Meteor.user().services.asana.id,details:fullTask });
				
			else
				//console.log('update');
				Tasks.update(task.id, {$set: {details:fullTask}});
		}
};