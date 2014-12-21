var client = require('./client');

var urlcat = function(paths, path){
  if(typeof path == 'undefined' || path =='GET')
    return clientFactory({path:paths,method:'GET'});
  return (newpath)=>{return urlcat(paths+"/"+path, newpath);};
};

var clientFactory =function(config){
  return client(config);
};
var API = function(user, token){
  this.user = user;
  this.token = token;
  return (path)=>urlcat("",path);
};

module.exports = API();



















