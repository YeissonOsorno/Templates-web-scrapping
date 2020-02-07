(function() {
    var out = {};
 //var iframeDocument = document.querySelector('#').contentWindow.document;//Obtener el html del iframe apartir del selector.
     var html_jobs = document.querySelectorAll('');
      var jobs = [];
      for(var x in html_jobs){
        if(typeof html_jobs[x] =="function") continue;
        if(typeof html_jobs[x] =="number") continue;
        var job = {};
        var elem = html_jobs[x];
        job.title = elem.querySelector('').textContent.trim();
        //job.title = job.title.replace(/0|1|2|3|4|5|6|7|8|9/g, '').trim();
        job.url = elem.querySelector('').href.trim();
        if(elem.querySelector('')){
            job.location = elem.querySelector('').textContent.trim();
            //job.location = `${job.location}, PAÍS`;
        }else{
            job.location = 'NO LOCATION';
        }
            /*let auxDate = elem.querySelector('').textContent.trim();
            if(auxDate.search(/0|1|2|3|4|5|6|7|8|9|\/|-/g) > -1){
                job.dateposted_raw = auxDate;
                //job.dateposted_raw = job.dateposted_raw.split('/').reverse().join('-');
            }*/
     /*let auxJobType = elem.querySelector('').textContent.trim();
        if(auxJobType.search(/full time|part time|cda|ccd|cdi|time|permantent/i)>-1){
        job.source_jobtype = auxJobType;
        }*/
 
            /*let auxSalary = elem.querySelector('').textContent.trim();
            if(auxSalary.search(/\£|\¥|\€|\$|\¢/g) > -1){
                job.source_salary = auxSalary;
                //job.source_salary = job.source_salary.split(' PALABRA ').pop().trim();
            }*/
 
        /////////// Respuesta en HTML de la descripcion de cada job //////////////
        /*var full_html = getDescription(job.url); 
        var div = document.createElement("div"); 
        div.innerHTML = full_html;
 
            for(const a of div.querySelectorAll('')){
                    const text = a.textContent.trim();
                    if(text.search(/palabra/i) > -1){
                        //job.location = text.split(/palabra/).pop().split(/palabra/).shift().trim();
                        //job.location = job.location.replace(/palabra/, '').trim();
                        //job.location = `${job.location}, PAÍS`;
                    }
                }
                if(!job.location){
                    job.location = 'COMPANY LOCATION';
                }*/
        job.temp = '0000-0000-0-bs'//Cualquier duda consultar este código con brahian-stiben.
        jobs.push(job);
    }
 
    out["jobs"]= jobs;
    return out;
})();
 
/////// Funcion xhrrequest; abre las url de cada job ////////////
/*function getDescription(url) {
 
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
  }*/
    //job.dateposted_raw = elem.querySelector("").textContent.trim();
    //job.logo = elem.querySelector("").getAttribute("src").trim();
    //job.source_apply_email = elem.querySelector("").textContent.trim();
    //job.source_empname = elem.querySelector("").textContent.trim();
    //job.source_jobtype = elem.querySelector("").textContent.trim();
    //job.source_salary = elem.querySelector("").textContent.trim();