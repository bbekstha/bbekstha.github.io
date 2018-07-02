var stockBtn = document.getElementById("to_stock");
var repoBtn = document.getElementById("to_repo");
var protectedBtn = document.getElementById("to_protected");
var hashFrag = window.location.hash.substring(1)

window.onload = function(){
console.log("HASH FRAG", hashFrag)
    if(hashFrag){
        
        // window.location = "https://bbekstha.github.io"
        var id_tokenVal = hashFrag.substring("id_token=".length, hashFrag.indexOf("&"))
        var exprIndex = hashFrag.indexOf("expires_in") + "expires_in=".length
        var exprVal = hashFrag.substring(exprIndex, hashFrag.indexOf("&", exprIndex))
        var d = new Date();
        d.setTime(d.getTime() + exprVal*1000);
        var expires = "expires="+ d.toString();
// console.log("EXPIRES IN", expires)
        document.cookie = "id_token" + "=" + id_tokenVal + ";" + expires + ";path=/";

console.log("EXPIRES IN", document.cookie)
        // setCookie("", id_tokenVal, exprVal)
    }
}

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
    var id_token = getCookie("id_token")

    if(!id_token) {
        var auth_url = `https://cognito-dev.calpoly.edu/login?` + 
        `response_type=token&client_id=${auth_clientId}&redirect_uri=${redirUrl}`
        
        if(!hashFrag) {
            window.location = auth_url
        }
    }
    else  {
        fetch("protected.html").then(function (response) {
            response.text().then(function (textHtml) {
                document.getElementById("content").innerHTML = textHtml
                modifyScript(document.getElementsByTagName("body")[0])
            })
        })
    }
}

function setCookie(cname, cvalue, exsec) {
console.log("SETTING COOKIE")
    var d = new Date();
    d.setTime(d.getTime() + exsec*1000);
    var expires = "expires="+ d.toString();
console.log("EXPIRES IN", expires)
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

function modifyScript(startNode) {
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