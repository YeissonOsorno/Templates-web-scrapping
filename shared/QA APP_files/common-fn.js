async function doAjax(url) {
    return new Promise((resolve, reject) => {
        var response;   
        var http   =  new XMLHttpRequest();
        // var url    =  "http://192.99.35.171/reports/all_applications.php";

        http.open("POST", url, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = function() {

            if(http.readyState == 4 && http.status == 200) {
                response = JSON.parse( http.responseText );
                console.log("JSON RESPONSE");
                console.log(response);
                resolve(response);
            }
        }
        http.send();   
        //reject(err);
    });
    
}


// displays and hides the nav menu when the click is done
    
function toggle_nav_menu(e){
    id = e.target.getAttribute("id"); 
    if(id != "nav-menu-label" && id != "nav-menu-span") return false;
    var menu = document.getElementById("nav-menu");
    var state = document.getElementById("menu-x1").checked;
    var nav_span = document.getElementById("nav-menu-span");
    if(!state){
        menu.classList.remove("nav-menu-collapsed");
        menu.classList.add("nav-menu-expanded");
        nav_span.classList.add("active-span");

    }else{
        menu.classList.remove("nav-menu-expanded");
        menu.classList.add("nav-menu-collapsed");
        nav_span.classList.remove("active-span");
    }
}
