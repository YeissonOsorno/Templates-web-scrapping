(function(){
    var out = {};
    var button_more = 'div.xxxlutzkarrierecenter-jobsView__outerLoadMore button.xxxlutzkarrierecenter-jobsView__loadMore';  //SELECTOR DE VER MAS JOBS
    
    //msg(pass_it);
    if(!pass_it["heights"])	out["pass_it"] = {"heights":[]};
    else 					out["pass_it"] = pass_it;
    
    out["has_next_page"] = true;
    if(out["pass_it"]["heights"].length > 3){
       var last_three_heights = out["pass_it"]["heights"].slice(out["pass_it"]["heights"].length - 3); 
    
    var max = document.querySelector('span[class="totalValue"]').textContent;
    var contando =  document.querySelectorAll('div[class="xxxlutzkarrierecenter-kwfViewAjaxItem"]').length;
    if(parseInt(contando) < parseInt(max)) {
    //last page
    msg(contando);
    out["has_next_page"] = true;}
    else {
      out["has_next_page"] = false;
    }
    /*if(last_three_heights[0] == last_three_heights[1] && last_three_heights[1] == last_three_heights[2])
        out["has_next_page"] = false;*/
      
   
  }
if (document.querySelectorAll(button_more).length == 1)
  document.querySelector(button_more).click();
//	out.waitFor="div.xxxlutzkarrierecenter-jobsView__viewContainer div.xxxlutzkarrierecenter-kwfViewAjaxItem";
    out["wait"] = true;
    out["pass_it"]["heights"].push(document.body.scrollHeight);
    return out;
})();
