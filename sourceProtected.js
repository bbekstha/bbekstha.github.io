var homeBtn = document.getElementById("to_home");
var dispTblPet = document.getElementById("pets");
var h1Count = 0;


window.onload = function () {
console.log("UPDATING TABLE")
   updateDispPet()
}

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
   var url = "https://api-dev.calpoly.edu/dev/pets";
   let headers = {"Content-Type": "application/json"} 

   let auth_token = "eyJraWQiOiJTNlp6cWFZdzh2SlFcLyszUXRoUldnRGp6M0srTWFvOElTZWxST0RPSmh3TT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoieGdyY2RBZkpZOFN6d1hwcEZqNHc5QSIsInN1YiI6IjBkZTA5NTZmLTE3ZjItNDE3OC05YzU0LTExODljNThmOTUyZCIsImF1ZCI6IjJmaW9yNjc3MGh2dG80dTZrdXEwODRqN2Z1IiwiZXZlbnRfaWQiOiJjMjg4OTQ3OC03YWZmLTExZTgtYTJiMC1iNTI0ZDkyNzIzNGQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUzMDIwOTk1MywiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfTGxvZFlneVFOIiwiY29nbml0bzp1c2VybmFtZSI6ImJzaHJlc3RoIiwiZXhwIjoxNTMwMjEzNTUzLCJpYXQiOjE1MzAyMDk5NTMsImVtYWlsIjoiYnNocmVzdGhAY2FscG9seS5lZHUifQ.K2F1gGB0MpLN93HZ0xczlK7X4GJTSkiMi854hcC8_w64vTZVYi8sHfrXQ1RIy5PFo0d0vTKnRv9-vYo1Etu2EYGWuv91EjeqPvPNrt0f_a80i6d7JuV1c9WFHUYhPYbfQYMr9GIBR1gZh_oyW4CIE5jMDpx554dLY3U-46ufQ1vrIMlvv8i8n1MNrbpXmt40J1RqRzaoNyxQp6CosfYFWOjr4XhxpO9UD9ospvMRddcvoeucRIcKRgvDGqIkK6NOhVtHuDDp1lDV9c8O520-SDROvXSk9KgQzIBiQ6gAMd4xfGERgdSsIM_gj9Z0yXcPxslQOfeLkNCzvZqQ08RsHw"
   if (auth_token) {
      headers["Authorization"] = `Bearer ${auth_token}`;
   }

   fetch(url, {headers}).then(function(response) {
      response.json().then(function(petsJson) {
console.log("MY PETS", petsJson)
         var petKeys = Object.keys(petsJson);

         for (var i = 0; i < petKeys.length; i++) {
            var r = dispTblPet.createTHead().insertRow(0);
            r.insertCell(i).innerHTML = key[i]
         }

         for(pet in petsJson) {
            var row = dispTblPet.insertRow();
            for (var i = 0; i < petKeys.length; i++) {
               row.insertCell(i).innerHTML = pet.petKeys[i];
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