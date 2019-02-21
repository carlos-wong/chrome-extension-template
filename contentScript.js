window.addEventListener ("load", myMain, false);
var gitlab = require('./gitlab');

function InitPassBtn(){
  //
  let commentDiv = document.querySelector('#notes > div > ul > li > div > div.timeline-content.timeline-content-form > form > div.note-form-actions');
  let closeissueBtn = document.querySelector('#notes > div > ul > li > div > div.timeline-content.timeline-content-form > form > div.note-form-actions > button');
  if(commentDiv && closeissueBtn){
    let commentBtn = document.createElement("Button");       // Create a <li> node
    commentBtn.className = closeissueBtn.className;
    var textnode = document.createTextNode("Pass Softdev Code Review");  // Create a text node
    commentBtn.appendChild(textnode);
    commentBtn.addEventListener('click', function() {
      HandlePassClick();
    });
    commentDiv.appendChild(commentBtn);
  }
}

function HandlePassClick(){
  let curURL = document.URL;
  let urlInfo = gitlab.GitlabParseURLInfo(curURL);
  // gitlab.GitlabCommentMr(urlInfo.project,urlInfo.mr,"#pass",(data)=>{});
}

function myMain(){
  let curURL = document.URL;
  let urlInfo = gitlab.GitlabParseURLInfo(curURL);
  gitlab.QueryProjectMr(urlInfo.project,urlInfo.mr,(data)=>{
    let assigneeUsername = data.assignee && data.assignee.username;
    if(assigneeUsername === "carlos_softdev_merge_bot"){
      InitPassBtn();
    }
  });
}
