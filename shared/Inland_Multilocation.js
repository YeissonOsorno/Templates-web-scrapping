/**
 * Inside before extract
 */
(function(){
    var out = {};
    var selector_jobs = 'selector_-jobs';
    var selector_desc = 'selector_description';
    //var selector_click_job = 'selector_click_job';
  
    if(typeof pass_it == 'undefined')
      pass_it = {};
    if(!pass_it['cont']){
      out['pass_it'] = {
        "cont": 0,
        "salir": false,
        "selector_job":selector_jobs,
        //"selector_click_job" :selector_click_job,
        "selector_desc" : selector_desc
      };
    }else{
      out['pass_it'] = pass_it;
    }
    msg(document.querySelectorAll(out['pass_it']['selector_job']).length);
    var elemento = out['pass_it']['selector_job'];
    var elem = document.querySelectorAll(elemento)[out['pass_it']['cont']];
    if(elem){
  
      var title =  elem.querySelector('selector_title').textContent.trim();
      //var url =  window.location.href + "?utm_source=talent";      
      var location =  elem.querySelector('selector_location').innerText.trim();
      var jobtype =  elem.querySelector('selector_jobtype').textContent.trim();
  
      out['pass_it']['title'] = title;
     // out['pass_it']['url'] = url;
      out['pass_it']['location'] = location;
      out['pass_it']['jobtype'] = jobtype;
  
  
      if(typeof(selector_click_job)=='undefined'){
        elem.click();
        out.waitFor = out['pass_it']['selector_desc'];
      }else{
        elem.querySelector(selector_click_job).click();
        out.waitFor = out['pass_it']['selector_desc']
      }
    }else{
      msg('En el false de BEFORE');
      msg(elemento);
      msg(elem);
      out['pass_it']['salir'] = true;
    }
    return out;
  })();

  /* Inside Extract */
  (function(){
    var out = {};
    var jobs = [];
    out['pass_it']= pass_it;
    if(out['pass_it']['salir']){
      var job = {};
      job.title = 'Hola';
      jobs.push(job);
    }else{
      //msg(out['pass_it']['selector']);
      if(document.querySelector(out['pass_it']['selector_desc'])){
        var job = {};
        var remove_selectors = ['a','script','style'];
  
        job.title = out['pass_it']['title'];
        job.url = window.location.href;
        job.source_jobtype = out['pass_it']['jobtype'];
        job.location = out['pass_it']['location'];
  
        //job.fecha = out['pass_it']['fecha'];
  
        var full_html = document.querySelector(out['pass_it']['selector_desc']);
        //remove somethings from the jobdata
        if(remove_selectors.length > 0){
          remove_selectors.forEach(remove_selectors=>{
            let salir;
            do{
              salir = false;
              if(full_html.querySelector(remove_selectors)){
                full_html.querySelector(remove_selectors).remove();
                salir = true;
              }
            }while(salir);
          });
        }
  
        job.html = full_html.innerHTML.trim();
        job.jobdesc = full_html.textContent.trim();
  
        // job.html = removeTextBefore(job.html,'',false);
        // job.jobdesc = removeTextBefore(job.html,'',false);
  
        // job.html = removeTextBefore(job.html,'',false);
        // job.jobdesc = removeTextBefore(job.html,'',false);
  
        job.html = cleanHTML(job.html);
        job.jobdesc = cleanHTML(job.jobdesc);
  
        job.temp = 1;
        if(job.location.indexOf(',') > -1){
          let locs = job.location.split(',');
          msg(locs)
          for(let loc of locs){
            let jobx = {};
            jobx.title = job.title;
            jobx.url = job.url;
            jobx.location = loc;
            jobx.source_jobtype = job.source_jobtype;
            jobx.temp = job.temp;
            jobx.html = job.html;
            jobx.jobdesc = job.jobdesc;
            jobs.push(jobx);
          }
        }else{
          jobs.push(job);
        }
      }else{
        msg('Entro en el else')
      }
    }
    out['jobs'] = jobs;
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

  /* Inside Pagination */
  (function () {
    var out = {};
    out['pass_it'] = pass_it;
    out['pass_it'].cont += 1;
    //Formas de devolverse
    //window.location.href = ''; // por ubicacion
    //window.history.back(); // para devolverse con la fecha de atras
    
    if(document.querySelector('selector_close'))	
        document.querySelector('selector_close').click();
    
    if (out['pass_it']['salir'])
        out["has_next_page"] = false;
    else
        out["has_next_page"] = true;
    out.waitFor = out['pass_it']['selector_job'];
    //out['wait'] = true;
    return out;
})();

