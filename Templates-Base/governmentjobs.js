/*Infinite Pagination wait for expected jobs */
(function() {
	var out = {};
   var selector = "span#job-postings-number";
  	out.waitFor = selector
    return out;
})();

/* Expected jobs */
(function() {
	var out = {};
    var selector = "span#job-postings-number";
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.trim();
  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();
/* Before extract */
(function() {
	var out = {};
  	out.waitFor = "ul.job-listing-container > li"
    return out;
})();

/* Extract with location and other data exists in description */
(function() {
  var out = {};
  var html_jobs = document.querySelectorAll("ul.job-listing-container > li");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    var headquarter = "Bakersfield, CA ";
    job.title = elem.querySelector("h3 a").textContent.trim().replace(/[0-9]/g,'').trim();   
    job.url = elem.querySelector("h3 a").href.trim();
    var dateposted = elem.querySelector('div.list-published span.list-entry-starts').textContent.trim().replace('more than ','').trim();
    job.datepoted_raw = dateAgo(dateposted, ' ', 1, 2);

    /*Request to description*/
    var container = document.createElement('html')
    container.innerHTML = getDescription(job.url);
    var selector_location = 'div[class="term-container"] div[class="row-fluid summary-section"]:nth-child(1) > div:last-child div.span8';
    var location = container.querySelector(selector_location).textContent.trim().replace(/[0-9]/g,'').trim()
    job.location = location.split(':').pop().trim().replace('/','').trim();
    if(job.location == "MLK, TX")
    {
     	job.location = "Georgetown, TX"; 
    }
    job.source_jobtype = container.querySelector("div.term-container div.row-fluid:nth-child(2)  div.span4:first-child +div").textContent.trim().split(':').shift().trim();
    job.source_salary = container.querySelector("div#salary-label-id +div").textContent.trim()    

    job.temp = 2;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();
function getDescription(url) {

  var xhrrequest = new XMLHttpRequest();
  xhrrequest.open("GET", url, false); //URL del ajax que trae la información del job

  var response = "";
  xhrrequest.onreadystatechange = function() {
    if(xhrrequest.readyState == 4 && xhrrequest.status == 200) 
    {
      //console.log(xhrrequest.responseText);
      response = xhrrequest.responseText;
    }
  };

  xhrrequest.send(); 
  return response;
}
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
/* Pagination */
(function() {
    var out = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 2           
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var next_page_selector = 'ul.pagination a[aria-label="Go to Page '+out["pass_it"].cont+'"]'; // Selector del next  
    var clickable_elem = document.querySelector(next_page_selector);
  
    if (clickable_elem) {
      out["pass_it"].cont++;
      clickable_elem.click();
      out["has_next_page"] = true;
    } else {      
      out["has_next_page"] = false;
    }
  
    out.waitFor = "ul.job-listing-container > li";
    return out;
  })();
  /* Description */ 
  (function() {
  var out = {};
  var job = {};
  var selector = "div#details-info";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  //job.html = removeTextAfter(job.html, 'Application Instructions', true);
  job.html = removeTextAfter(job.html, 'SUPPLEMENTAL INFORMATION', true);
  job.html = removeTextAfter(job.html, 'TOBACCO FREE WORKPLACE POLICY', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
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