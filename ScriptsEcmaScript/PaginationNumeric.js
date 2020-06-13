(function() {
    let out = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 2           
      };
    } else {
      out["pass_it"] = pass_it;
    }
    let next_page_selector = 'a[href="search?&page='+out["pass_it"].cont+'&sort=job_id"]'; // Selector del next  
    let clickable_elem = document.querySelector(next_page_selector);
  
    if (clickable_elem) {
      out["pass_it"].cont++;
      clickable_elem.click();
      out["has_next_page"] = true;
    } else {      
      out["has_next_page"] = false;
    }
  
    out.waitFor = 'section[class="search-results"] tr:not(:first-child)';
    return out;
  })();