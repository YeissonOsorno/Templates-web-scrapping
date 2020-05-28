/* Remover Selectores */
for(const a of full_html.querySelectorAll('input, javascript, script, style')){
    a.remove();
  }
  
  /* Obtener correos para Apply y removerlos */
  for (const a of full_html.querySelectorAll("p")) {
    if (a.textContent.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){//search, match, includes, indexOf can be used
      if(a.textContent.search(/CV|resume|cover letter|curriculum/gi)>-1){
            job.source_apply_email = a.textContent.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)[0];
            msg(job.source_apply_email);
            a.remove(); 
        }
    } 
  }
  
  /* Remover Correos*/
  for (const a of full_html.querySelectorAll("font")) {
    if (a.textContent.search(/[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}(?:\.[a-z]{2})?/gi)>-1){
      a.remove(); 
    }
  }
  
  /* REMOVER PAGINAS WEB */  
  for (const a of full_html.querySelectorAll("font")) {
    if (a.textContent.search(/http:/gi)>-1){
      a.remove(); 
    }
  }  
  
  /* Extraer salario y removerlo */     
  for(const a of full_html.querySelectorAll('')){
        const text = a.textContent.trim();
        if(text.search(/palabra/i) > -1){
            let auxSalary = text.split(/palabra/i).pop().trim();
            if(auxSalary.search(/\£|\¥|\€|\$|\¢/g) > -1){
                job.source_salary = auxSalary;
                //job.source_salary = job.source_salary.split(' PALABRA ').pop().trim();
                a.remove();//remueve el selector si coincide con la palabra clave.
            }
        }
    }
  
    /* Extraer jobtype y removerlo */     
    for(const a of full_html.querySelectorAll('')){
      const text = a.textContent.trim();
      if(text.search(/palabra/i) > -1){
        //job.source_jobtype = text.split(/palabra/i).pop().split(/palabra/).shift().trim();
        //job.source_jobtype = job.source_jobtype.replace(/palabra/, '').trim();
        a.remove();//remueve el selector si coincide con la palabra clave.
      }
    }