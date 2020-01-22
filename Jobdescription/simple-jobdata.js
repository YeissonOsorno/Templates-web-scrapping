(function() {
	var out = {};
	var job = {};
  	var selector = "div#vista-aviso";
  	var remove_selectors = ['h4','h1'
                            ,'p[class="aviso-canal"]'
                            ,'p[class="aviso-empresa"]'
                            ,'div[class="divider tools-aviso"]'
                            ,'span[class="resumen"]'];
  	//var job = pass_it["job"];
  
	var full_html = document.querySelector(selector);
  	// remove something from the jobdatata
	if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  	if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  	if (typeof msg == "undefined") msg = console.log;
	
  	var closedSplit, postedSplit;
  	
	job.html 		= full_html.innerHTML.trim();
	job.jobdesc 	= full_html.textContent.trim();
  
	job.html 		= cleanHTML(job.html);
	job.jobdesc 	= cleanHTML(job.jobdesc);
  
	if(job.html.includes('Tipo de contrato'))
      	var data = job.html.split('Tipo de contrato').pop();
  		job.source_jobtype = data.split('Jornada Laboral').shift();
  
  	if(job.html.includes('Fecha Publicación'))
      	var data = job.html.split('Fecha Publicación').pop().trim();
  		job.dateposted_raw = data.split('Fecha finalización').shift().trim();
  		postedSplit = job.dateposted_raw.split(' ');
  		var splitPosted = postedSplit[1];
  		splitPosted = convert(splitPosted);
  		job.dateposted_raw =`${postedSplit[0]},${splitPosted},${postedSplit[2]}`
  
  	if(job.html.includes('Fecha finalización'))
      	var data =job.html.split('Fecha finalización').pop().trim();
      	job.closed_raw = data.split('<p> Estimado usuario').shift().trim();
  		closedSplit = job.closed_raw.split(' ');
  		var splitClosed = closedSplit[1];
  		splitClosed=convert(splitClosed);
  		job.closed_raw = `${closedSplit[0]},${splitClosed},${closedSplit[2]}`;
  
  	job.html = removeTextAfter(job.html,'Contrato',true)
  	job.jobdesc = removeTextAfter(job.jobdesc,'Contrato',true)
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

function convert(arg){
  //var monthsSpanish = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  //var monthsEnglish = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
  if(arg =='ene')
    arg = 'jan';
  
  if(arg =='feb')
    arg = 'feb';
  
  if(arg =='mar')
    arg = 'mar';
  
  if(arg =='abr')
    arg = 'apr';
  
  if(arg =='may')
    arg = 'may';
  
  if(arg =='jun')
    arg = 'jun';
  
  if(arg =='jul')
    arg = 'jul';
  
  if(arg =='ago')
    arg = 'aug';
  
  if(arg =='sep')
    arg = 'sep';
  
  if(arg =='oct')
    arg = 'oct';
  
  if(arg =='nov')
    arg = 'nov';
  
  if(arg =='dic')
    arg = 'dec';
  
  
  return arg;
}