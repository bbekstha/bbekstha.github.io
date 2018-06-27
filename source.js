var stockBtn = document.getElementById("to_stock");
var repoBtn = document.getElementById("to_repo");
var protectedBtn = document.getElementById("to_protected");
var regex = "/([^&=]+)=([^&]*)/g"

stockBtn.onclick = function() {
console.log("STOCK IS CLICKED")
    fetch("stock.html").then(function (response) {
    	response.text().then(function (textHtml) {
    		document.getElementById("content").innerHTML = textHtml
    		modifyScript(document.getElementsByTagName("body")[0])
    	})
    })
}

repoBtn.onclick = function() {
console.log("REPO IS CLICKED")
	fetch("gitRepo.html").then(function (response) {
		response.text().then(function (textHtml) {
			document.getElementById("content").innerHTML = textHtml
			modifyScript(document.getElementsByTagName("body")[0])
		})
	})
}

protectedBtn.onclick = function() {
console.log("PROTECTED IS CLICKED")

    var auth_clientId = "2fior6770hvto4u6kuq084j7fu"
    var redirUrl = "https://bbekstha.github.io"
    if(!getCookie("access_token")) {
        var auth_url = `https://cognito-dev.calpoly.edu/login?` + 
        `response_type=token&client_id=${auth_clientId}&redirect_uri=${redirUrl}`
        var hashFrag = window.location.hash.substring(1)
console.log("HASH", hashFrag)
        if(!hashFrag) {
            window.location = auth_url
        }
        else {
            var m, params = []
            while (m = regex.exec(hashFrag)) {
                console.log("POWER OF M", m)
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
console.log("PARAME", params)
            // var cookieStr = 
        }
    }
    fetch("protected.html").then(function (response) {
        response.text().then(function (textHtml) {
            document.getElementById("content").innerHTML = textHtml
            modifyScript(document.getElementsByTagName("body")[0])
        })
    })
}

function getToken() {
    var auth_clientId = "2fior6770hvto4u6kuq084j7fu"
    var redirUrl = "https://bbekstha.github.io"
    
    var auth_url = `https://cognito-dev.calpoly.edu/login?` + 
        `response_type=token&client_id=${auth_clientId}&redirect_uri=${redirUrl}`
  
  var xhr = new XMLHttpRequest();
  
  xhr.open('GET', auth_url);
  // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.addEventListener('load', function() {
    var responseObject = JSON.parse(this.response);
    console.log(responseObject);
    if (responseObject.token) {
      console.log("RTOKEN", responseObject.token);
    } else {
      console.log("No token received");
    }
  });

  xhr.send();
}

function setCookie(respHeader) {
    console.log("Header", respHeader)
}

function getCookie(ckName) {
   var name = ckName + "=";
   fetch(document.cookie).then(function(response) {
      response.text().then(function(textCookie) {
         var cookieValArr = textCookie.split(';');
         for(var i in cookieValArr) {
            if(i.indexOf(name) === 0)
               return i.substring(name.length);
         }
      })
   })
}

function modifyScript(startNode) {
console.log("REPLACING SCRIPT")
    if (startNode.tagName === 'SCRIPT' ) {
        startNode.parentNode.replaceChild(createScript(startNode), startNode);
    }
    else {
        var i = 0;
        var children = startNode.childNodes;
        while ( i < children.length ) {
	        modifyScript(children[i++]);
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