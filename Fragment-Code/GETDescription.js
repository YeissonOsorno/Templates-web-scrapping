function getDescription(url) {
  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job
  xhrrequest.setRequestHeader(
    "accept",
    "application/json, text/javascript, */*; q=0.01"
  );
  xhrrequest.setRequestHeader("accept-language", "es-419,es;q=0.9,en;q=0.8");
  xhrrequest.setRequestHeader(
    "content-type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );

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
