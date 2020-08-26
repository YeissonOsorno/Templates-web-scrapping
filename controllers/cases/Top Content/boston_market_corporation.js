/* Infinite Pagination */
(function() {
	var out = {};
  var selector = 'div[class="pagination-showing styles__ShowingWrap-c3uh2t-3 gWWGxf"]';
  	out.waitFor = selector
    return out;
})();
/* Expected Jobs */
(function() {
	var out = {};
    var selector = 'div[class="pagination-showing styles__ShowingWrap-c3uh2t-3 gWWGxf"]';
  	var regex = /\d+/;
  
  	if (typeof msg === 'undefined') msg = console.log;

	var expected_jobs_str = document.querySelector(selector).textContent.split(' of ').pop().replace(',','').trim();
  	var expected_jobs = regex.exec(expected_jobs_str)[0];
	
  	out["expected_jobs"] = expected_jobs;

  	return out;
})();

/* Extract */
(function() {
    var jobs = [];
    var out = {};
    var counter = 0;
    var limit = true;
    var json;
    let countries = {
      AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
      FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "llinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "entucky",
      LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Míchigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
      MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
      ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
      TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West", WI: "Wisconsin", WY: "Wyoming",DC:"DC"
  }
    let geoUS = new Geo(Object.keys(countries),Object.values(countries)); 
    do {
      var data = {"from":counter,"size":10,"_source":["positionType","category","socialRecruitingAttribute1","description","address","jobId","clientId","clientName","brandId","location","internalOrExternal","url"],
                  "query":{"bool":{"filter":[{"terms":{"clientId.raw":["11452"]}},{"terms":{"brand.raw":["Boston Market"]}},
                                             {"terms":{"internalOrExternal":[{"internalOrExternal":"externalOnly"}]}}]}},"sort":[{"positionType.raw":{"order":"asc"}}]}
      $.ajax({
        url : 'https://prod-kong.internal.talentreef.com/apply/proxy-es/search-en-us/posting/_search',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json, text/plain, */*"
        },
        type : 'POST',
        data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){
          msg('\x1b[32m SUCCESS!...');
          json = result.hits.hits;
          var stop = json.length;
          msg(stop)
          if(stop<1) limit = false;
          for(var i = 0; i<json.length; i++) {
            var job = {};
            var elem = json[i];
            job.title = elem._source.positionType;
  
            var city = elem._source.address.city;
            var state = elem._source.address.stateOrProvince;
            state = geoUS.doCleaning(state)[0];
            var country = elem._source.address.country;
              
  
          
            job.location = fixedLocation(city,state,country);
            job.url = "https://secure.jobappnetwork.com" +  elem._source.url;                    
            //job.dateposted_raw = elem.positionOfDatePosted;
            //job.dateclosed_raw = elem.positionOfDateClosed;
            //job.source_jobtype = elem.positionOfJobtype;
            //job.source_salary = elem.positionOfSalary;         
            //job.source_empname = elem.positionOfEmpname;
            //job.logo = elem.positionOfLogo;
            //job.source_apply_email = elem.positionOfEmail;
  
            job.temp = "1";
            jobs.push(job);
          }
          counter = counter + 10;
        },
        error: function(error){
          msg(error);
        }
      });
    } while (limit);
  
    out["jobs"]= jobs;
    return out;
  })();
  //Location by 3
  function fixedLocation(city,state,country){
  
    var city    = city;
    var state    = state;
    var country = country;
  
    let loc = "";
    let array_loc = Array();
  
    if(city) {
      city = city.toLowerCase().replace(/\b[a-z]/g, (letter)=> letter.toUpperCase());
      array_loc.push(city);
    }
    if(state)   array_loc.push(state);
    if(country) array_loc.push(country);
  
    if(array_loc.length) loc = array_loc.join(", ");
  
    return loc;  
  } 
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

  /* Description */
  (function () {
    var out = {};
    var job = {};
    var selector = ".salaried-description-text-container";

    var full_html = $(selector);

    // quitar selectores del jobdata
    full_html.find('a').remove().end().html();
    full_html.find('input').remove().end().html();
    full_html.find('div.alert').remove().end().html();
    full_html.find('iframe').remove().end().html();
    full_html.find('img').remove().end().html();
    full_html.find('script').remove().end().html();
    full_html.find('style').remove().end().html();

    var full_html = full_html.html();

    job.source_jobtype = $("span.salaried-description-title:contains(Status:)").parent().next().text().trim();
    msg("TYPE: " + job.source_jobtype);
    job.html = full_html.trim();
    job.html = removeTextAfter(job.html, "Boston Market Corporation is an equal opportunity employer.", true);
    var fechaparte = $("span.salaried-description-title:contains(Date posted:)").parent().next().text().trim();
    fechaparte = fechaparte.replace(", ", " ").trim();
    var separador = ' ';
    var ano = fechaparte.split(separador)[2].trim();
    var monthJob = fechaparte.split(separador)[0].trim();
    var dia = fechaparte.split(separador)[1].trim();
    if (monthJob.indexOf("January") > -1) { monthJob = "01"; }
    if (monthJob.indexOf("February") > -1) { monthJob = "02"; }
    if (monthJob.indexOf("March") > -1) { monthJob = "03"; }
    if (monthJob.indexOf("April") > -1) { monthJob = "04"; }
    if (monthJob.indexOf("May") > -1) { monthJob = "05"; }
    if (monthJob.indexOf("June") > -1) { monthJob = "06"; }
    if (monthJob.indexOf("July") > -1) { monthJob = "07"; }
    if (monthJob.indexOf("August") > -1) { monthJob = "08"; }
    if (monthJob.indexOf("September") > -1) { monthJob = "09"; }
    if (monthJob.indexOf("October") > -1) { monthJob = "10"; }
    if (monthJob.indexOf("November") > -1) { monthJob = "11"; }
    if (monthJob.indexOf("December") > -1) { monthJob = "12"; }
    if (fechaparte.length > 1) {
        job.dateposted_raw = monthJob + "/" + dia + "/" + ano;
    }
    msg("DATE: " + job.dateposted_raw);

  	job.html = cleanHTML(job.html);
    job.jobdesc = job.html;

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