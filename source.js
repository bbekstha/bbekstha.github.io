var searchInput = document.querySelector("#searchSymbol");
var searchClicked = document.querySelector("#searchBtn");
var dispTbl = document.querySelector("table");

searchClicked.onclick = function() {
   var searchVal = searchInput.value;
console.log("button searchClicked")
   updateDisp(searchVal);
}


function updateDisp(searchVal){
   var url = `https://api.iextrading.com/1.0/stock/${searchVal}/company`;
console.log("MY URL", url);
   var request = new XMLHttpRequest();
   request.open('GET', url);
   request.responseType = 'json';

   request.onload = function() {
      var resp = request.response;
console.log("GOT", resp);

      var tblLen = dispTbl.rows.length;
      var respKeys = Object.keys(resp);
      for(var i = 0; i < respKeys.length; i++) {

         if(tblLen === 0) {
            var row = dispTbl.insertRow(i);

            row.insertCell(0).innerHTML = respKeys[i];
            row.insertCell(1).innerHTML = resp[respKeys[i]];
         } else if (tblLen === respKeys.length) {
            dispTbl.rows[i].cells[1].innerHTML = resp[respKeys[i]];
         }
      }
   };

   request.send();
}