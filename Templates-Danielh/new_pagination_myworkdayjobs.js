

(function() {
    var out = {};
    
  if(typeof pass_it == "undefined") pass_it = {};
  if(typeof msg == "undefined") msg = function(x){return x;};

    if (!pass_it["cont"]) {
        out["pass_it"] = {
      "cont": 50,
      "jobs": 0
    };
  } else {
    out["pass_it"] = pass_it;
  }

             var meineJSON = getDescription();   // se registra el JSON en una variable
             var meineObj  = JSON.parse(meineJSON); // Se parsea el JSON 
                // meineObj  = meineObj;              // Se ontiene el valor que se desea del mismo
  
  
       var expected = meineObj.body.children[0].facetContainer.paginationCount.value;

      var lastPageNumber = expected;
      lastPageNumber = Number(lastPageNumber);
      lastPageNumber = lastPageNumber/50;
      lastPageNumber = lastPageNumber.toFixed(0);
      lastPageNumber = lastPageNumber * 50;

       var dom             = window.location.protocol + "//" + window.location.hostname; 
       var pagConstant     = window.location.pathname.split("be/").shift() + "be/"; 
       var clientRequestID = window.location.href.split("clientRequestID=").pop().trim();
      
       var url = dom + pagConstant  + out["pass_it"].cont + "?clientRequestID=" + clientRequestID;

  
  msg(lastPageNumber);
  // msg("be/" + lastPageNumber);
  
  
    if (out["pass_it"]["jobs"] > 0 && url.indexOf("be/" + lastPageNumber)==-1) {
     
     
    out["pass_it"].cont += 50;
    window.location.href = url;
    out["has_next_page"] = true;
  } else {
        out["has_next_page"] = false;
  }
    return out;
})();

function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", window.location.origin + window.location.pathname.split("/fs").shift().trim() + "/fs/searchPagination/318c8bb6f553100021d223d9780d30be/0", false); //URL del ajax que trae la información del job

  var response = "";
  xhrrequest.onreadystatechange = function () {
    if (xhrrequest.readyState == 4 && xhrrequest.status == 200) {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };

  xhrrequest.send();
  return response;
}