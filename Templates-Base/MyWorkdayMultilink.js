/* Infinite Pagination */
(function() {
	var out = {};
  
	if (typeof pass_it == "undefined") 
      pass_it = {};

  	if (!pass_it["cont"]) {
    	out["pass_it"] = {
      		"cont": 0,
			"total":0,
			"long":0,
          "urls":["https://snhu.wd5.myworkdayjobs.com/External_Career_Site/fs/searchPagination/318c8bb6f553100021d223d9780d30be/",
            "https://snhu.wd5.myworkdayjobs.com/Online_Adjunct_Faculty/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" ],   //ACA LAS URLS DEL MULTILINK
          "url":''
    	};
  	} else {
    	out["pass_it"] = pass_it;
    }
  	
  		out["pass_it"]["url"]= out["pass_it"]["urls"].shift(); //SE OBTIENE LA 1ERA URL
  		
  
    return out;
})();

/* Extract */
(function() {
    var jobs = [];
    var out = {};
  
    out["pass_it"] = pass_it;
  
    var counter = 1;
    var limit = 0;
    var json;
  
  
    $.ajax({
      url : out["pass_it"]["url"] + out["pass_it"]['cont'], 
      headers: {
        "Content-Type": "application/json,application/xml"
      },
      type : 'GET',
      //data : JSON.stringify(data),
      dataType: "json",
      async : false,
      success : function(result){
        json = result.body.children[0].children[0].listItems;
        //out["pass_it"]["total"] = result;
  
        out["pass_it"]["long"] = result.body.children[0].children[0].listItems.length;
        msg(out["pass_it"]["long"]);
        //msg(out["pass_it"].total);
        //limit = result.pages +1;
        for(var i = 0; i<json.length; i++) {
          var job = {};
          job.title = json[i].title.instances[0].text;; 
          job.url = window.location.protocol + "//" + window.location.hostname + json[i].title.commandLink;
          job.location = json[i].subtitles[1].instances[0].text.split("(")[0].split("-").reverse().join(", ").replace(/VIRTUAL/gi,'').split(", More")[0];
          if(job.location ==="Remote") job.location ="Manchester, NH";
          if(json[i].subtitles[2]){
            var dateposted = json[i].subtitles[2].instances[0].text
            job.dateposted_raw = dateAgo(dateposted, ' ', 1, 2) ;
          }
          //job.logo = elem.querySelector("").getAttribute("src").trim();
          //job.source_apply_email = elem.querySelector("").textContent.trim();
          //var fecha = json[i].PostedDate.split('T')[0];
          // job.dateposted_raw = fecha.split('-')[1]+'/'+fecha.split('-')[2]+'/'+fecha.split('-')[0];
          //job.source_empname = elem.querySelector("").textContent.trim();
          //job.source_jobtype = elem.querySelector("").textContent.trim();
          //job.source_salary = elem.querySelector("").textContent.trim();
          //job.temp = 1;
          jobs.push(job);
        }
        counter = counter + 1;
      },
      error: function(error){
        msg(error);
      }
    });
  
  
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
  (function () {
    var out = {};
    out.wait=true;
  
    out["pass_it"] = pass_it; //SE PASAN LOS VALORES ASIGNADOS EN EL INFINITE PAGINATION
  
    out["pass_it"].cont= out["pass_it"].cont + 50; 			//SE INCREMENTA EN 50 PARA EXTRAER LOS SIGUIENTES JOBS
    msg(out["pass_it"].total);
    if ( out["pass_it"].long >= 50){ 
      // if ( out["pass_it"].cont < out["pass_it"].total){   	//SE COMPARA JOBS EXTRAIDOS CON TOTAL DE JOBS
      out["has_next_page"] = true; 						//CONTINUA EXTRAYENDO
    } else {
      out["has_next_page"] = false;       				//FIN DE EXTRACCION
    }
  
    if (!out["has_next_page"]){      						//SI TERMINA LA PAGINACION POR PAGINA 
  
      if (out["pass_it"]["urls"].length > 0) {
        out["pass_it"]['url'] = out["pass_it"]['urls'].shift();  //PROXIMA URL
        msg('\x1b[42m CAMBIO DE URL \x1b[0m');
        out["pass_it"].cont = 0							//RESETEO CONTADOR 
        out["has_next_page"] = true;
      } else {
        msg('\x1b[41m FIN MULTILINK \x1b[0m');
        out["has_next_page"] = false;
      }
    }
    return out;
  })();
  /* Description */

(function() {
    var out = {};
    var job = {};
    var selector = "div[id^='richTextArea.jobPosting.jobDescription']";
    var remove_selector = "";
    //var job = pass_it["job"];
    if(document.querySelector('div#mainContent section #promptOption-gwt-uid-13').textContent.trim()){
      job.source_jobtype = document.querySelector('#promptOption-gwt-uid-13').textContent.trim()
    }
  
    var full_html = document.querySelector(selector);
    // remove something from the jobdatata
    if (remove_selector != "") full_html.querySelector(remove_selector).remove();
    if (typeof cleanHTML == "undefined") cleanHTML = function(x) { return x };
    if (typeof msg == "undefined") msg = function(x) { return x };
  
    // job.location = document.querySelector("div.GWTCKEditor-Disabled:nth-child(2) > p:nth-child(1)").nextSibling.textContent.trim();
  
    job.html = full_html.innerHTML.trim();
    job.jobdesc = full_html.textContent.trim();
  
    if (job.html.indexOf("A background check") != -1) {
      job.html = removeTextAfter(job.html, "A background check", true);
    }
    job.html = removeTextBefore(job.html, "Description", false);
    job.html = removeTextAfter(job.html, "Posted", true);
    
    var palabra_corte_inicial = 'experience ';
      var palabra_corte_final = ' years';
      for(const a of full_html.querySelectorAll('li')){
          const text = a.textContent.trim();
        if (/experience /i.test(text) && /[0-9]/g.test(text) && / years/.test(text)) {
          job.experience_required = text.split(/of/i).pop().split(/ years/).shift().trim();
          if (true) {
            job.experience_required = palabra_corte_inicial + job.experience_required + palabra_corte_final ;
            msg('experience_required agregado')
          }       
        }
      }
    /*
   if(job.html.indexOf("Location") != -1){
            job.html = removeTextAfter(job.html, "Location", true);
          }
  
  
    if(job.html.indexOf("Job Description:") >-1){
              job.html = removeTextBefore(job.html, "Job Description:", false); 
          }
  
      */
    job.html = job.html.replace('-input--uid6-input-formLabel">','');
    job.html = cleanHTML(job.html);
    job.jobdesc = cleanHTML(job.jobdesc);
    job.jobdesc =job.html;
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
  