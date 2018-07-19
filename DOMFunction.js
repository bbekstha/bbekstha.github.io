
// Hides the home page elements
function removeHome(){
	var ogHead = document.getElementById("ogB");
	ogHead.style.display = "none";
	return;
}


// Loops through the childNodes of the body and removes the appropriate elements.
// (mostly for wiping child page elements while not effecting home page elements)
function wipeWholePage(){
	var currNode = document.body.childNodes
	for (var i = 0; i < currNode.length; i++) {
		console.log("curr id", currNode[i].id);
		if(currNode[i].id !== "ogB" &&
		currNode[i].id !== undefined && currNode[i].nodeName !== "H"){
			console.log("Removing.....", currNode[i].id)
			currNode[i].parentNode.removeChild(currNode[i])
		}
	}
}


// CREATE FUNCTIONS
// These functions are each responsible for creating a different elements
// Appends them to the parentNode designated by the given parentId.
//

// Creates html "Button"
function createButton(message, func, id, parentId){
	var mess;
	var btn;
	var parentNode = document.getElementById(parentId)

	btn = document.createElement("BUTTON");
	mess = document.createTextNode(message);
	btn.appendChild(mess);
	btn.setAttribute("id", id);
	btn.setAttribute("onClick", func);
	btn.setAttribute("class", "button");
	parentNode.appendChild(btn);
}

// Creates html "input"
function createInputBox(id, parentId){
	var parentNode = document.getElementById(parentId)
	var box = document.createElement("INPUT");
	box.setAttribute("type", "text");
	box.setAttribute("placeholder", "Type here...");
	box.setAttribute("id", id);
	box.setAttribute("class", "textBox");
	parentNode.appendChild(box);
}

// Creates html "p" elements
function createParagraph(id, parentId){
	console.log("Parent", parentId)
	var parentNode = document.getElementById(parentId)
	var p = document.createElement("P");
	p.setAttribute("type", "text");
	p.setAttribute("id", id);
	parentNode.appendChild(p);
}

// Creates html "Table" elements
function createTable(id, parentId){
	var parentNode = document.getElementById(parentId)
	var t = document.createElement("TABLE");
	t.setAttribute("type", "text");
	t.setAttribute("id", id);
	parentNode.appendChild(t);
}


// Creates html "div" elements
function createDiv(id, clas, parentId){
	var parentNode;
	if(!parentId)
		parentNode = document.body
	else
		parentNode = document.getElementById(parentId)

	var d = document.createElement("DIV");
	d.setAttribute("id", id);
	d.setAttribute("class", clas);
	parentNode.appendChild(d);
}
