var accessTokenInput = document.getElementById("accessToken");
var searchClicked = document.getElementById("searchGitBtn");
var dispTblGit = document.getElementById("gitRepos");
var homeBtn = document.getElementById("to_home");
var h1Count = 0;

this.homeBtn.onclick = function() {
console.log("HOME IS CLICKED")
   fetch("index.html").then(function (response) {
      response.text().then(function (textHtml) {

         document.getElementById("container").innerHTML = textHtml
         modifyContainer(document.getElementsByTagName("div")[0])
      })
   })
}

searchClicked.onclick = function() {
console.log("REPO btn clicked")
   var acsTkn = accessTokenInput.value;
   updateDispGit(acsTkn);
}

function updateDispGit(searchVal){
   var url = `https://api.github.com/user/repos?access_token=${searchVal}`;
console.log("MY URL 1", url);

   fetch(url).then(function(response) {
      response.json().then(function(repoJson) {

         for(repo in repoJson) {
            var row = dispTblGit.insertRow(repo);
            row.insertCell(0).innerHTML = repoJson[repo].name;
         }
      })
   })
}

function modifyContainer(startNode) {
   if (startNode.tagName === 'SCRIPT' ) {
      startNode.parentNode.replaceChild(createScript(startNode), startNode);
   } 
   else if(startNode.tagName === 'H1' && !h1Count) {
console.log("HERE")
      startNode.parentNode.removeChild(startNode);
      h1Count++;
   }
   else {
      var i = 0;
      var children = startNode.childNodes;
      while ( i < children.length ) {
         modifyContainer(children[i++]);
      }
   }

   return startNode;
}

function createScript(currNode){
   var script  = document.createElement("script");
   script.text = currNode.innerHTML;
   for( var i = currNode.attributes.length-1; i >= 0; i-- ) {
      script.setAttribute(currNode.attributes[i].name, currNode.attributes[i].value );
   }
    
   return script;
}