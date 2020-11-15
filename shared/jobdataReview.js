(function() {
    var out = {};
    var job = {};
    var selector = '#app > main > div > section:nth-child(1) > div';//.sc-gPEVay.fzsypF
    var remove_selectors = ['a'];
    //var job = pass_it["job"];
  
    if(document.querySelector('div[class*="job-meta "] span:nth-child(2)')){
      let loc = document.querySelector('div[class*="job-meta "] span:nth-child(2)').textContent.trim();
      if(loc.includes('uur')){
        loc = 'Waalwijk'
      }
      job.location = locationNL(loc);
  
  
    }
  
    /*if(document.querySelector('div[class*="job-meta "] span:nth-child(1)')){
          job.source_empname = document.querySelector('div[class*="job-meta "] span:nth-child(1)').textContent.trim();
      }*/
    var full_html = document.querySelector(selector);
    if(full_html){   //VALIDAR SI DESCRIPCION NO ES NULL
  
      // remove something from the jobdatata
  
      if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) 	full_html.querySelector(remove_selector).remove();});
      if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
      if (typeof msg == "undefined") msg = console.log;
  
  
      /*LOCATION*/
      //job.location = contains('Selector','Palabra',full_html);
      //job.location = full_html.querySelector('').textContent.trim()
  
      /*JOBTYPE*/
      //job.source_jobtype = contains('Selector','Palabra',full_html);
      //job.source_jobtype = full_html.querySelector('').textContent.trim()
  
      /*SALARY*/
      //job.source_salary = contains('Selector','Palabra',full_html);
      //job.source_salary = full_html.querySelector('').textContent.trim()
  
      /*DATEPOSTED*/
      //job.dateposted_raw = cambiofecha(contains('Selector','Palabra',full_html),' ',1,0,2);
  
      /*DATECLOSED*/
      //job.dateclosed_raw = cambiofecha(contains('Selector','Palabra',full_html),' ',1,0,2);
  
      //REMOVER SELECTORES
      //===================
      removeSelector('script, style, a, img',document);
      //removeSelector('selector1, selector2,selectorN',document);
      //removeSelector('selector1, selector2,selectorN',document);
  
  
      //REMOVER SELECTORES POR TEXTO
      //=============================
      //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')
      //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN')  
  
  
      job.html 	    = full_html.innerHTML.trim();
      job.jobdesc 	= full_html.innerHTML.trim();
  
      //REPLACE ELIMINAR URL
      //======================
      //job.html = job.html.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'');
  
      //OBTENER EMAIL DE APPLY
      //=======================
      //if(html_2.search(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi) > -1){
      //  job.source_apply_email = html_2.match(/([a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_-]+)/gi)[0];
      //}
  
  
      // --------------- removeTextBefore -----------
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
      //job.html = removeTextBefore(job.html, "", false);
  
      // ------------ -- removeTextAfter -----------
      job.html = removeTextAfter(job.html, "Ben jij Mandemakers?", true);
      job.html = removeTextAfter(job.html, "Ben jij Tulp?", true);
      job.html = removeTextAfter(job.html, "Interested?", true);
      job.html = removeTextAfter(job.html, "Laat van je horen en solliciteer", true);
      job.html = removeTextAfter(job.html, "Ben jij Keuken Kampioen?", true);
      job.html = removeTextAfter(job.html, "Vragen?", true);
      job.html = removeTextAfter(job.html, "Ben jij KeukenConcurrent?", true);
      //job.html = removeTextAfter(job.html, "", true);
      //-----------------FILTRADO POR SPLIT----------------
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
  
      job.html        = cleanHTML(job.html);
      job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
      job.jobdesc     = cleanHTML(job.jobdesc);
  
      //desactivar jobs con descripcion menor a 50 caracteres
      if (job.jobdesc.length < 50){
        job.flag_active=0;
      }
    }else{
      job.html 		= '';   //SI DESCRIPCION ES NULL SE LE ASIGNA CERO(0) CARACTERES
      job.jobdesc 	= '';
      job.flag_active=0;
    }
  
    out['pic'] = true;
    out["job"] = job;
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
  
  function contains(selector,texto,elements){
    let resultado ='';  
    elements.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento.textContent}})
    return resultado;
  }    
  
  function removeTextSelector(textSelector,elements){
    let selectors = textSelector.split(',');
    selectors.forEach(function(selector){
      let text = selector.split('\\:').shift(); let itemselec = selector.split('\\:').pop();
      elements.querySelectorAll(itemselec).forEach(function(elem){RegExp(text).test(elem.innerText)?elem.remove():null})})
  }
  
  function removeSelector(selectorDom, elements){
    selectorDom.split(',').forEach(selector=>{elements.querySelectorAll(selector).forEach(function(elem){elem.remove()})})
  }
  
  function cambiofecha(get_date, sC, pMes, pDia, pAno) {  //Ingreso Strin con fecha;caracter separador;posicion Mes, Dia y Año
    get_date = get_date.trim();
    var monthJob = get_date.split(sC)[pMes].substring(0,3).trim().toLowerCase();
    var dia = parseInt(get_date.split(sC)[pDia],10); dia = dia<10?'0'+dia:dia;
    var dateEN = {"jan":"01","feb":"02","mar":"03","apr":"04","may":"05","jun":"06","jul":"07","aug":"08","sep":"09","oct":"10","nov":"11","dec":"12"}
    typeof dateEN[monthJob]!='undefined'?monthJob = dateEN[monthJob]:monthJob= parseInt(monthJob,10)<10?'0'+monthJob:monthJob;
    return monthJob+"/"+dia+"/"+get_date.split(sC)[pAno].trim();
  }
  function locationNL(loc){  //funcion con ciudades de NL
    let job = {};
    country = "NL";
    let city_NL = ["Amsterdam","Rotterdam", "Rotterdam", "La Haya", "Den Haag", "Utrecht", "Delft", "Maastricht", "Hengelo","Haarlem", "Eindhoven", "Leiden", "Alkmaar", "Groninga", "Volendam", "Marken", "Dordrecht",
                   "Breda", "Hoorn", "Zwolle", "Arnhem", "Zaanse Schans", "Bolduque", "Gouda", "Amersfoort", "Edam-Volendam",
                   "Kinderdijk", "Leeuwarden", "Almere", "Deventer", "Zandvoort", "Naarden", "Enkhuizen", "Lelystad", "Lisse",
                   "Amstelveen", "Middelburg", "Bloemendaal", "Kampen", "Venlo", "Apeldoorn", "Nimega", "Giethoorn", "Edam",
                   "Roermond", "Den Helder", "Tilburg", "Urk", "Zaanstad", "Hilversum", "Texel", "Aalsmeer", "Purmerend", "Nimega",
                   "Drenthe","Flevoland","Friesland","Gelderland","Groningen","Limburg","Noord-Brabant","Noord-Holland","Overijssel","Zeeland","Zuid-Holland"]
  
    city_NL.forEach(function(e){             //recorrer el arrego de ciudades
      if(loc.indexOf(e)>-1){loc = e+', '+country;}
    });
    return loc
  }