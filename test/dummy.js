let lgnBtn = document.getElementById("loginBtn");
let dnamBtn = document.getElementById("dnamDB");

let client_id = "2fior6770hvto4u6kuq084j7fu";
let redirect_uri = "https://bbskestha.github.io/test";
let code;

lgnBtn.onclick = function(){
   let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=code&` +
		`client_id=${client_id}&redirect_uri=${redirect_uri}`;

   window.location.href = loginUrl;
}

window.onload = function(){
   code = window.location.search
   if(code.indexOf('?code')) {
      let codeVal = code.substring(code.indexOf('?code') + '?code='.length + 1)
      console.log("Code", codeVal)
      getTokens(codeVal);
      let clean_uri = location.protocol + "//" + location.host + location.pathname;
      window.history.replaceState({}, document.title, clean_uri);
   }
}

function getTokens(code) {
   return new Promise((resolve, reject) => {
      let headers = {};
      let requestRedirectUri = redirect_uri;
      let hostedTknUri = 'https://cognito-dev.calpoly.edu/oauth2/token'

      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      let body = 'grant_type=authorization_code&' +
       'client_id=' + client_id + '&' +
       'redirect_uri=' + requestRedirectUri + '&' +
       'code=' + code;

      // let tmp = this;
      fetch(url, {
         method: 'POST',
         headers,
         mode:'cors',
         body: body
      }).then(function(response) {
         window.localStorage.setItem("id_token", data.id_token)
         window.localStorage.setItem("refreshToken", data.refresh_token)

         resolve()
      })
   });
}
