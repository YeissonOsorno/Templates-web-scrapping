(function(){
    var out = {};
    var selectorscroll = 'SELECTOR QUE CASI SIEMPRE TIENE UNA BARRA DE DESPLAZAMIENTO A LA DERECHA AL CUAL SE LE HACE SCROLL CON LA RUEDA DEL MOUSE Y/O ARRASTRANDO CON EL MOUSE HASTA ABAJO';
    var selectorjobs = 'SELECTOR QUE CONTIENE TODOS LOS JOBS';
    msg(pass_it);
    if(!pass_it["heights"]) out["pass_it"] = {"heights":[]};
    else                    out["pass_it"] = pass_it;
    
    out["has_next_page"] = true;
    if(out["pass_it"]["heights"].length > 3){
        var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
        if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
          out["has_next_page"] = false;
    }
  
   
document.querySelector(selectorscroll).scrollBy(0,document.querySelector(selectorscroll).scrollHeight)
    
    out["wait"] = true;
    out["pic"]  = true;
    out["html"]   = true;
    out["pass_it"]["heights"].push(document.querySelectorAll(selectorjobs).length);
    return out;
})();


(function(){
    var out = {};
    var selectorscroll = 'html';
    var selectorjobs = 'div[class="oracletaleocwsv2-accordion oracletaleocwsv2-accordion-expandable clearfix"]';
    msg(pass_it);
   
    if(!pass_it["heights"]) out["pass_it"] = {"heights":[]}; //crea un array vacio, que contendrá cantidad jobs por scroll
    else                    out["pass_it"] = pass_it;
    
   
    out["has_next_page"] = true;//por defecto el flac de paginar estar true, para hacer scroll
    if(out["pass_it"]["heights"].length > 3){ //Si array heihts es mayor a 3
        var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); //crea variable, elimina las tres primeras posiciones 
        if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])//compara las tres primeras posiciones son iguales, para deterner paginacion
          out["has_next_page"] = false;
    }
  
    
document.querySelector(selectorscroll).scrollBy(0,document.querySelector(selectorscroll).scrollHeight)// se hace un scroll en longitud vertical por el valor del tamaño del scroll
 //scrollHeight----> nos trae la longitud en pixels  
    out["wait"] = true;
    out["pic"]  = true;
    out["html"]   = true;
    out["pass_it"]["heights"].push(document.querySelectorAll(selectorjobs).length);// se almacena en el array la cantidad de jobs por scroll
    return out;
})();