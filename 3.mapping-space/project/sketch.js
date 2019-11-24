// the data loaded from a USGS-provided CSV file
var table;
var magTable;
var hosTable;
var plaTable;
var watTable;

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

//leaflet.js map
var mymap;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/all_day.csv", "csv", "header");
    hosTable = loadTable("data/HospitalLocationsLg.csv", "csv", "header");    
    plaTable = loadTable("data/PlantLocations.csv", "csv", "header");
    watTable = loadTable("data/WastewaterLocations.csv", "csv", "header");
}

function setup() {
    
    // first, call our map initialization function (look in the html's style tag to set its dimensions)
    setupMap()

    // call our function (defined below) that populates the maps with markers based on the table contents
    addCircles();

//title
    fill(0)
    noStroke()
    textSize(16)
    text(`Plotting live earthquakes and critical facilities`, 20, 40)

// generate a p5 diagram that complements the map, communicating the earthquake data non-spatially
    let diagram = createCanvas(600, 400);
    diagram.parent('diagram');
    diagram.position(100,100);

    let txt = createDiv('This is an HTML string!');
    txt.position(50, 50);


}

function draw() {
  // These commands are applied to the graphics canvas as normal.
    background(220, 180, 200);
    ellipse(width/2, height/2, 100, 100);
    ellipse(width/4, height/2, 50, 50);
}

function setupMap() {
// colorMode(RGB);

// leafletmap
    mymap = L.map('quake-map').setView([50,-98], 3).setZoomAround([50,-98], 3);
    L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=d1b312dda4c7451a863575eb94938bc4 ', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 26,
        zoomSnap: 0,
        zoomDelta: 22,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(mymap);
}

function addCircles(){
// color for earthquake magnitude
  var magnitudeMin = 0.0;
  var magnitudeMax = columnMax(table, "mag")
  var magnitudes = columnValues(table, "mag")

  // define a color palette for magnitude
  let from = color('pink');
  let to = color('red');
  let magScale = map(magnitudes[i], magnitudeMin, magnitudeMax, .1, 1.0);
  var magColor = lerpColor(from, to, magScale);
    // }

// scale for earthquake magnitude
    for (var i=0; i<table.getRowCount(); i++){
        var row = table.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }

        // create a new dot
        var magCircle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: magColor,      // the dot stroke color
            fillColor: magColor, // the dot fill color
            fillOpacity: 1,  // use some transparency so we can see overlaps
            radius: row.getNum('mag') * 10000
        })


        // place the new dot on the map
        magCircle.addTo(mymap);
    }


// hospitals
    for (var i=0; i<hosTable.getRowCount(); i++){
        var row = hosTable.getRow(i)

        // skip over any rows where the latitude data is missing
        if (row.get('latitude')==''){
            continue
        }

        // skip over any rows where the longitude data is missing
        if (row.get('longitude')==''){
            continue
        }

        // create a new dot
        var hosCircle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'red',      // the dot stroke color
            fillColor: 'red', // the dot fill color
            fillOpacity: 0.25,  // use some transparency so we can see overlaps
            radius: 1
        })

        // place the new dot on the map
        hosCircle.addTo(mymap);
    }

// wastewater treatment
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
        var watCircle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'blue',      // the dot stroke color
            fillColor: 'blue', // the dot fill color
            fillOpacity: 0.25,  // use some transparency so we can see overlaps
            radius: 1
        })

        // place the new dot on the map
        watCircle.addTo(mymap);
    }


// energy plants
    for (var i=0; i<plaTable.getRowCount(); i++){
        var row = plaTable.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('latitude')==''){
            continue
        }

        // skip over any rows where the magnitude data is missing
        if (row.get('longitude')==''){
            continue
        }

        // create a new dot
        var plantCircle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'yellow',      // the dot stroke color
            fillColor: 'yellow', // the dot fill color
            fillOpacity: 0.25,  // use some transparency so we can see overlaps
            radius: 1
        })

        // place the new dot on the map
        plantCircle.addTo(mymap);
    }


}