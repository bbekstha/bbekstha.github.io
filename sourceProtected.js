var homeBtn = document.getElementById("to_home");
var dispTblPet = document.getElementById("pets");
var h1Count = 0;

updateDispPet()

this.homeBtn.onclick = function() {
console.log("HOME IS CLICKED")
   fetch("index.html").then(function (response) {
      response.text().then(function (textHtml) {

         document.getElementById("container").innerHTML = textHtml
         modifyContainer(document.getElementsByTagName("div")[0])
      })
   })
}


function updateDispPet(){
console.log("GET AND INSERT PETS")
   var url = "https://api-dev.calpoly.edu/pets";
   let headers = {
      "Content-Type": "application/json"
   } 

   let auth_token = getCookie("id_token")
   if (auth_token) {
      headers["Authorization"] = `Bearer ${auth_token}`;
   }

   fetch(url, {headers, mode:'cors'}).then(function(response) {
      response.json().then(function(petsJson) {
         var keys = Object.keys(petsJson);

         for(key in keys) {
            var petKeys = Object.keys(petsJson[key]);
            var row;
            if(!key) {
               row = dispTblPet.createTHead().insertRow(0);
               for (petKey in petKeys) {
                  row.insertCell().innerHTML = petKey
               }
            }

            row = dispTblPet.insertRow();
            for(petKey in petKeys) {
               row.insertCell().innerHTML = petsJson[key].petKey
            }
         } 
      })
   })
}

function modifyContainer(startNode) {
   if (startNode.tagName === 'SCRIPT' ) {
      startNode.parentNode.replaceChild(createScript(startNode), startNode);
   } 
   else if(startNode.tagName === 'H1' && !h1Count) {
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


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}