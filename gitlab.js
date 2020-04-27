var axios = require('axios');
var config = require('./config');
var lodash = require('lodash');
var gitlab_axios_instance;

chrome.storage.sync.get({
    lejuhubtoken: '',
  }, function(items) {
    config.token = items.lejuhubtoken;
    gitlab_axios_instance = axios.create({
      baseURL: config.api_url,
      timeout: 10000,
      headers: { "PRIVATE-TOKEN": config.token}
    });
  });


function QueryProjectMr(project,iid,callback){
  gitlab_axios_instance && gitlab_axios_instance.get(
      "/projects/" +
        encodeURIComponent(project) +
        "/merge_requests/"+iid
    )
    .then(data => {
      callback(data.data);
    })
    .catch((err)=>{
      callback(err,null);
    });
}

function GitlabCommentMr(project_id,iid,comment,callback){
  gitlab_axios_instance
    .post("/projects/"+encodeURIComponent(project_id)+"/merge_requests/"+iid+"/notes",{
      body:comment
    })
    .then(()=>{
      callback();
    })
    .catch((error)=>{
      callback(error);
    });
}

function GitlabCommentissue(project_id,iid,comment,callback){
  gitlab_axios_instance
    .post("/projects/"+encodeURIComponent(project_id)+"/issues/"+iid+"/notes",{
      body:comment
    })
    .then(()=>{
      callback();
    })
    .catch((error)=>{
      callback(error);
    });
}

function GitlabParseURLInfo(url){
  let projectInfo = {};
  [projectInfo.groupname,projectInfo.projectname,projectInfo.type,projectInfo.bar,projectInfo.mr] =  lodash.split(lodash.split(url,"www.lejuhub.com/")[1],'/');
  projectInfo.project = projectInfo.groupname + '/' + projectInfo.projectname;
  projectInfo.mr = parseInt(projectInfo.mr);
  return projectInfo;
}

function getInstance(){
  return gitlab_axios_instance;
}


let api={};

api.QueryProjectMr = QueryProjectMr;
api.GitlabCommentMr= GitlabCommentMr;
api.GitlabCommentissue = GitlabCommentissue;
api.GitlabParseURLInfo = GitlabParseURLInfo;
api.getInstance = getInstance;

module.exports = api;
