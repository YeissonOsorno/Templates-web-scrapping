/**
 * Dentro del before extract
 */
(function(){
    var out = {};
    var selector_jobs = 'table[rules="all"]>tbody>tr:not(:last-child)';
    var selector_desc = '#ctl00ContentPlaceHolder1JobBoardDetail1WebPanel2_content';
    var selector_click_job = `a[href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$JobListItem1$WebPanel1$GridView1','Page$`;

    if(typeof pass_it == 'undefined')
        pass_it = {};
    if(!pass_it['cont']){
        out['pass_it'] = {
            "cont": 1,
            "salir": false,
            "selector_job":selector_jobs,
            "selector_click_job" :selector_click_job,
            "selector_desc" : selector_desc
        };
    }else{
        out['pass_it'] = pass_it;
    }
    msg(document.querySelectorAll(out['pass_it']['selector_job']).length);
    var elemento = out['pass_it']['selector_job'];
    var elem = document.querySelectorAll(elemento)[out['pass_it']['cont']];
    if(elem){

        var title ;
        for (const a of elem.querySelectorAll('table.style1>tbody>tr')) {
            if (a.textContent.search('Position:')>-1){
               title =  a.textContent.trim();
            } 
          }
        //var url =  elem.querySelector().href.trim();
        //var location =  elem.querySelector('.job-item-location').textContent.trim();
        //var fecha =  elem.querySelector().textContent.trim().split('/');

        out['pass_it']['title'] = title;
        //out['pass_it']['location'] = location;

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