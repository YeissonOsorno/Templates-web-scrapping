let countries = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
    FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "entucky",
    LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Míchigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
    MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
    ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
    TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming",DC:"DC"
}

let geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
let newLocation = geoUS.doCleaning(_location[1].trim());
_location.splice(1,1,newLocation[0])
job.location = _location.join(', ').trim();

console.log(newLocation)

function Geo(countryCodesArr, countriesArr) {
    this.countryCodesArr = countryCodesArr;
    this.countriesArr = countriesArr;
    this.doCleaning = (word)=>{
        let result, countryResult;
        result = this.doSearch(this.countryCodesArr,word);
        if(typeof result =="string") return result;
        countryResult = this.countriesArr[result];
        return new Array(countryResult, result);
    }
    this.doSearch = (arraySearch, targetValue)=> {
        let arrayDoSearch = arraySearch;
        let length = arrayDoSearch.length;
        for(let item = 0; item<length; item++){
        	if(arrayDoSearch[item] === targetValue){
        		console.log('\x1b[32m Find');
        		return item;
        	}
        }  
    }
}