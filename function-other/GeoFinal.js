let countries = {
    AL: "Alabama, US", AK: "Alaska, US", AZ: "Arizona, US", AR: "Arkansas, US", CA: "California, US", CO: "Colorado, US", CT: "Connecticut, US", DE: "Delaware, US",
    FL: "Florida, US", GA: "Georgia, US", HI: "Hawaii, US", ID: "Idaho, US", IL: "llinois, US", IN: "Indiana, US", IA: "Iowa, US", KS: "Kansas, US", KY: "entucky, US",
    LA: "Louisiana, US", ME: "Maine", MD: "Maryland, US", MA: "Massachusetts, US", MI: "Míchigan, US", MN: "Minnesota, US", MS: "Mississippi, US", MO: "Missouri, US",
    MT: "Montana, US", NE: "Nebraska, US", NV: "Nevada, US", NH: "New Hampshire, US", NJ: "New Jersey, US", NM: "New Mexico, US", NY: "New York, US", NC: "North Carolina, US",
    ND: "North Dakota, US", OH: "Ohio, US", OK: "Oklahoma, US", OR: "Oregon, US", PA: "Pennsylvania, US", RI: "Rhode Island, US", SC: "South Carolina, US", SD: "South Dakota, US",
    TN: "Tennessee, US", TX: "Texas, US", UT: "Utah, US", VT: "Vermont, US", VA: "Virginia, US", WA: "Washington, US", WV: "West, US", WI: "Wisconsin, US", WY: "Wyoming, US",DC:"DC"
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