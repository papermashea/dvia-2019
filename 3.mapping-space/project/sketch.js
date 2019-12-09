// VARIABLES
var table;
var quakes;
var quake;
var hospitals;
var water;
var energy;
var mymap;
let count;

//COL MIN AND MAX FOR MAG
// get the values of a given column as an array of numbers
function columnValues(tableObject, columnName){
  // get the array of strings in the specified column
  var colStrings = tableObject.getColumn(columnName)
  // convert to a list of numbers by running each element through the `float` function
  return _.map(colStrings, _.toNumber)
}

// get the maximum value within a column
function columnMax(tableObject, columnName){
    return _.max(columnValues(tableObject, columnName))
}

// get the minimum value within a column
function columnMin(tableObject, columnName){
    return _.min(columnValues(tableObject, columnName))
}

function preload() {
    // LOAD DATA
    quakes = loadTable("data/all_day.csv", "csv","header");
    hospitals = loadTable("data/HospitalLocations_trimmed.csv", "csv", "header");    
    water = loadTable("data/WastewaterLocations_trimmed.csv", "csv", "header");    
    energy = loadTable("data/PlantLocations_trimmed.csv", "csv", "header");

    // QUAKE COLOR SCALE
    lowMag = color(255,36,160);
    highMag = color(138, 0, 0);
      noLoop();

}

function setup() {
    color(RGB);
    // THIS IS THE SIDEBAR
    sidebar();

    // THIS IS THE MAP
    setupMap();
    
    // THIS IS THE COMPLETE DATA
    addQuake();
        lowDepth = color(255,36,160);
        highDepth = color(138, 0, 0);
          noLoop();

    // THIS IS THE FILTERED DATA
    addFacility();
}

function sidebar() {
    let canvas = createCanvas(300, 800);
    canvas.parent('data'); 
    background('black');
    noStroke();
}

function setupMap() { 
    mymap = L.map('quake-map').setView([36,-120], 6);
    L.mapbox.styleLayer('mapbox://styles/papermashea/ck3ny0odo61591cmn01hpbyqa', {
        zoomSnap: 0,
        zoomDelta: 22,
        accessToken: 'pk.eyJ1IjoicGFwZXJtYXNoZWEiLCJhIjoiY2szbnh6bGI4MXY1cjNjbjFkMnZvcjQ1ayJ9.MKO-bDpbg-5sZ2sIN8MJ5Q'
    }).addTo(mymap);

}

function setGradient (x, y, w, h, c1, c2, axis){
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let key = lerpColor(lowDeph, highDepth, inter);
      fill(key);
      rect(i, y, i, 40);
    }
}

function addQuake(){
//SHOWS EARTHQUAKE BY DEPTH AND MAGNITUDE
    for (var i=0; i<quakes.getRowCount(); i++){
        var row = quakes.getRow(i)

        // SKIP ROWS WHERE DATA IS MISSING
        if (row.get('depth')==''){
            continue
        }
        if (row.get('latitude')==''){
            continue
        }
        if (row.get('longitude')==''){
            continue
        }

        // QUAKE DOT
        var quake = L.circleMarker([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'none',
            fillColor: depthColor, 
            fillOpacity: .5,  
            radius: row.getNum('mag') * 8
        })

        // COLOR FOR DEPTH
          var depthMin = 0.0;
          var depthMax = columnMax(quakes, "depth")
          var depth = columnValues(quakes, "depth")

        // COLOR PALETTE FOR DEPTH
          let from = color(255,36,160);
          let to = color(138, 0, 0);
          let depthScale = map(depth[i], depthMin, depthMax, .1, 1.0);
          var depthColor = lerpColor(from, to, depthScale);

    // ADDING QUAKE WITH DEPTH AND MAGNITUDE
        quake.addTo(mymap)
    }
}

function addFacility(){
    for (var r=0; r<quakes.rows.length; r++){
        var quakeSite = quakes.getRow(r);

    // VULNERABLE HOSPITALS
    for (var h=0; h<hospitals.getRowCount(); h++){
        var hospital = hospitals.getRow(h);

        // WITHIN 50KM
        var disancetInKm = distanceFrom(quakeSite.getNum('latitude'), quakeSite.getNum('longitude'), hospital.getNum('latitude'), hospital.getNum('longitude'))
        if (disancetInKm < 50){
            
            // DRAW LINE FOR DISTANCE
            var latlngs = [
                [hospital.getNum('latitude'), hospital.getNum('longitude')],
                [quakeSite.getNum('latitude'), quakeSite.getNum('longitude')] 
            ]

            L.polyline(latlngs, {
                stroke: 'orange',
                strokeweight: .5,
                opacity: .5
            }).addTo(mymap);

            // DRAW CIRCLE FOR LOCATION
            L.circleMarker([hospital.getNum('latitude'), hospital.getNum('longitude')], {
                weight:0,
                fillColor:'orange',
                fillOpacity:.5,
                radius: 8
            }).bindTooltip(hospital.getString('NAME')).addTo(mymap)
            }
        }

    // VULNERABLE WATER TREATMENT CENTERS
    for (var t=0; t<water.getRowCount(); t++){
        var treatment = water.getRow(t);

        // WITHIN 50KM
        var disancetInKm = distanceFrom(quakeSite.getNum('latitude'), quakeSite.getNum('longitude'), treatment.getNum('latitude'), treatment.getNum('longitude'))
        if (disancetInKm < 50){

            // DRAW LINE FOR DISTANCE
            var latlngs = [
                [treatment.getNum('latitude'), treatment.getNum('longitude')],
                [quakeSite.getNum('latitude'), quakeSite.getNum('longitude')] 
            ]

            L.polyline(latlngs, {
                stroke: 'blue',
                strokeweight: .5,
                opacity: .5
            }).addTo(mymap);

            L.circleMarker([treatment.getNum('latitude'), treatment.getNum('longitude')], {
                weight:0,
                fillColor:'blue',
                fillOpacity:.5,
                radius: 8
            }).bindTooltip(treatment.getString('CWP_NAME')).addTo(mymap)
            }
        }    

    // VULNERABLE ENERGY PLANTS
    // for (var p=0; p<energy.getRowCount(); p++){
    //     var plant = energy.getRow(p);
    //     // skip over any rows where the latitude data is missing
    //     if (energy.get('latitude')==''){
    //         continue
    //     }

    //     // skip over any rows where the longitude data is missing
    //     if (plant.get('longitude')==''){
    //         continue
    //     }
    //     // WITHIN 50KM
    //     var disancetInKm = distanceFrom(quakeSite.getNum('latitude'), quakeSite.getNum('longitude'), plant.getNum('latitude'), plant.getNum('longitude'))
    //     if (disancetInKm < 20){
    //         L.circleMarker([treatment.getNum('latitude'), plant.getNum('longitude')], {
    //             weight:0,
    //             fillColor:'yellow',
    //             fillOpacity:.5,
    //             radius: 8
    //         }).bindTooltip(plant.getString('name')).addTo(mymap)
    //         }
    //     }    

    }
}        

function distanceFrom(srcLat, srcLng, dstLat, dstLng){
    return L.latLng(srcLat, srcLng).distanceTo(L.latLng(dstLat, dstLng)) / 1000 // in km
    }
