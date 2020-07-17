/*Convert to format*/
function converToFormat(date){
    let months = {
      jan:"01", feb:"02", mar:"03", apr:"04",may:"05", jun:"06", jul: "07", aug: "08", sep: "09" ,
      oct: "10", nov: "11", dec: "12",
      january:"01", february:"02", march:"03", april:"04",may:"05", juny:"06", july: "07", august: "08", september: "09" ,
      october: "10", november: "11", december: "12"
    }
    let dateInput,dateOutput;
    dateInput = date.split(' ');
    var _date = new _Date(Object.keys(months),Object.values(months)); 
    var newDate = _date.doCleaning(dateInput[0].trim()); 
    dateOutput =  newDate[0] + '/' + dateInput[1].replace(',','').trim() + '/' + dateInput[2];
    function _Date(codeDate, dateReal) {
      this.codeDate = codeDate;
      this.dateReal = dateReal;
      this.doCleaning = (word)=>{
        var result, resulDate;
        result = this.doSearch(this.codeDate,word.toLowerCase());
        resulDate = this.dateReal[result];
        return new Array(resulDate, result);
      }
      this.doSearch = (arraySearch, targetValue)=> {
        let arrayDoSearch = arraySearch;
        let length = arrayDoSearch.length;
        for(var item = 0; item<length; item++){
          if(arrayDoSearch[item] === targetValue){
            console.log('\x1b[32m Find');
            return item;
          }
        }  
      }
    }
    return dateOutput;
  }