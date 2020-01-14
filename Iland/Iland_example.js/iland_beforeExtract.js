/**
 * Dentro del before extract
 */
(function(){
    var out = {};
    var selector_jobs = 'div.job-item';
    var selector_desc = '.job-description';
    //var selector_click_job = '';

    if(typeof pass_it == 'undefined')
        pass_it = {};
    if(!pass_it['cont']){
        out['pass_it'] = {
            "cont": 1,
            "salir": false,
            "selector_job":selector_jobs,
            //"selector_click_job" :selector_click_job,
            "selector_desc" : selector_desc
        };
    }else{
        out['pass_it'] = pass_it;
    }
    msg(document.querySelector(out['pass_it']['selector_job']).length);
    var elemento = out['pass_it']['selector_job'];
    var elem = document.querySelectorAll(elemento)[out['pass_it']['cont']];
    if(elem){

        var title =  elem.querySelector('.job-item-job-title').textContent.trim();
        //var url =  elem.querySelector().href.trim();
        var location =  elem.querySelector('.job-item-location').textContent.trim();
        //var fecha =  elem.querySelector().textContent.trim().split('/');



        out['pass_it']['title'] = title;
        out['pass_it']['location'] = location;


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