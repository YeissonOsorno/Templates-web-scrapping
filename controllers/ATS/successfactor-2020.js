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
/* Extract */
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
      
      let city = elem.querySelector('td>div:last-child>div:last-child>span:nth-child(3)').textContent.trim();
      let state = elem.querySelector('td>div:last-child>div:last-child>span:nth-child(2)').textContent.trim();
      job.location = fixedLocation(city,state);
      var dateposted = elem.querySelector("div.noteSection > div:nth-child(1) > span:nth-child(2)").textContent.trim().split("el").pop().trim();
      job.dateposted_raw = dateposted.split('on').pop().trim()
      /*var separador = '/';
      var ano = job.dateposted_raw.split(separador)[2];
      var mes = job.dateposted_raw.split(separador)[1];
      var dia = job.dateposted_raw.split(separador)[0];*/
  
     
      //job.logo = elem.querySelector("").getAttribute("src").trim();
      //job.source_apply_email = elem.querySelector("").textContent.trim();
      //job.source_empname = elem.querySelector("").textContent.trim();
      job.source_jobtype =  elem.querySelector('td>div:last-child>div:last-child>span:nth-child(1)').textContent.trim();
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
  function fixedLocation(city,state){
  
      var city    = city;
      var state    = state;
  
      let loc = "";
      let array_loc = Array();
  
      if(city) {
          city = city.toLowerCase().replace(/\b[a-z]/g, (letter)=> letter.toUpperCase());
          array_loc.push(city);
      }
      if(state) {
          state = state.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
          array_loc.push(state);
      }        
  
      if(array_loc.length) loc = array_loc.join(", ");
  
      return loc;  
  }  
  