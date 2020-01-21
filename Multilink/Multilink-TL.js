
(function () {
    var out = {};
    var selector = "";  // 1) selector donde esta la paginacion


  if (typeof pass_it == "undefined") pass_it = {};
    
  if (!pass_it["cont"]) {
        out["pass_it"] = {
            "cont": 1,
            "urls": [""]      // 2) colocar las url
        };
    } else {
        out["pass_it"] = pass_it;
    }


  out["has_next_page"] = false;
  out["pass_it"].cont += 1;
          
        var all_elems = document.querySelectorAll(selector);
        [].forEach.call(all_elems, function(elemento){
            if(elemento.textContent.trim() == out["pass_it"].cont){                
                  //msg("click!!!!!"+elemento.textContent.trim());
                elemento.click();
                  out["has_next_page"] = true;
            }
        }); 
  
      if (!out["has_next_page"]){
        if (out["pass_it"]["urls"].length > 0) {
        var url = out["pass_it"].urls.shift();
        msg("CAMBIO DE URL");
        window.location.href = url;
        out["has_next_page"] = true;
    } else {
        out["has_next_page"] = false;
    }
    
    }
      


    out.waitFor = '';            // 3) colocar el selector a esperar
    return out;
})();





