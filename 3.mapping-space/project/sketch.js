// VARIABLES
var table;
var quakes;
var quake;
var hospitals;
var water;
var energy;
var mymap;

// DATA
let count;
let vulnerableHospitals; 

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
}

function setup() {
    color(RGB);
    // THIS IS THE SIDEBAR
    sidebar();

    // THIS IS THE MAP
    setupMap();
    
    // THIS IS THE COMPLETE DATA
    addQuake();
        let lowDepth = color(255,36,160);
        let highDepth = color(138, 0, 0);
          noLoop();

    // THIS IS THE FILTERED DATA
    // addFacility();
    findFacility();
}

function setupMap() { 
    mymap = L.map('quake-map').setView([36,-120], 6);
    L.mapbox.styleLayer('mapbox://styles/papermashea/ck3ny0odo61591cmn01hpbyqa', {
        zoomSnap: 0,
        zoomDelta: 22,
        accessToken: 'pk.eyJ1IjoicGFwZXJtYXNoZWEiLCJhIjoiY2szbnh6bGI4MXY1cjNjbjFkMnZvcjQ1ayJ9.MKO-bDpbg-5sZ2sIN8MJ5Q'
    }).addTo(mymap);

}

function sidebar() {
    // CREATE CANVAS
    let canvas = createCanvas(400, 800);
    canvas.parent('data'); 
    background('white');
    noStroke();

    // let description = createElement('span', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor');
    // description.parent('data');

    // ADD CANVAS ELEMENTS

    // let key = createElement('h2', 'Depth');
    // let info = createElement('h2', 'Vulnerable Facilities');
    //     let D = [title, description,key, info];
    //     for (let i =0; i < D.length; i ++) {
    //     D[i].parent('data');
    //     }

    // ADDING CANVAS INFORMATION
    //MAGNITUDE KEY
    let lowDepth, highDepth;
    fill(0,0,0)
    textSize(21)
    text(`Magnitude`, 40, 180)
    setGradient(40, 200, 200, 0, lowDepth, highDepth, 1)

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
        var quakeData = quakes.getRow(i)

        // SKIP ROWS WHERE DATA IS MISSING
        if (quakeData.get('depth')==''){
            continue
        }
        if (quakeData.get('latitude')==''){
            continue
        }
        if (quakeData.get('longitude')==''){
            continue
        }

        // QUAKE DOT
        var quake = L.circleMarker([quakeData.getNum('latitude'), quakeData.getNum('longitude')], {
            color: 'none',
            fillColor: depthColor, 
            fillOpacity: .5,  
            radius: quakeData.getNum('mag') * 8
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
        quake.bindPopup("Location: " + quakeData.getString('place') 
                        + "<br>Magnitude: " + quakeData.getNum('mag')  
                        + "<br>Depth: "+ quakeData.getNum('depth')) 
                        .addTo(mymap)
        // quake.on("click", function ()
    }
}

// function addHospital(){
//     for (var r=0; r<quakes.rows.length; r++){
//         var quakeSite = quakes.getRow(r);

//     // VULNERABLE HOSPITALS
//     for (var h=0; h<hospitals.getRowCount(); h++){
//         var hospital = hospitals.getRow(h);

//         // WITHIN 50KM
//         var disancetInKm = distanceFrom(quakeSite.getNum('latitude'), quakeSite.getNum('longitude'), hospital.getNum('latitude'), hospital.getNum('longitude'))
//         if (disancetInKm < 50){
//             return
// }

function findFacility(){
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
                color: 'black',
                weight: .8,
                opacity: .5
            }).addTo(mymap);

            // DRAW CIRCLE FOR LOCATION
            L.circleMarker([hospital.getNum('latitude'), hospital.getNum('longitude')], {
                weight: 0,
                fillColor:'orange',
                fillOpacity:.5,
                radius: 8
            }).bindTooltip(hospital.getString('NAME')).addTo(mymap);
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
                color: 'black',
                weight: .8,
                opacity: .5
            }).addTo(mymap);

            L.circleMarker([treatment.getNum('latitude'), treatment.getNum('longitude')], {
                weight:0,
                fillColor:'blue',
                fillOpacity:.5,
                radius: 8
            }).bindTooltip(treatment.getString('CWP_NAME')).addTo(mymap);
            }
        }    
    }
}        


function distanceFrom(srcLat, srcLng, dstLat, dstLng){
    return L.latLng(srcLat, srcLng).distanceTo(L.latLng(dstLat, dstLng)) / 1000 // in km
    }
