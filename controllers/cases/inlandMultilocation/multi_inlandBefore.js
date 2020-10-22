/**
 * Dentro del before extract
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