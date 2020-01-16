(function() {
    var out = {};
    var button_more = 'a.load_more_jobs';  //SELECTOR DEl BOTON VER MAS JOBS
    var selector_jobs = 'li.job_listing';  //SELECTOR DE LOS JOBS

    msg(pass_it);
    if (!pass_it["heights"]) 
      out["pass_it"] = { 
        "heights": [], //NUMERO DE JOBS, ESTRAIDOS POR CICLO.
        "cont": 1 
    };
  
    else out["pass_it"] = pass_it;

    out["has_next_page"] = true;
    //CONDICION DE EXISTENCIA DEL BOTON LOADMORE
    if (document.querySelectorAll(button_more).length > 0){
        document.querySelector(button_more).click() 
          msg('---Click al botón---');
    }else{
        out["has_next_page"] = false;
    }

    var targetPage = document.querySelectorAll(selector_jobs).length;
    //CONDICION DE PARADA, VALIDANDO SI LA ULTIMA POSICION DE ARRAY ES IGUAL AL TOTAL DE JOB POR CICLO
    if (out["pass_it"]["heights"][out["pass_it"]["heights"].length - 1] == document.querySelectorAll(selector_jobs).length)
        out["has_next_page"] = false;
    else {
        out.waitForFunction = {
            "function": waitForPage.toString(),
            "args": [targetPage, selector_jobs]
        };
    }
    //GUARDA EN LA POSICION DEL ARRAY, EL NUMERO DE JOBS EXTRAIDO POR CICLO.
    out["pass_it"]["heights"].push(document.querySelectorAll(selector_jobs).length);
    //ESPERA POR EL SELECTOR LOS JOBS (IMPORTANTE)
    out.waitFor = "li.job_listing";
    out.pic = true;
    return out;
})();

function waitForPage(target, jobs) {
    var current = document.querySelectorAll(jobs).length;
    msg('Target'+parseInt(target) < 'Current'+parseInt(current));
    return parseInt(target) < parseInt(current)
}