(function () {
    var out = {};
    out['pass_it'] = pass_it;
    out['pass_it'].cont += 1;
    //Formas de devolverse
    window.location.href = ''; // por ubicacion
    //window.history.back(); // para devolverse con la fecha de atras
    /*
    *if(document.querySelector(''))
        document.querySelector('').click();
    */
    if (out['pass_it']['salir'])
        out["has_next_page"] = false;
    else
        out["has_next_page"] = true;
    out.waitFor = out['pass_it']['selector_job'];
    //out['wait'] = true;
    return out;
})();