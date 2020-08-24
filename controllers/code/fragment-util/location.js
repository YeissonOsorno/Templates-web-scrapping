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
    if(state) {
        state = state.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
        array_loc.push(state);
    }    
    if(country) array_loc.push(country);

    if(array_loc.length) loc = array_loc.join(", ");

    return loc;  
}  