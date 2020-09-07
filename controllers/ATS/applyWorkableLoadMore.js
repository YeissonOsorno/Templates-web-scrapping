/* 
* Template Apply Workable when exists Load More
*/

/* Infinite Pagination */
(function() {
    var out = {};
    if(document.querySelector('small[class="careers-search-styles__totaljobs--1qZQx"]')){
      var html_jobs = document.querySelectorAll('div.careers-jobs-list-styles__jobsList--3_v12 > ul > li[data-ui="job-opening"]');
      var total_jobs = document.querySelector('small[class="careers-search-styles__totaljobs--1qZQx"]').textContent.split(' ')[0]
      msg("===>" + html_jobs.length)
      msg("===>" + total_jobs)
      if(html_jobs.length == total_jobs){
        out["has_next_page"] = false
      }else{
        document.querySelector('button[data-ui="load-more-button"]').click();
        out["has_next_page"] = true
      }
    }else{
      out["has_next_page"] = true
    }
    out.waitFor = 'ul.postingsList:last-child';
    return out;
  })();
  
  
  

// Expected Jobs

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

//Extract
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
      job.location = elem.querySelector('span[data-ui="job-location"]').textContent.trim().replace('United States','US');
      //job.source_jobtype = elem.querySelector('span[data-ui="job-type"]').textContent.trim();
      var dateposted= elem.querySelector('small[class="careers-jobs-list-styles__date--1CDxx"]').textContent.trim();
      job.dateposted_raw =dateAgo (dateposted, ' ', 1, 2)
  
      let jobtype = elem.querySelector('span[data-ui="job-type"]');
      if(jobtype) job.source_jobtype = elem.querySelector('span[data-ui="job-type"]').textContent.trim();
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

  // Description
  