/**
 * [dateAgo Funcion para convertir texto a fechas]
 * @param  {[String]} text                  [Valor en texto extraido]
 * @param  {[String]} char_separator        [Caracter separador]
 * @param  {[Number]} position_value_DWMY   [Posición donde esta el valor en numero]
 * @param  {[Number]} position_word_DWMY    [Posición donde esta el valor o Days o Weeks etc]
 * @return {[String]}                       [Retorna un valor en string pero con formato de fecha]
 */
function dateAgo (text, char_separator, position_value_DWMY, position_word_DWMY){
        var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
        if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
        var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
        }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
        var date_Now = new Date();  //declaro un objeto tipo fecha
        var nDays = 0;
            if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
            if (dayWeekMonthYear.toUpperCase().indexOf(/YESTERDAY/g)>-1) {nDays = 1;}
            if (dayWeekMonthYear.toUpperCase().indexOf('DAYS')>-1){nDays = numberDWMY;}
            if (dayWeekMonthYear.toUpperCase().indexOf('WEEK')>-1){nDays = numberDWMY * 7;}
            if (dayWeekMonthYear.toUpperCase().indexOf(/MONTH|MOIS/g)>-1){nDays = numberDWMY * 30;}
            if (dayWeekMonthYear.toUpperCase().indexOf('YEAR')>-1){nDays = numberDWMY * 365;}
            var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
            var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
            var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
              //Obtengo dia mes y Año
            var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
            var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
            var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
            if (dd < 10){dd ='0'+dd;}
            if (mm<10){mm ='0'+ mm;}
            dateJob= mm +'/'+dd+'/'+yyyy;
        return dateJob;
}


// Frances
function dateAgo(text, char_separator, position_value_DWMY, position_word_DWMY){  
    var numberDWMY = parseInt(text.trim().split(char_separator)[position_value_DWMY],10); //obtengo el valor numerico del dia, sem, mes o año
    if(typeof text.split(char_separator)[position_word_DWMY]!=='undefined'){
    var dayWeekMonthYear = text.split(char_separator)[position_word_DWMY]
    }else{ var dayWeekMonthYear = text.split(char_separator)[text.split(char_separator).length - 1]};
    var date_Now = new Date();  //declaro un objeto tipo fecha
    var nDays = 0;
        if (dayWeekMonthYear.toUpperCase().search(/TODAY|HOUR/g)>-1){nDays = 0;}
        if (dayWeekMonthYear.toUpperCase().search(/YESTERDAY|AYER|HIER/g)>-1) {nDays = 1;}
        if (dayWeekMonthYear.toUpperCase().search(/DAYS|DIAS|JOURS/g)>-1){nDays = numberDWMY;}
        if (dayWeekMonthYear.toUpperCase().search(/WEEK|SEMANAS|SEMAINES/g)>-1){nDays = numberDWMY * 7;}
        if (dayWeekMonthYear.toUpperCase().search(/MONTH|MESES|MOIS/g)>-1){nDays = numberDWMY * 30;}
        if (dayWeekMonthYear.toUpperCase().search(/YEAR|AÑOS|ANS/g)>-1){nDays = numberDWMY * 365;}
        var dateJob    = date_Now.getDate() - nDays;     //resto dias de publicacion a la fecha actual
        var get_date   = date_Now.setDate(dateJob);      //obtengo la cantidad de mseg. desde 1 de Enero de 1970
        var datePosted = new Date(get_date);             //obtengo la fecha de publicacion.
          //Obtengo dia mes y Año
        var dd    = datePosted.getDate();                //devuelve el numero del dia del mes.
        var mm    = datePosted.getMonth()+1;             //getMonth devuelve valores de 0 a 11, se suma uno para llevarlo de 1 a 12.
        var yyyy  = datePosted.getFullYear().toString(); //devuelve el año.
        if (dd < 10){dd ='0'+dd;} // dd<10?'0'+dd:dd;
        if (mm<10){mm ='0'+ mm;} //mm<10?'0'+mm:mm;  
        dateJob= mm +'/'+dd+'/'+yyyy;
    return dateJob;
  }