(function() {
    var out = {};
    var next_page_selector = 'li[class="page-item page-next"]'; 
    var selector = document.querySelector('div.pagination-detail span').textContent.trim().split(' ');
     
    var clickable_elem = document.querySelector(next_page_selector);
    if (!pass_it["urls"]) {
          out["pass_it"] = {
              // Arreglo de URLs
              "urls": ["https://www.pwc.com/co/es/carreras/job-search/results.html?wdjobsite=Global_Experienced_Careers&wdcountry=COL&wdprog=&wdjobtitle=&wdlocation=&wdservice=&wdindustry=&wdspecialism=&wdgrade=&submit=Buscar"],
              "currentUrl": 0
          };
      } else {
          out["pass_it"] = pass_it;
      }
  
      //stop condition
      if (selector[5] == selector[8]) {
          // Pregunta si la siguiente url existe
          if (out["pass_it"]["currentUrl"] < out["pass_it"]["urls"].length) {
              var url = out["pass_it"].urls[out["pass_it"]["currentUrl"]];
              window.location.href = url;
                out["pass_it"]["currentUrl"] += 1;
              out["has_next_page"] = true;
          } else {
              out["has_next_page"] = false;
          }
    } else {
          clickable_elem.click();
        out["has_next_page"] = true;
    }
      
      out.waitFor = "table#wdresults>tbody tr";
      return out;
  })();
  