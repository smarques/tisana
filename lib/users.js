isAdmin=function(user){
  if(!user || typeof user === 'undefined')
    return false;
  return !!user.isAdmin;
}