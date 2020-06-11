/*
* Primero tienes que saber que el scroll es como un load more solo que el scroll tiene un contenedor propio entonces cuando usas la funcion
* en la linea 26 window.scrollBy(0, document.body.scrollHeight); lo que hace es que vas a hacer un Scroll por el tamaño del body, entonces
* aveces pasa que el body tiene un tamaño especifico y cuando haces el scroll no da tiempo a que cargue por ejemplo
* Supongase que el tamaño del body.scrollHeight (la altura) es de 100px entonces yo voy a hacer un scroll del tamaño de 100px
* entonces los jobs siguientes no salen, entonces lo que se hace es que se agranda el tamaño del body para que cuando yo haga scroll sea mas
*  grande y pueda tomar mas jobs
*/
(function () {
    var out = {};
    // Crea un div para darle altura a la pagina
    var ref = document.querySelector('div[class="hmg-jb jb_search_results"]'); //Selector que contiene los jobs 
    var newEle = document.createElement('div');
    ref.appendChild(newEle);
    newEle.style.height = '6000px' // para darle altura a la pagina 
    msg(pass_it);
    if(!pass_it["heights"])    out["pass_it"] = {"heights":[]};
    else                     out["pass_it"] = pass_it;
  
    out["has_next_page"] = true;
    if(out["pass_it"]["heights"].length > 3){
      var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
      if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
        out["has_next_page"] = false;
    }
        window.scrollBy(0, document.body.scrollHeight);
    
    out["wait"] = true;
    out["pic"] = true;
    out["html"] = true;
    out["pass_it"]["heights"].push(document.querySelectorAll('div.job-post-row.jb-transition').length);//Selector de los JOBS
    return out;
  })();