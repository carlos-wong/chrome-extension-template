window.addEventListener ("load", myMain, false);
var gitlab = require('./gitlab');

function InitPassBtn(){
  //
  let commentDiv = document.querySelector('#notes > div > ul > li > div > div.timeline-content.timeline-content-form > form > div.note-form-actions');
  let closeissueBtn = document.querySelector('#notes > div > ul > li > div > div.timeline-content.timeline-content-form > form > div.note-form-actions > button');
  if(commentDiv && closeissueBtn){
    let commentBtn = document.createElement("Button");       // Create a <li> node
    commentBtn.className = closeissueBtn.className;
    commentBtn.style.marginLeft = "6px";
    var textnode = document.createTextNode("Pass Softdev Code Review");  // Create a text node
    commentBtn.appendChild(textnode);
    commentBtn.onclick = HandlePassClick;
    commentDiv.appendChild(commentBtn);
  }
}

function HandlePassClick(){
  let curURL = document.URL;
  let urlInfo = gitlab.GitlabParseURLInfo(curURL);
  console.dir(urlInfo);
  gitlab.GitlabCommentMr(urlInfo.project,urlInfo.mr,"#pass",(data)=>{
    window.location.reload();
  });
}

function myMain(){
  let curURL = document.URL;
  let urlInfo = gitlab.GitlabParseURLInfo(curURL);
  gitlab.QueryProjectMr(urlInfo.project,urlInfo.mr,(data)=>{
    let assigneeUsername = data.assignee && data.assignee.username;
    if(assigneeUsername === "softdev_merge_bot"){
      InitPassBtn();
    }
  });
}
