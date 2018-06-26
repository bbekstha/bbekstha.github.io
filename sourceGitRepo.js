var accessTokenInput = document.getElementById("accessToken");
var searchClicked = document.getElementById("searchGitBtn");
var dispTblGit = document.getElementById("gitRepos");

searchClicked.onclick = function() {
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
   })
//    var request = new XMLHttpRequest();
//    request.open('GET', url);
//    request.responseType = 'json';

//    request.onload = function() {
//       var resp = request.response;
// console.log("GOT", resp);

//       var tblLen = dispTbl.rows.length;
//       var respKeys = Object.keys(resp);
//       for(var i = 0; i < respKeys.length; i++) {

//          if(tblLen === 0) {
//             var row = dispTbl.insertRow(i);

//             row.insertCell(0).innerHTML = respKeys[i];
//             row.insertCell(1).innerHTML = resp[respKeys[i]];
//          } else if (tblLen === respKeys.length) {
//             dispTbl.rows[i].cells[1].innerHTML = resp[respKeys[i]];
//          }
//       }
//    };

   request.send();
}