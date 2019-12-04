// the data loaded from a USGS-provided CSV file
var table;
var quakes;
var magTable;
var hosTable;
var plaTable;
var watTable;
var mymap;
let lowMag, highMag;


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
    //fonts
    //font = loadFont("design/futuralight.ttf");
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/all_day.csv", "csv", "header");
    quakes = loadTable("data/significant_month.csv", "csv","header");
    hosTable = loadTable("data/HospitalLocations_trimmed.csv", "csv", "header");    
    watTable = loadTable("data/WastewaterLocations_trimmed.csv", "csv", "header");
    plaTable = loadTable("data/PlantLocations_trimmed.csv", "csv", "header");

}

function setup() {
    colorMode(RGB);
    setupMap();
    addQuakes();
    addHospitals();
    addvulnerableFacilities();
    addWater();
    addPlants();
    lowMag = color(255,36,160);
    highMag = color(138, 0, 0);
      noLoop();
}

function draw() {
  // These commands are applied to the graphics canvas as normal.
    createCanvas(300, 800);
    background(999);
    noStroke();

    //mag key
    fill(0,0,0);
    textSize(21);
    text(`Magnitude`, 40, 180)
    setGradient(40, 200, 200, 0, lowMag, highMag, 1);

    fill(0,0,0);
    textSize(16);
    text('1', 40, 260)
    text('8', 280, 260)

    //weekly vulnerable facilities
    fill(0,0,0);
    textSize(21);
    text(`Weekly Vulnerable Facilities`, 40, 320)

    fill(0,0,0);
    textSize(16);
    text('Hospitals', 40, 360)
    text('Water Treatment', 40, 380)
    text('Energy Plants', 40, 400)

    //yearly vulnerable facilities
    fill(0,0,0);
    textSize(21);
    text(`Yearly Vulnerable Facilities`, 40, 520)

    fill(0,0,0);
    textSize(16);
    text('January', 40, 560);
    text('February', 40, 580);
    text('March', 40, 600);


    //showing different data checkboxes
        // var hosBox = document.createElement("INPUT");
        // hosBox.setAttribute("type", "checkbox");
        // document.body.appendChild(hosBox);
        // fill(0,0,0);
        // text('Hospitals', 40, 20);

        // var watBox = document.createElement("INPUT");
        // watBox.setAttribute("type", "checkbox");
        // document.body.appendChild(watBox);
        // fill(0,0,0);
        // text('Water treatment', 40, 40);

        // var plaBox = document.createElement("INPUT");
        // plaBox.setAttribute("type", "checkbox");
        // document.body.appendChild(plaBox);
        // fill(0,0,0);
        // text('Energy plants', 40, 60);

}

function setGradient (x, y, w, h, c1, c2, axis){
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let key = lerpColor(lowMag, highMag, inter);
      fill(key);
      rect(i, y, i, 40);
    }
}

function setupMap() { 
    // leafletmap
    mymap = L.map('quake-map').setView([36,-120], 6);
    L.mapbox.styleLayer('mapbox://styles/papermashea/ck3ny0odo61591cmn01hpbyqa', {
        zoomSnap: 0,
        zoomDelta: 22,
        accessToken: 'pk.eyJ1IjoicGFwZXJtYXNoZWEiLCJhIjoiY2szbnh6bGI4MXY1cjNjbjFkMnZvcjQ1ayJ9.MKO-bDpbg-5sZ2sIN8MJ5Q'
    }).addTo(mymap);

}

function addQuakes(){
//dots for earthquakes
    for (var i=0; i<table.getRowCount(); i++){
        var row = table.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }

        // skip over any rows where the latitude data is missing
        if (row.get('latitude')==''){
            continue
        }

        // skip over any rows where the longitude data is missing
        if (row.get('longitude')==''){
            continue
        }

        // create a new dot
        var magCircle = L.circleMarker([row.getNum('latitude'), row.getNum('longitude')], {
            color: magColor,      // the dot stroke color
            fill: magColor, // the dot fill color
            fillOpacity: 1,  // use some transparency so we can see overlaps
            radius: row.getNum('mag') 
        })

    // color for earthquake magnitude
      var magnitudeMin = 0.0;
      var magnitudeMax = columnMax(table, "mag")
      var magnitudes = columnValues(table, "mag")

    // define a color palette for magnitude
      let from = color(255,36,160);
      let to = color(138, 0, 0);
      let magScale = map(magnitudes[i], magnitudeMin, magnitudeMax, .1, 1.0);
      var magColor = lerpColor(from, to, magScale);

    // place the new dot on the map
        magCircle.addTo(mymap);
    }
}

