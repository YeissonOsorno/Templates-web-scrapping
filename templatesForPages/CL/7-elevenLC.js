/* Extract por post */
/* Extract */
(function () {
  var jobs = [];
  var out = {};
  var cont = 0;
  var json;
  var seguir = true;
  var limit;
  do {
    if (typeof msg == "undefined") msg = console.log;

    var data = 'pr=' + cont + '&in_iframe=1&schemaId=&o=';

    $.ajax({
      url: window.location.origin+'/jobs/search?pr=' + cont + '&in_iframe=1&schemaId=&o=',                                            // 1) url
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "content-type": "text/html;charset=UTF-8"    // 2) headers
      },
      type: 'GET',                                        // 3) tipo
      dataType: "html",                                   // 4) data que retorna
      data: data,
      //data: JSON.stringify(data),
      async: false,
      success: function (result) {
        var html = document.createElement("div");
        html.innerHTML = result;
        var html_jobs = html.querySelectorAll(".container-fluid.iCIMS_JobsTable .row");
        limit = html.querySelector('div.container-fluid.iCIMS_SearchResultsHeader > div > div.pull-left > h2').innerText.split('of').pop();// 5) ruta de los trabajos
        msg('\x1b[45m' + html.querySelector('div.container-fluid.iCIMS_SearchResultsHeader > div > div.pull-left > h2').innerText)
        for (var x in html_jobs) {
          if (typeof html_jobs[x] == "function") continue;
          if (typeof html_jobs[x] == "number") continue;
          var elem = html_jobs[x];

          var loc = elem.querySelector("div.col-xs-6.header.left span:nth-child(2)").textContent.trim().split("|");
          loc.forEach(function (element) {
            var job = {};
            if(elem.querySelector("a > span:nth-child(2)")){
              job.title = elem.querySelector("a > span:nth-child(2)").textContent.trim();
              job.url = elem.querySelector("a").href.trim() + "&mode=job&iis=Neuvoo";
              job.location = element.trim();
              job.location = job.location.split('-').reverse().join().replace(/,/gi, ', ').trim();
              if (job.location.indexOf('Virtual Office') > -1) { job.location = job.location.replace('Virtual Office', 'Bloomington, Minnesota'); }
              /*var fecha = elem.querySelector("").textContent.trim().split("/");
                      job.dateposted_raw = fecha[1]+'/'+fecha[0]+'/'+fecha[2];*/
              //  job.dateposted_raw = dateAgo(elem.querySelector("div.col-xs-6.header.right > span:nth-child(2)").textContent.split("(").shift().trim(), " ", 0, 1)
              //job.logo = elem.querySelector("").getAttribute("src").trim();
              //job.source_apply_email = elem.querySelector("").textContent.trim();
              //job.source_empname = elem.querySelector("").textContent.trim();
              //job.source_jobtype = elem.querySelector("").textContent.trim();
              //job.source_salary = elem.querySelector("").textContent.trim();
              job.temp = 1;
              jobs.push(job);
            }
          }, elem);
        }
        cont++;
      },
      error: function (error) {
        msg(error);
      }
    });
  } while (cont < limit);

  out["jobs"] = jobs;
  return out;
})();
function dateAgo(text, char_separator, value_DWMY, position_DWMY) {
  var numberDWMY = parseInt(text.trim().split(char_separator)[value_DWMY], 10); //obtengo el valor numerico del dia, sem, mes o año
  if (typeof text.split(char_separator)[position_DWMY] !== 'undefined') {
    var Day_Week_Month_Year = text.split(char_separator)[position_DWMY]
    } else { var Day_Week_Month_Year = text.split(char_separator)[text.split(char_separator).length - 1] };
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (Day_Week_Month_Year.toUpperCase().indexOf('TODAY') > -1 || Day_Week_Month_Year.toUpperCase().indexOf('HOUR') > -1) { nDays = 0; }
  if (Day_Week_Month_Year.toUpperCase().indexOf('YESTERDAY') > -1) { nDays = 1; }
  if (Day_Week_Month_Year.toUpperCase().indexOf('DAYS') > -1) { nDays = numberDWMY; }
  if (Day_Week_Month_Year.toUpperCase().indexOf('WEEK') > -1) { nDays = numberDWMY * 7; }
  if (Day_Week_Month_Year.toUpperCase().indexOf('MONTH') > -1) { nDays = numberDWMY * 30; }
  if (Day_Week_Month_Year.toUpperCase().indexOf('YEAR') > -1) { nDays = numberDWMY * 365; }
  var dateJob = date_Now.getDate() - nDays; //resto dias de publicacion a la fecha actual
  var get_date = date_Now.setDate(dateJob); //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);  //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var day = datePosted.getDate(); //devuelve el numero del dia del mes.
  var month = datePosted.getMonth() + 1; //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var year = datePosted.getFullYear().toString(); //devuelve el año.
  if (day < 10) { day = '0' + day.toString().trim(); } else { day = day.toString().trim(); }
  /*Obtengo mes*/
  if (month < 10) { month = '0' + month.toString(); } else { month = month.toString(); }
  dateJob = month + '/' + day + '/' + year;
  return dateJob;
}

/* Description */
(function() {
  var out = {};
  var job = {};
  var iframe_selector = "iframe#icims_content_iframe";   
  var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  
  var selector = "div.iCIMS_JobContent";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = iframeDocument.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  job.html = removeTextBefore(job.html,'Overview',true);
  job.html = removeTextAfter(job.html,'Options', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
  
  if(job.jobdesc.lenght < 100){
  job.flag_active = 0  
  }
  out["job"] = job;
  return out;

})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }       
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }       
  }
  return newHtml;
}