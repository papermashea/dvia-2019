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

// my leaflet.js map
var mymap;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/all_day.csv", "csv", "header");
//    hosTable = loadTable("data/HospitalLocationsLg.csv", "csv", "header");    
    // plaTable = loadTable("data/PlantLocations.csv", "csv", "header");
}

function setup() {
  colorMode(RGB);

// leafletmap
    mymap = L.map('quake-map').setView([50,-98], 3).setZoomAround([50,-98], 3);
    L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=d1b312dda4c7451a863575eb94938bc4 ', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(mymap);

// color for earthquake magnitude
  var magnitudeMin = 0.0;
  var magnitudeMax = columnMax(table, "mag")

  var depthMin = 0.0;
  var depthMax = columnMax(table, "depth")

  // get the two arrays of interest: depth and magnitude
  // then cycle through the parallel arrays
  var depths = columnValues(table, "depth")
  var magnitudes = columnValues(table, "mag")
  for(var i=0; i<depths.length; i++){

  // define a color palette for magnitude
  let from = color(255,36,160);
  let to = color(138, 0, 0);
  let magScale = map(magnitudes[i], magnitudeMin, magnitudeMax, .1, 1.0);
  let magColor = lerpColor(from, to, magScale);
    }

// scale for earthquake magnitude
    for (var i=0; i<table.getRowCount(); i++){
        var row = table.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }

        // create a new dot
        var magCircle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            fill: 'red',
            radius: row.getNum(1) * 10
        })


        // place the new dot on the map
        magCircle.addTo(mymap);
    }


// hospitals
    // for (var i=0; i<hosTable.getRowCount(); i++){
    //     var row = hosTable.getRow(i)

    //     // skip over any rows where the magnitude data is missing
    //     if (row.get('latitude')==''){
    //         continue
    //     }

    //     // skip over any rows where the magnitude data is missing
    //     if (row.get('longitude')==''){
    //         continue
    //     }

    //     // create a new dot
    //     var hosCircle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
    //         color: 'yellow',      // the dot stroke color
    //         fillColor: 'yellow', // the dot fill color
    //         fillOpacity: 0.25,  // use some transparency so we can see overlaps
    //         radius: 5
    //     })

    //     // place the new dot on the map
    //     hosCircle.addTo(mymap);
    // }

// energy plants
    // for (var i=0; i<plaTable.getRowCount(); i++){
    //     var row = plaTable.getRow(i)

    //     // skip over any rows where the magnitude data is missing
    //     if (row.get('latitude')==''){
    //         continue
    //     }

    //     // skip over any rows where the magnitude data is missing
    //     if (row.get('longitude')==''){
    //         continue
    //     }

    //     // create a new dot
    //     var plantSquare = L.square([row.getNum('latitude'), row.getNum('longitude')], {
    //         color: 'orange',      // the dot stroke color
    //         fillColor: 'orange  ', // the dot fill color
    //         fillOpacity: 0.25,  // use some transparency so we can see overlaps
    //         radius: 5
    //     })

    //     // place the new dot on the map
    //     plantSquare.addTo(mymap);
    // }


}