function addvulnerableFacilities(){
        var quake = quakes.getRow(8)
        
        // test quakedot
        L.circleMarker([quake.getNum('latitude'), quake.getNum('longitude')], {
            weight:0,
            fillColor:'black',
            fillOpacity:1,
            radius:10
        }).addTo(mymap)

        // vulnerable hospitals 
        for (var r=0; r<hosTable.getRowCount(); r++){
            var hospital = hosTable.getRow(r)
            
            // within 50 km
            var disancetInKm = distanceFrom(quake.getNum('latitude'), quake.getNum('longitude'), hospital.getNum('latitude'), hospital.getNum('longitude'))
            if (disancetInKm < 50){
                L.circleMarker([hospital.getNum('latitude'), hospital.getNum('longitude')], {
                    weight:0,
                    fillColor:'red',
                    fillOpacity:1,
                    radius:4
                }).addTo(mymap)
            }
        }

        // vulnerable water treatment facilities 
        for (var r=0; r<watTable.getRowCount(); r++){
            var treatment = watTable.getRow(r)
            
            // within 50 km
            var disancetInKm = distanceFrom(quake.getNum('latitude'), quake.getNum('longitude'), treatment.getNum('latitude'), treatment.getNum('longitude'))
            if (disancetInKm < 50){
                L.circleMarker([treatment.getNum('latitude'), treatment.getNum('longitude')], {
                    weight:0,
                    fillColor:'blue',
                    fillOpacity:1,
                    radius:4
                }).addTo(mymap)
            }
        }  

        // vulnerable energy plants 
        for (var r=0; r<plaTable.getRowCount(); r++){
            var plant = plaTable.getRow(r)
            
            // within 50 km
            var disancetInKm = distanceFrom(quake.getNum('latitude'), quake.getNum('longitude'), plant.getNum('latitude'), plant.getNum('longitude'))
            if (disancetInKm < 50){
                L.circleMarker([plant.getNum('latitude'), plant.getNum('longitude')], {
                    weight:0,
                    fillColor:'yellow',
                    fillOpacity:1,
                    radius:4
                }).addTo(mymap)
            }
        }  
    }


function addHospitals(){
//    hospitals circles
    for (var i=0; i<hosTable.getRowCount(); i++){
        var row = hosTable.getRow(i)

        // skip over any rows where the latitude data is missing
        if (row.get('latitude')==''){
            continue}

        // skip over any rows where the longitude data is missing
        if (row.get('longitude')==''){
            continue}

        // create a new dot if within 66km
        var hosCircle = L.circleMarker([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'orange',      // the dot stroke color
            fillColor: 'orange', // the dot fill color
            radius: 1
        })    

        //place all hopsitals on the map    
        var hosCheckBox = document.getElementById("hosBox");
        if (hosCheckBox.checked == true){
        hosCircle.addTo(mymap);
      } else {
        hosCircle.removeFrom(mymap);
      }
    }
}

//console.log(addvulnerableHospitals(hopsital));

function addWater(){
    //wastewater treatment
    for (var i=0; i<watTable.getRowCount(); i++){
        var row = watTable.getRow(i)

        // skip over any rows where the latitude data is missing
        if (row.get('latitude')==''){
            continue
        }

        // skip over any rows where the longitude data is missing
        if (row.get('longitude')==''){
            continue
        }

        // create a new dot
        // var disancetInKm = distanceFrom(table.getNum('latitude'), table.getNum('longitude'),watTable.getNum('latitude'), watTable.getNum('longitude'))
        // if (disancetInKm < 1000){
        var watCircle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'blue',      // the dot stroke color
            fillColor: 'blue', // the dot fill color
            fillOpacity: 0.25,  // use some transparency so we can see overlaps
            radius: 1
        })

        // place all water treatment facillities on the map
        var watCheckBox = document.getElementById("watBox");
        if (watCheckBox.checked == true){
        watCircle.addTo(mymap);
      } else {
        watCircle.removeFrom(mymap);
      }
        }
    }

    // function addPlants(){
    // //energy plants
    // for (var i=0; i<plaTable.getRowCount(); i++){
    //     var row = plaTable.getRow(i)

    //     // skip over any rows where the latitude data is missing
    //     if (row.get('latitude')==''){
    //         continue
    //     }

    //     // skip over any rows where the longitude data is missing
    //     if (row.get('longitude')==''){
    //         continue
    //     }

    //     // create a new dot
    //     var plaCircle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
    //         color: 'yellow',      // the dot stroke color
    //         fillColor: 'yellow', // the dot fill color
    //         fillOpacity: 0.25,  // use some transparency so we can see overlaps
    //         radius: 1
    //     })

    //     // place all energy plants on the map
    //     var plaCheckBox = document.getElementById("plaBox");
    //     if (plaCheckBox.checked == true){
    //     plaCircle.addTo(mymap);
    //   } else {
    //     plaCircle.removeFrom(mymap);
    //   }
    // }

    // }

function distanceFrom(srcLat, srcLng, dstLat, dstLng){
    return L.latLng(srcLat, srcLng).distanceTo(L.latLng(dstLat, dstLng)) / 1000 // in km
}