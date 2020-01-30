(function() {
    var out = {};
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 1           
      };
    } else {
      out["pass_it"] = pass_it;
    }
    var next_page_selector = 'a[title="Go to page '+out["pass_it"].cont+'"]'; // Selector del next  
    var clickable_elem = document.querySelector(next_page_selector);
  
    if (clickable_elem) {
      out["pass_it"].cont++;
      clickable_elem.click();
      out["has_next_page"] = true;
    } else {      
      out["has_next_page"] = false;
    }
  
    out.waitFor = "ul#jobList >li";
    return out;
  })();