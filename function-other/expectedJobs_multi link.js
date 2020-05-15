/**
 * [dummy Es una funcion que retorna un objeto]
 * @type {[function]}
 */
//llamo la funcion dummy y me retorna un objeto
var dummy = dummy();
// Llamo una función del objeto que se llama expectedJobs("aquí el selector");
var expected_jobs = dummy.expectedJobs("p.job-count");
//Arroja la cantidad total 
console.log("Expected jobs ====> "  +  expected_jobs);


function dummy(){
  var dummyValidation = {
    expectedJobs : function(selector){
      var expectedAll = document.querySelectorAll(selector);
      var expectedJobs = expectedAll.length;
      var count = 0;
      for(var elem = 0;elem < expectedJobs; elem++ )
      {
        var stringJob = expectedAll[elem].textContent.trim().replace('\n','').replace(/ /gi,'').trim();               
        var regex = /\d+/;  
        if (typeof msg === 'undefined') msg = console.log;        
        var expected_jobs = regex.exec(stringJob)[0];
        count = count + Number(expected_jobs);
      }
      return count;
    }
  }
  return dummyValidation;
}
