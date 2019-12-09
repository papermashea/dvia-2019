// the data loaded from a USGS-provided CSV file
var quakes
var hospitals

var map

function preload() {
    // load the CSV data into our `quakes` variable and clip out the header row
    quakes = loadTable("data/significant_month.csv", "csv", "header")
    hospitals = loadTable("data/HospitalLocationsGeneral.csv", "csv", "header")
}

function setup() {
    // first, create a leaflet map (look in the html's style tag to set its dimensions)
    map = L.map('quake-map', {worldCopyJump: true}).setView([34.2761667, -119.2936667], 9)

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA',
    }).addTo(map);

    // start by picking one row from the USGS csv that's in the states...
    var quake = quakes.getRow(8)
    
    // ...and adding it to the map as a big orange dot
    L.circleMarker([quake.getNum('latitude'), quake.getNum('longitude')], {
        weight:0,
        fillColor:'#FA6200',
        fillOpacity:1,
        radius:10
    }).bindTooltip(quake.getString('place')).addTo(map)

    // now step through all the rows in the General Hospital csv... 
    for (var r=0; r<hospitals.getRowCount(); r++){
        var hospital = hospitals.getRow(r)
        
        // ...and if it's within a given radius of the quake, add it to the map as a small blue dot
        var disancetInKm = distanceFrom(quake.getNum('latitude'), quake.getNum('longitude'), hospital.getNum('latitude'), hospital.getNum('longitude'))
        if (disancetInKm < 66){
            L.circleMarker([hospital.getNum('latitude'), hospital.getNum('longitude')], {
                weight:0,
                fillColor:'red',
                fillOpacity:1,
                radius:4
            }).bindTooltip(hospital.getString('NAME')).addTo(map)
        }
    }


}


function distanceFrom(srcLat, srcLng, dstLat, dstLng){
    return L.latLng(srcLat, srcLng).distanceTo(L.latLng(dstLat, dstLng)) / 1000 // in km
}