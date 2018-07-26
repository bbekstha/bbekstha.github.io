function personSearch(searchParam) {
	// Setup to remove table and paragraph if exists
	var resTbl = document.getElementById("foundEntries")
	var resMsg = document.getElementById("resultMessage")
	var loadingIcon = document.getElementById("loadIcon")
	var homeBtn = document.getElementById("homeBtn")

	// Remove any previous results if exists
	if(resTbl) {
		resTbl.parentNode.removeChild(resTbl);
	}

	if(resMsg) {
		resMsg.parentNode.removeChild(resMsg);
	}

	if(loadingIcon) {
		loadingIcon.parentNode.removeChild(loadingIcon);
	}

	// Go home disabled while searching
	homeBtn.disabled = true;

	var url = `http://localhost:8080/personSearch?searchParam=${searchParam}`
	url = encodeURI(url)

	createDiv("loadIcon", "loader");

	// request to retrieve the search result
	fetch(url, {mode:'cors'}).then(function(response){
		return response.json().then(function(myJson){
			console.log(myJson)
			let keys = Object.keys(myJson)


			var loadIcon = document.getElementById("loadIcon");
			loadIcon.parentNode.removeChild(loadIcon);
			homeBtn.disabled = false;

			createParagraph("resultMessage", "contentItems")
			createTable("foundEntries", "contentItems")

			let resMsg = document.getElementById("resultMessage")
			let entryTable = document.getElementById("foundEntries")
			let tblHeaderVal = ["Name", "Phone", "Dept", "Username", "Email"]
			if(!keys.length) {
				resMsg.innerHTML = "No entries found"
			} else {

				resMsg.innerHTML = `Found ${keys.length} entries`

				for(key in keys) {

					var entry = myJson[keys[key]]

					let entryKeys = Object.keys(entry)

					var row = entryTable.insertRow()
					row.className = "tBodyRow"
					for(entryKey in entryKeys) {
						row.insertCell().innerHTML = entry[entryKeys[entryKey]]
					}
				}

				let headerRow = entryTable.createTHead().insertRow(0)
				headerRow.className = "thRow"
				for(cellVal in tblHeaderVal) {
					headerRow.insertCell().innerHTML = '<b>' +
					tblHeaderVal[cellVal] + '</b>'
				}
			}
		})
	})
}
