var searchInput = document.querySelector("#searchSymbol");
var searchClicked = document.querySelector("#searchBtn");
var dispStock = document.querySelector("table");
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
   var searchVal = searchInput.value;
console.log("button searchClicked")
   updateDispStock(searchVal);
}


function updateDispStock(searchVal){
   var url = `https://api.iextrading.com/1.0/stock/${searchVal}/company`;
console.log("MY URL", url);
   var request = new XMLHttpRequest();
   request.open('GET', url);
   request.responseType = 'json';

   request.onload = function() {
      var resp = request.response;
console.log("GOT", resp);

      var tblLen = dispStock.rows.length;
      var respKeys = Object.keys(resp);
      for(var i = 0; i < respKeys.length; i++) {

         if(tblLen === 0) {
            var row = dispStock.insertRow(i);

            row.insertCell(0).innerHTML = respKeys[i];
            row.insertCell(1).innerHTML = resp[respKeys[i]];
         } else if (tblLen === respKeys.length) {
            dispStock.rows[i].cells[1].innerHTML = resp[respKeys[i]];
         }
      }
   };

   request.send()
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
console.log("CREATING SCRIPT")
   var script  = document.createElement("script");
   script.text = currNode.innerHTML;
   for( var i = currNode.attributes.length-1; i >= 0; i-- ) {
      script.setAttribute(currNode.attributes[i].name, currNode.attributes[i].value );
   }
    
   return script;
}