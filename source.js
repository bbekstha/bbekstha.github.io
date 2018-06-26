var stockBtn = document.getElementById("to_stock");
var repoBtn = document.getElementById("to_repo");


stockBtn.onclick = function() {
console.log("STOCK IS CLICKED")
	// document.getElementById("content").innerHTML = '<object type="text/html" '+
	// 'data="stock.html"></object>';
	fetch("stock.html").then(function (response) {
		response.text().then(function (textHtml) {
			document.getElementById("content").innerHTML = textHtml
		})
	})
}

repoBtn.onclick = function() {
console.log("REPO IS CLICKED")
	fetch("gitRepo.html").then(function (response) {
		response.text().then(function (textHtml) {
			document.getElementById("content").innerHTML = textHtml
		})
	})
}