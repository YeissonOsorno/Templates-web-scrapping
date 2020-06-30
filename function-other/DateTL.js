
//función "getDateFormat" para meses en inglés. 
 
job.dateposted_raw = value.data.posted_date; // Se toma el valor de la fecha.
job.dateposted_raw = getDateFormat(job.dateposted_raw," ",1,0,2); // Se invoca la función y se coloca en orden los parametros

function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").trim();
       
     let day   =  dateRaw.split(cut)[dayPosition].trim(), 
         month =  dateRaw.split(cut)[monthPosition].trim(), 
         year  = dateRaw.split(cut)[yearPosition].trim();

       if(dateRaw.search(/[a-z]/gi)>-1){ 
         if(month.search(/jan/i)>-1){month = "01";}
         if(month.search(/feb/i)>-1){month = "02";}
         if(month.search(/mar/i)>-1){month = "03";}
         if(month.search(/apr/i)>-1){month = "04";}
         if(month.search(/may/i)>-1){month = "05";}
         if(month.search(/jun/i)>-1){month = "06";}
         if(month.search(/jul/i)>-1){month = "07";}
         if(month.search(/aug/i)>-1){month = "08";}
         if(month.search(/sep/i)>-1){month = "09";}
         if(month.search(/oct/i)>-1){month = "10";}
         if(month.search(/nov/i)>-1){month = "11";}
         if(month.search(/dec/i)>-1){month = "12";}
       }
var datum = month +"/"+  day +"/"+ year;
  return datum;
}