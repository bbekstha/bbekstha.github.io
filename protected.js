// Redirect to login if missing cookie with name 'id_token'
function authenticate() {
	let cookieVal = getCookie("id_token")
	let client_id = "2fior6770hvto4u6kuq084j7fu";
	let redirect_uri = "https://bbekstha.github.io";

	if (cookieVal == ""){
		let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
		`client_id=${client_id}&redirect_uri=${redirect_uri}`;

		window.location = loginUrl
	} else if ((new Date(cookieVal.expDate) - (29.5 * 60 * 1000) - new Date())/60000 <= 30) {
      let update_url = `https://cognito-dev.calpoly.edu/oauth2/authorize?` +
		 `response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`
         console.log("update_url")
         window.location = update_url;
	}
}

function protectedContent(){
	console.log("inside protectedContent()");

	authenticate();
	let id_token = getCookie('id_token').value;

	createParagraph("display", "contentItems");
	createTable("petsTable", "contentItems");

	document.getElementById("display").innerHTML = "<h2>PROTECTED CONTENT " +
	"ACCESS GRANTED</h2><br><h4> You can now view and buy pets</h4>";

	let dispTblPet = document.getElementById("petsTable");
	var url = "https://api-dev.calpoly.edu/pets";

	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${id_token}`);

	// make request to get the protected data
	fetch(url, {headers: headers, mode : 'cors'}).then(function(response){
		return response.json();
	})
	.then(function(petsJson){

		var keys = Object.keys(petsJson);
		var petKeys = Object.keys(petsJson[0]);
		for(key in keys) {
			var petJson = petsJson[key]

			var row = dispTblPet.insertRow();
			row.className = "tBodyRow"
			for(petKey in petKeys) {
				var keyName = petKeys[petKey]
				row.insertCell().innerHTML = petJson[keyName]
			}
		}

		row = dispTblPet.createTHead().insertRow(0);
		row.className = "thRow"
		for (petKey in petKeys) {
			row.insertCell().innerHTML = '<b>' + petKeys[petKey] + '</b>'
		}
	})
	return;
}
