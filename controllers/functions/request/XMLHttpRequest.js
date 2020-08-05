/* Request to Description for extract job location*/
function getDescription(url) {
    var xhrrequest = new XMLHttpRequest();
    xhrrequest.open("GET", url, false);     
    var response = "";
    xhrrequest.onreadystatechange = function() {
      if(xhrrequest.readyState == 4 && xhrrequest.status == 200) response = xhrrequest.responseText;    
    };
    xhrrequest.send(); 
    return response;
  }