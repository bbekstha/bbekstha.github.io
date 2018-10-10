
let client_id = "2fior6770hvto4u6kuq084j7fu";
let redirect_uri = "https://bbekstha.github.io/test";
let userpool_id = "us-west-2_LlodYgyQN";
let cognito_region = "us-west-2";

let code;

let lgnBtn = document.getElementById('loginBtn');
let dnamBtn = document.getElementById("dnamDB");

window.onload = function(){
   code = window.location.search
   console.log("CodeVal", code)
   if(code.indexOf('?code') >= 0) {
      let codeVal = code.substring(code.indexOf('?code') + '?code='.length)
      console.log("Code", codeVal)
      getTokens(codeVal).then(function(){
         console.log("token\n", window.localStorage.getItem('id_token'));
         let clean_uri = location.protocol + "//" + location.host + location.pathname;
         window.history.replaceState({}, document.title, clean_uri);
      })

   }
}

lgnBtn.onclick = function(){
   let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=code&` +
		`client_id=${client_id}&redirect_uri=${redirect_uri}`;
   window.location.href = loginUrl;
}

dnamBtn.onclick = function(){
   let id_token = window.localStorage.getItem('id_token')
   if(!id_token){
      window.alert("Not logged in");
      return
   }

   setAwsCredentials().then(function(){
      let id = AWS.config.credentials.identityId
      let dynamodb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
      let getParams = {
         TableName: 'summer_webdev_bshresth_users',
         ConsistentRead: true,
         Key: {
            'userid' : {S: id},
            'username' : {S: this.userName}
         },
         ProjectionExpression: 'userComment'
      }

      // return new Promise(function(resolve, reject){
      dynamodb.getItem(getParams, function(err, data) {
         if (err) {
            console.log("Error in getItem", err);
            // reject(err)
         } else {
            console.log("Success", data.Item);
            // resolve(data.Item)
         }
      })
      // })
   });
}

function setAwsCredentials() {
   let promise = new Promise((resolve, reject) => {
      let logins = {};
      logins['cognito-idp.' + cognito_region + '.amazonaws.com/' + userpool_id] = LocalStorage.get('userTokens.idToken');

      AWS.config.region = cognito_region;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
         IdentityPoolId: "us-west-2:2e58c36f-a443-401e-bf6a-23d9142041d7",
         Logins: logins
      });

      resolve();
   })
   return promise;
}

function getTokens(code) {
   return new Promise((resolve, reject) => {
      // let headers = {};
      let requestRedirectUri = redirect_uri;
      let hostedTknUri = 'https://cognito-dev.calpoly.edu/oauth2/token'

      // headers['Content-Type'] = 'application/x-www-form-urlencoded';
      let body = 'grant_type=authorization_code&' +
       'client_id=' + client_id + '&' +
       'redirect_uri=' + requestRedirectUri + '&' +
       'code=' + code;

      // let tmp = this;
      fetch(hostedTknUri, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         mode:'cors',
         body: body
      }).then(function(response) {
         console.log("HERE IN FETCH", JSON.stringify(response))
         window.localStorage.setItem("id_token", response.id_token)
         // window.localStorage.setItem("refreshToken", response.refresh_token)

         resolve()
      })
   });
}
