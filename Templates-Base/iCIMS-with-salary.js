/*Before Extract*/
(function() {
  var out = {};
    out.iframeSelector = "iframe#icims_content_iframe"
    out.iframeWaitFor = "div.container-fluid.iCIMS_JobsTable> div.row"
    return out;
})();

/*Extract */

(function() {
  var out = {};
  if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = function (x) { return x; };
  if (!pass_it["cont"]) {
    out["pass_it"] = {
      "cont": 1,
    };
  } else {
    out["pass_it"] = pass_it;
  }
  var iframe_selector = "#icims_content_iframe";
  var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  var html_jobs = iframeDocument.querySelectorAll("div.container-fluid.iCIMS_JobsTable> div.row");
  var jobs = [];

  for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector("a > span:nth-child(2)").textContent.trim().replace(/[0-9]/g,'').trim();  
    job.url = elem.querySelector("a").href.trim()+"&mode=job&iis=Neuvoo";
    job.location = elem.querySelector("div.col-xs-6.header.left span:nth-child(2)").textContent.trim().split('|')[0];
    job.location = job.location.split("-").reverse().join(", "); 
    var dateposted =  elem.querySelector('div[class="col-xs-6 header right"] span[title*="/"]').textContent.trim();
    job.dateposted_raw = dateAgo(dateposted, ' ', 1, 2);
    var selectorSalaryMin = 'div.iCIMS_JobHeaderGroup >dl[role="listitem"]:nth-child(3)';
    var selectorSalaryMax = 'div.iCIMS_JobHeaderGroup >dl[role="listitem"]:nth-child(4)'
    if(elem.querySelector(selectorSalaryMin) && elem.querySelector(selectorSalaryMax))
    {
      var minSalary = elem.querySelector(selectorSalaryMin).textContent.trim().replace('\n',' ').trim();
      var maxSalary = elem.querySelector(selectorSalaryMax).textContent.trim().replace('\n',' ').trim();
      job.source_salary = `${minSalary} - ${maxSalary}`;
    }else if(elem.querySelector(selectorSalaryMin)){
      var minSalary = elem.querySelector(selectorSalaryMin).textContent.trim().replace('\n',' ').trim();
       job.source_salary = `${minSalary}`;
    }
    
    //job.source_jobtype = elem.querySelector('div[class="iCIMS_JobHeaderGroup"] >dl[role="listitem"]:last-child dd span').textContent.trim();

    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    // job.source_jobtype = elem.querySelector("div.iCIMS_JobHeaderGroup dl:nth-child(3)").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 2;
    jobs.push(job);
  }

  //out.wait=2000;
  out["jobs"]= jobs;
  return out;
})();
function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
  var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10){dd ='0'+dd;}
  if (mm<10){mm ='0'+ mm;}
  dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}

/*Pagination */ 

(function() {
    var out = {};
    out.wait = 2000;
    if (typeof pass_it == "undefined") pass_it = {};
  if (typeof msg == "undefined") msg = function (x) { return x; };

  if (!pass_it["cont"]) {
      out["pass_it"] = {
          "cont": 1,
      };
  } else {
      out["pass_it"] = pass_it;
  }

    var iframe_selector = "#icims_content_iframe";
    var iframeDocument = document.querySelector(iframe_selector).contentWindow.document;
  var textPaginador = iframeDocument.querySelector(".pull-left > h2.iCIMS_SubHeader.iCIMS_SubHeader_Jobs").textContent.trim();

var max = textPaginador.split(" of ").pop();
var min = textPaginador.split(" of ").shift().split("Page ").pop();

if (parseInt(min, 10) < parseInt(max, 10)) {/*elem-exist*/
        msg(min + " - " + max);
      var nuevaUrl = "https://external-fortbendcountytx.icims.com/jobs/search?pr=" + out["pass_it"].cont + "&schemaId=&o=";
      out["pass_it"].cont++;
      window.location.href = nuevaUrl;
        out["has_next_page"] = true;
} else {
  //try again
  out["has_next_page"] = false;
}



    out["wait"] = true;
    return out;
})();
/*Before Job description*/
(function() {
  var out = {};
    out.iframeSelector = "#icims_iframe_span > iframe";   
    out.iframeWaitFor = "div.iCIMS_JobContent";
    return out;
})();
  

/* Description */
 