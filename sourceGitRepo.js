var accessTokenInput = document.getElementById("accessToken");
var searchClicked = document.getElementById("searchGitBtn");
var dispTblGit = document.getElementById("gitRepos");

searchClicked.onclick = function() {
console.log("REPO btn clicked")
   var acsTkn = accessTokenInput.value;
   updateDispGit(acsTkn);
}

function updateDispGit(searchVal){
   var url = `https://api.github.com/user?access_token=${searchVal}`;
console.log("MY URL 1", url);

   fetch(url).then(function(response) {
      response.json().then(function(jsonResp) {
         var repoUrl = jsonResp.repos_url;
console.log("MY URL 2", repoUrl);
         fetch(repoUrl).then(function(repoResp) {
            repoResp.json().then(function(repoJson) {

               for(repo in repoJson) {
                  var row = dispTblGit.insertRow(repo);

                  row.insertCell(0).innerHTML = "name"
console.log("repo", repoJson[repo].name);
                  row.insertCell(1).innerHTML = repoJson[repo].name;
               }
            })
         })
      })
   });

   request.send();
}