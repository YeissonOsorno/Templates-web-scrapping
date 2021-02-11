(function() {
    var out = {};
    var job = {};
    var selector = 'div[class="csa_jobadLeft"]';
    var remove_selectors = ['a','h1','strong'];
    //var job = pass_it["job"];
  
  
    var full_html = document.querySelector(selector);
    if(full_html){   //VALIDAR SI DESCRIPCION NO ES NULL
  
      // remove something from the jobdatata
  
      if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) 	full_html.querySelector(remove_selector).remove();});
      if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
      if (typeof msg == "undefined") msg = console.log;
  
      /* ReqID*/
      job.reqid =  contains('div.csa_jobadInfoItem','Nummer',document).split(':').pop().trim();
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
      var date= contains('div[class="csa_jobadRight"] div[class="csa_jobadInfoItem"]','Deadline:',full_html).replace("Deadline:","").trim()
      if(date!=""){
        if(date.includes(","))date=date.split(",").shift();
        msg(date)
        date = date.split("-")[1] +"/"+date.split("-")[0] +"/"+date.split("-")[2] ;
        if(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/g.test(date))job.dateclosed_raw =date;
      }
      /*EXPERIENCIA*/
      // job.experience_required = contains('Selector','Palabra',full_html);
      //  job.experience_required = full_html.querySelector('').textContent.trim()
  
      //REMOVER SELECTORES
      //===================
      removeSelector('script, style, a, img',document);
      //removeSelector('selector1, selector2,selectorN',document);
      //removeSelector('selector1, selector2,selectorN',document);
  
  
      //REMOVER SELECTORES POR TEXTO
      //=============================
      //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN',full_html)
      //removeTextSelector('texto_a_buscar1\\:selector1,texto_a_buscar2\\:selector2...texto_a_buscarN\\:selectorN',full_html)  
  
  
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
      job.html = removeTextAfter(job.html, "Informatie en solliciteren", true);
      job.html = removeTextAfter(job.html, "Interested?", true);
      job.html = removeTextAfter(job.html, "Interesse?", true);
      //job.html = removeTextAfter(job.html, "", true);
  
      //-----------------FILTRADO POR SPLIT----------------
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
      //job.html 		= job.html.split('')[0];
  
      job.html        = cleanHTML(job.html);
      job.jobdesc     = replaceNbsps(job.html).replace(/\<(.*?)\>/g, ""); 
      //job.jobdesc     = job.html.replace(/&nbsp;/g," ").replace(/\<(.*?)\>/g, ""); // clean tags
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
    document.querySelectorAll(selector).forEach(function(elemento){if(RegExp(texto).test(elemento.innerText)){resultado =elemento.textContent}})
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
  function replaceNbsps(str) {
    var re = new RegExp(String.fromCharCode(160), "g");
    return str.replace(re, "");
  }
  
  function ModifiedRemoveTextBefore(html, text, flag) {
    var newHtml = html;
    if (newHtml.indexOf(text) > -1) {
  
      if(newHtml.split(text).length>2){
        newHtml = newHtml.split(text);
        newHtml.splice(0,1);
        newHtml = newHtml.join(text);
      }else{newHtml = newHtml.split(text).pop();}
      if (!flag) {
        newHtml = "<h3>" + text + "</h3>" + newHtml;
      }  		
    }
    return newHtml;
  }