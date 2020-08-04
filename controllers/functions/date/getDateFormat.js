/**
 * [getDateFormat Funcion para convertir el formato de fecha July 12, 2020]
 * @param  {[String]} text                  [Valor en texto extraido]
 * @param  {[String]} cut        			[Caracter separador]
 * @param  {[Number]} dayPosition   		[Posición donde esta el dia valor en numero]
 * @param  {[Number]} monthPosition    		[Posición donde esta el valor del mes]
 * @param  {[Number]} yearPosition    		[Posición donde esta el valor del año]
 * @return {[String]}                       [Retorna un valor en string pero con formato de fecha]
 */
function getDateFormat(dateRaw, cut, dayPosition, monthPosition, yearPosition) {
    dateRaw = dateRaw.replace(/\,/g,"").trim();
  
    let day   =  dateRaw.split(cut)[dayPosition].trim(), 
        month =  dateRaw.split(cut)[monthPosition].trim(), 
        year  = dateRaw.split(cut)[yearPosition].trim();
    // if(day < 10 && day.length < 2){day = "0" + day;} 
  
    if(dateRaw.search(/[a-z]/gi)>-1){ 
      if(month.search(/jan/i)>-1){month = "01";}
      if(month.search(/feb|fév/i)>-1){month = "02";}
      if(month.search(/mar/i)>-1){month = "03";}
      if(month.search(/apr|avr/i)>-1){month = "04";}
      if(month.search(/may|mai/i)>-1){month = "05";}
      if(month.search(/jun|juin/i)>-1){month = "06";}
      if(month.search(/jul|juil/i)>-1){month = "07";}
      if(month.search(/aug|août/i)>-1){month = "08";}
      if(month.search(/sep/i)>-1){month = "09";}
      if(month.search(/oct/i)>-1){month = "10";}
      if(month.search(/nov/i)>-1){month = "11";}
      if(month.search(/dec|déc/i)>-1){month = "12";}
    }
    var datum = month +"/"+  day +"/"+ year;
    return datum;
  }