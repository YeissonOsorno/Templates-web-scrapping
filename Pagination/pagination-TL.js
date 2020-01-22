(function() {
    var out = {};
  var next_page_selector = 'ul.pagination li a[rel="next"]'; // Selector del next 
  //var last_page_selector = ""; //Selector de la última página
   
  var clickable_elem = document.querySelector(next_page_selector);

    //stop condition
    if (!document.querySelector(next_page_selector)) {
      out["has_next_page"] = false;
  } else {
        clickable_elem.click();
      out["has_next_page"] = true;
  }

    out.waitFor = "div.contentVacants";
    return out;
})();