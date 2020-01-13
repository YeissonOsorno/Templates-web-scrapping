(function() {
  	var out = {};
	var next_page_selector = "div.pagerpanel span:nth-child(10) span a"; //selector to identify the next button
	var last_page_selector = "div.pagerpanel span span a"; //selector to identify the last page
 	
    var clickable_elem = document.querySelector(next_page_selector);
    //variable para hacer el Stop de la paginacipon
  	var stop = document.querySelector('div.pagerpanel span span').textContent.trim()
    stop = stop.split(' ');
  
  	//stop condition
  	if (!document.querySelector(last_page_selector)) {
      	//last page
		out["has_next_page"] = false;
	} else if(clickable_elem){
      	//go to next page
    	if(stop[3] == stop[6]){
        out["has_next_page"] = false;
      }else{
        clickable_elem.click();
      	out["has_next_page"] = true;
      }
    } else {
      	//try again
    	out["has_next_page"] = true;
    }

  	out.waitFor = "div.ftllist .ftlrow";
  	return out;
})();