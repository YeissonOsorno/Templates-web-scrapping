/* bestGeo way 1 -- This way accept 2 parameters: 
* First --> object of list to compare value
* Second --> Location extracted
*/
function bestGeo(locationsObject,word_location){    
    let output ="";
    Object.keys(locationsObject).forEach(function(value,index){        
        word_location = word_location.replace(/\-/g,' ').replace(/\//g,' ').replace('.',' ').toLowerCase().trim();             
        if(value.includes('_')) value = value.replace('_',' ').trim();                         
        if(word_location.indexOf(value)>-1) output = Object.values(locationsObject)[index];
    });   
    return output;
}


// bestGeo way 2 -- This way accept only location extract
function bestGeo(word_location){
    let locationsObject = {
        los_angeles:"Los Angeles, California, US", san_francisco:"San Francisco, California, US", sacramento:"Sacramento, California, US",san_jose:"San Jose,California,US",
        fresno:"Fresno,California,US",oakland:"Oakland,california",long_beach:"Long Beach,California,US",bakersfield:"Bakersfield,California,US",riverside:"Riverside,California,US",
        anaheim:"Anaheim,California,US",irvine:"Irvine,California,US",santa_barbara:"Santa Barbara,California,US",stockton:"Stockton,California,US",pasadena:"Pasadena,California,US",
        santa_monica:"Santa Monica,California,US",palm_springs:"Palm Springs,California,US",monterrey:"Monterrey,California,US",modesto:"Modesto,California,US",san_bernardino:"San Bernardino,California,US",
        beverly_hills:"Beverly Hills,California,US",santa_rosa:"Santa Rosa,California,US",santa_ana:"Santa Ana,California,US",santa_cruz:"Santa Cruz,California,US",freemont:"Freemont,California,US",
        oxnard:"Oxnard,California,US",pomona:"Pomona,California,US",huntintong_beach:"Huntintong Beach,California,US",malibu:"Malibu,California,US",ventura:"Ventura,California,US",burbank:"Burbank,California,US",
        california_city:"California City,California,US",santa_clara:"Santa Clara,California,US",newport_beach:"Newport Beach,California,US",carlsbad:"Carlsbad,California,US",Oceanside:"Oceanside,California,US",
        temecula:"Temecula,California,US",san_luis:"San Luis,California,US",sunny_vale:"Sunny Vale,California,US",Compton:"Compton,California,US",carmel_by_the_sea:"Carmel-by-the-Sea,California,US",
        san_mateo:"San Mateo,California,US",Laguna_beach:"Laguna Beach,California,US",calabasas:"Calabasas,California,US",cupertino:"Cupertino,California,US",menlo_park:"Menlo Park,California,US",
        pismo_beach:"Pismo Beach,California,US",solvang:"Solvang,California,US",ridgecrest:"Ridgecrest,California,US",la_verne:"La Verne,California,US",mountain_view:"Mountain View,California,US",
        foster_city:"Foster City,California,US"
    }
    let output ="";
    Object.keys(locationsObject).forEach(function(value,index){        
        word_location = word_location.replace(/\-/g,' ').replace(/\//g,' ').replace('.',' ').toLowerCase().trim();             
        if(value.includes('_')) value = value.replace('_',' ').trim();                         
        if(word_location.indexOf(value)>-1) output = Object.values(locationsObject)[index];
    });   
    return output;
}