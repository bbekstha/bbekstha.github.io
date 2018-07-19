
function accessFunction(accessToken){
	// var input = document.getElementById("Input").value;
	console.log(accessToken);
	if(!accessToken) {
		createDiv("errorMess", "error", "contentItems");
		let erro = document.getElementById("errorMess")
		erro.innerHTML = "<h2> Enter valid access token and try again </h2>"
		return
	}
	var url = `https://api.github.com/user/repos?access_token=${accessToken}`

	var dispTblGit = document.getElementById("gitRepos");
	var erro = document.getElementById("errorMess");

	if(dispTblGit) {
		dispTblGit.parentNode.removeChild(dispTblGit);
	}
	if(erro) {
		erro.parentNode.removeChild(erro)
	}

	fetch(url).then(function(response){
		return response.json();
	})
	.then(function(repoJson){
		let repoKeys = Object.keys(repoJson);
		if(repoKeys.includes("message")) {
			console.log(repoJson);
			createDiv("errorMess", "error", "contentItems");
			let erro = document.getElementById("errorMess")
			erro.innerHTML = "<h2> Enter valid access token and try again </h2>"
			return
		}

		createTable("gitRepos", "contentItems");
		dispTblGit = document.getElementById("gitRepos");

		for(eachRepo in repoJson) {
			var row = dispTblGit.insertRow(eachRepo);
			row.className = "tBodyRow"
			row.insertCell(0).innerHTML = repoJson[eachRepo].name;
		}
	})
}
