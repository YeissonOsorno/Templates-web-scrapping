(function(){
    var out = {};
    var jobs = document.querySelectorAll("div.jscroll-inner  > div  h4 a").length;
 
    if (typeof pass_it == "undefined") pass_it = {};
    if (typeof msg == "undefined") msg = function (x) { return x; };
 
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
 
    msg("=====> " + jobs);
    msg("=====> " + out["pass_it"]["cont"]);
 
    if(out["pass_it"]["cont"] == jobs){
      out["has_next_page"] = false;
    }else {
      window.scroll({
        top: 999999
      })
      out["has_next_page"] = true;
 
    }
    out["pass_it"]["cont"] = jobs;
 
    out["wait"]=true;
    return out;
  })();



