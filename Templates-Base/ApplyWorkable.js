/*Expected Jobs */
(function() {
	var out = {};
    var selector = 'small[class="careers-search-styles__totaljobs--1qZQx"]';
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.trim();
  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();

/*Extract*/
(function() {
  var out = {};
  var html_jobs = document.querySelectorAll('div.careers-jobs-list-styles__jobsList--3_v12 > ul > li[data-ui="job-opening"]');
  var jobs = [];for(var x in html_jobs){
    if(typeof html_jobs[x] =="function") continue;
    if(typeof html_jobs[x] =="number") continue;
    var job = {};
    var elem = html_jobs[x];
    job.title = elem.querySelector('h2[data-id="job-item"]').textContent.trim();
    job.url = elem.querySelector("a.careers-jobs-list-styles__link--3qpm9").href.trim();
    job.location = elem.querySelector('span[data-ui="job-location"]').textContent.trim();
    //job.source_jobtype = elem.querySelector('span[data-ui="job-type"]').textContent.trim();
   	var dateposted= elem.querySelector('small[class="careers-jobs-list-styles__date--1CDxx"]').textContent.trim();
    job.dateposted_raw =dateAgo (dateposted, ' ', 1, 2)
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();
    //job.dateclosed_raw = monthJob+"/"+dia+"/"+ano;

    job.temp = 2;
    jobs.push(job);
  } 

  out["jobs"]= jobs;
  return out;
})();
//Function convert ago to date
function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
  var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
  if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
  var date_Now = new Date();  //declaro un objeto tipo fecha
  var nDays = 0;
  if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YESTERDAY')>-1) {nDays = 1;}
  if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
  if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
  if (dayWeekMonthYear.toUpperCase().indexOf('MONTH')>-1){nDays = numberDWMY * 30;}
  if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
  var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
  var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
  var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
  //Obtengo dia mes y Año
  var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
  var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
  var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
  if (dd < 10){dd ='0'+dd;}
  if (mm<10){mm ='0'+ mm;}
  dateJob= mm +'/'+dd+'/'+yyyy;
  return dateJob;
}
/*Description*/
(function() {
  var out = {};
  var job = {};
  var selector = "div.job-preview-styles__preview--2d3Fz";
  var remove_selectors = [];
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  job.html = removeTextBefore(job.html, 'Description', false);
  job.html = removeTextAfter(job.html, 'Apply for this job', true);
  /*for(const a of full_html.querySelectorAll('li')){
            const text = a.textContent.trim();
            if(text.search(/Starting wage of/i) > -1){
                    let auxSalary = text.split(/palabra/i).pop().trim();
                if(auxSalary.search(/\£|\¥|\€|\$|\¢/g) > -1){
                    job.source_salary = auxSalary.split('Starting wage of').pop().trim()
                    //job.source_salary = job.source_salary.split(' PALABRA ').pop().trim();
                    a.remove();//remueve el selector si coincide con la palabra clave.
                }
            }
        }*/
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