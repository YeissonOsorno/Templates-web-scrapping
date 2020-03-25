/*Infinite pagination for wait expected jobs*/
(function() {
	var out = {};
  var selector = "span.jobCount";
  	out.waitFor = selector
    return out;
})();

/*Expected jobs*/
(function() {
	var out = {};
    var selector = "span.jobCount";
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.trim();
  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();

/*Extract */ 
(function() {
  var out = {};
  out.pic = true;
  var html_jobs = document.querySelectorAll("tr.jobResultItem");
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    var jobid = elem.querySelector("a.jobTitle").href.trim();
    jobid= jobid.split("&selected_lang=");
    jobid= jobid[0].split("&career_job_req_id=");
    job.title = elem.querySelector("a.jobTitle").textContent.trim().split("&selected_lang=").shift().replace(/\(.+\)/gm,'');
    job.title = job.title.replace('2nd','').replace('1st','').replace(/[0-9]/g,'').trim();
    job.url= window.location.href.split("career?")[0]+"career?career_ns=job_listing&career_company="+window.location.href.split("company=").pop().split("&")[0] + "&career_job_req_id="+jobid[1];
    job.location = elem.querySelector('div span:nth-child(3)').textContent.trim();
	var dateposted = elem.querySelector("div.noteSection > div:nth-child(1) > span:nth-child(2)").textContent.trim().split("el").pop().trim();
    job.dateposted_raw = dateposted.split('on').pop().trim()
    /*var separador = '/';
    var ano = job.dateposted_raw.split(separador)[2];
    var mes = job.dateposted_raw.split(separador)[1];
    var dia = job.dateposted_raw.split(separador)[0];*/

   
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("div:nth-child(2) > span:nth-child(2)").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    job.temp = 2;
    jobs.push(job);
  } 

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
  /* Pagination */
  (function() {
  var out = {};
  //out["pic"] = true;
  var next_page_selector = "td.resultsHeaderPaginator li.next > a"; //selector to identify the next button
  //var last_page_selector = "td.resultsHeaderPaginator li.last_disabled"; //selector to identify the last page
  var clickable_elem = document.querySelector(next_page_selector);

  //stop condition
  if(clickable_elem){
    //go to next page
    clickable_elem.click();
    out["has_next_page"] = true;
  } else {
    //try again
    out["has_next_page"] = false;
  }

  out["wait"] = true;
  return out;
})();
/*Pagination */
(function() {
  var out = {};
  var job = {};
  var selector = "div.joqReqDescription";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  //job.html = removeTextBefore(job.html, 'Summary of Job Duties', false);
  job.html = removeTextAfter(job.html, 'To apply,', true);
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