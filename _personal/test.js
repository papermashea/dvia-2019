//-------------------------------------------------------------//
//                  Variables Declaration                      //
//-------------------------------------------------------------//
// Data loaded from USGS-provided files
let table;
let quake_data_json; 
let quakes;
let CA_quakes; //array containing CA quakes only

// California City data
let CA_cities_json;
let Ten_Largest_CA_Cities = [];
// leaflet.js map
let mymap;
// YEAR Totals from the table
let CA_Total, CA_Earthquake, CA_Blast ;
// minimum and maximum values for data and time
let magnitudeMin, magnitudeMax;
let timeMin, timeMax;
// Color for magnitude
let magScale; //Reference on chroma.js - https://swizec.com/blog/make-things-pretty-chroma-js/swizec/8233
let minMag, maxMag;

let heightD1, heightD2, heightD3, heightD4;

// http://www.joemckaystudio.com/multisketches/

//-------------------------------------------------------------//
//                      P5 - Preload                           //
//-------------------------------------------------------------//
function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("../data/2018/all_month.csv", "csv", "header");
    quake_data_json = loadJSON('../data/all_month.geojson')
    CA_cities_json = loadJSON("../data/additional/CA_cities.json");//Source: http://catalog.civicdashboards.com/dataset/california-cities-polygon/resource/4d58b8e8-a067-4285-ae4b-136faf8d7f06
}


//-------------------------------------------------------------//
//                      P5 - Setup                             //
//-------------------------------------------------------------//
function setup() {
    // 10 most populated cities in LA: https://en.wikipedia.org/wiki/List_of_largest_California_cities_by_population
    Ten_Largest_CA_Cities = [   "Los Angeles, CA", 
                                "San Diego, CA", 
                                "San Jose, CA", 
                                "San Francisco, CA", 
                                "Fresno, CA", 
                                "Sacramento, CA", 
                                "Long Beach, CA",
                                "Oakland, CA",
                                "Bakersfield, CA",
                                "Anaheim, CA"
                            ]
    // Quake Array                        
    quakes = unpackJSON(quake_data_json, '-mag');
    // console.log(quakes);
    // create a color scale we can use for assigning colors based on magnitude
    // magScale = chroma.scale('YlOrRd').mode('lch').domain([0, 10]) // chroma.scale(['navy', 'yellow'])
    minMag = minValue(quakes, 'mag');
    maxMag = maxValue(quakes, 'mag');
    magScale = chroma.scale(['yellow', 'navy']).mode('lch').domain([minMag, maxMag]) //How does this work ?? 
    
    //Leaflet Map
    setupMap(); // call our map initialization function
    showEarthQuakes_JSON(); // Display CA Earthquake data
    add_10_CA_Cities(); // Add 10 largest cities of CA 

    //Intro TEXT
    introDescription(); // Basic Desriptive Stat on Top

    //Content Area
    let canvas = createCanvas(1000, 2500); // generate a p5 diagram that complements the map, communicating the earthquake data non-spatially
    canvas.parent('sketch-content'); // Move the canvas so it’s inside our <div id="sketch-intro">.
    background('#ffffff'); //#ffce54
    fill(0);
    noStroke(); 

    displayMag();
    displayTypes();
}


//-------------------------------------------------------------//
//                  Display Description                        //
//-------------------------------------------------------------//
function introDescription() {
    let t1, t2, t3, t4;
    console.log ("California Data only");
    t1 = createElement('span', 'In 2019, <br>');
    t2 = createElement('span', 'there have been ');
    t3 = createElement('span', CA_Total ); // RECEIVE VALUE FROM showEarthquakes;
    t4 = createElement('span',' seismic events in the state of California.'); 
    let T = [t1, t2, t3, t4];
    for (let i =0; i < T.length; i ++) {
      T[i].parent('intro');
      T[i].class('large');
    }
    t3.class('emphasize');
}


function displayMag() {
    // Show inside the canvas
    let t1, t2, t3, t4, t5;
    let myXPos = 25;
     textSize(20);
     textFont("Bebas Neue");
     fill('#777')
     textAlign(LEFT);
      text('Magnitude ranges from ' + minValue(CA_quakes, 'mag') + ' and ' + maxValue(CA_quakes, 'mag') + '.', myXPos, 50 );  
      text('Following are the 20 earthquakes with the highest magnitude of the year.', myXPos, 70);
    //Show Stats in Rectangles; 
     rect();
    //Show INFO in words;
    push();
    translate(myXPos,110);
    sortQuakes(CA_quakes, 'mag');
    console.log(CA_quakes);

    for (let i=0; i < 20; i++){ //CA_quakes.length
        let quake = CA_quakes[i];
        // draw a dot for the magnitude
        noStroke();
        let myC = magScale(quake.mag).hex();
        //myC.setAlpha (0.4*255);
        fill(myC);
        circle(10,0, quake.mag * 4);
        textSize(15);
        // magnitude
        noStroke();
        fill(200)
        textAlign(LEFT);
        textStyle(NORMAL)
        text(quake.mag, 45, 4)
        //latitude
        noStroke();
        fill(200)
        textAlign(LEFT);
        textStyle(NORMAL)
        text(quake.latitude, 110, 4)       
        //longtitude
        noStroke();
        fill(200)
        textAlign(LEFT);
        textStyle(NORMAL)
        text(quake.longitude, 210, 4)   
        //place
        noStroke();
        fill(200)
        textAlign(LEFT);
        textStyle(NORMAL)
        text(quake.place, 320, 4) 

    // use translate to change position before looping to draw the next quake
    var maxRows = 25
    if ((i+1)%maxRows==0){
      // new column
      resetMatrix();
      translate(50 + 350*ceil(i/maxRows),100);
    }else{
      // move to next row
      translate(0, 20)
    }
    
  }
  pop();


}

function displayTypes() {
    // let stat1 = createP('Among those, ' + CA_Earthquake + ' were naturally occurred earthquakes.' + '   ' +CA_Blast + ' were man-made events (quarry blasts).'); 
    // stat1.parent('content1');
    // Show inside the canvas
    push();
    translate(25, 450);
     textSize(20);
     textAlign('LEFT');
     text(CA_Earthquake + ' were naturally occurred earthquakes' + ' and ' + CA_Blast + ' were man-made events (quarry blasts).', 0, 100);  
    //Show Stat 
    rect();  
    pop();
}

//-------------------------------------------------------------//
//                         Set Up Map                          //
//-------------------------------------------------------------//
function setupMap(){
    // LEAFLET CODE  - "L" means the leaflet - L.map('mapid') or L.circle([lat, long]) 
    mymap = L.map('quake-map', {
        center: [37.08195496473745, -121.81099891662599], // mymap.getCenter() -> Will return the current center of the moved map
        zoom: 6 //Zoom level - Only integer
    });
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    }).addTo(mymap);
    mymap.addControl(new L.Control.Fullscreen()); //Add fullscreen control to an existing map:    
    //Find out where you are 
    mymap.on('click', onClick);
    function onClick(loc) {
        console.log("The clicked location is " + loc.latlng);
    }
    //*** Info & Legend: Reference: https://leafletjs.com/examples/choropleth/
    //Basic Info 
    let info = L.control();
    info.onAdd = function (mymap) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };
    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>Seismic Effects in California, 2019</h4>';
    };
    info.addTo(mymap);

    //legend - Magnitude
    let legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (mymap) {
        let legendDiv = L.DomUtil.create('div', 'info legend'),
            grades = [-1, 0, 1, 2, 3, 4, 5], //Magnitude levels;
            labels = [];
        // loop through our magnitudes and generate a label with a colored circle for each interval
        legendDiv.innerHTML = "Magnitude"+ '<br><br>';
        for (let i = 0; i < grades.length; i++) {
         legendDiv.innerHTML +=
                '<i style="background:' + magScale(grades[i]).hex() + '"></i> ' +
                grades[i] + '<br>';
        }
        return legendDiv;
    };
    legend.addTo(mymap);

}



//-------------------------------------------------------------//
//               Show Earthquakes on the Map                   //
//-------------------------------------------------------------//
function showEarthQuakes_JSON() {
    CA_Total = 0;
    CA_Earthquake = 0;
    CA_Blast = 0;
    CA_quakes = [];
      for (let i = 0; i < quakes.length; i++){
        let quake = quakes[i];
        if (quake.place.includes(", CA") == true) { 
            console.log("It's california");
             CA_Total ++;
             CA_quakes.push(quake);
                // Color to use
                let myC = magScale(quake.mag).hex();
                // Create a new circle on Leaflet
                let circle = L.circle([quake.latitude, quake.longitude], { //Location
                    color: 'none',      // the stroke color  - NONE
                    fill: magScale(quake.mag).hex(), // the fill color //#ffce54 //#f6bb42 //SunFlower color
                    fillOpacity: 0.4,  // use some transparency so we can see overlaps
                    radius: quake.mag * 7000
                })
                // Show the new earthquake on the map               
                    circle.addTo(mymap);
                    circle.on('click', onClick);
                    //myCity.bindPopup(myText + ' : '+ loc.latlng);
                    function onClick(loc) {
                        circle.bindPopup(
                              "Latitude: " + quake.latitude 
                            + "<br>Longitude: " + quake.longitude 
                            + "<br>Magnitude: " + quake.mag 
                            + "<br>Depth: "+ quake.depth);
                    }
                // Differentiate the type of the seimic event
                if (quake.type === "earthquake") { 
                   CA_Earthquake ++; 
                } else if (quake.type === "quarry blast") {
                   CA_Blast ++;
                }
         }
    }
   // console.log(CA_quakes);
}


//-------------------------------------------------------------//
//              Add 10 Biggest CA Cities (Polygon)             //
//-------------------------------------------------------------//
function add_10_CA_Cities() {
    //Show the 10 Largest Cities in CA;
    for (let i = 0; i< CA_cities_json.features.length; i++) {
        for (let j = 0; j < Ten_Largest_CA_Cities.length; j++) {
            if (CA_cities_json.features[i].properties.name === Ten_Largest_CA_Cities[j]) {
                //How to Add geoJson on leaflet: https://leafletjs.com/examples/geojson/
                let myCityPolyLines = {
                    "type": "MultiPolygon",
                    "coordinates": CA_cities_json.features[i].geometry.coordinates 
                }
                //List of distinctive color
                let cityColorArr = ['#e6194B', '#f58231', '#ffe119', '#bfef45', 
                                    '#3cb44b', '#42d4f4', '#4363d8', '#911eb4',
                                    '#f032e6', '#e6beff' ];
                function cityStyle(j) {
                            return {
                                fillColor: cityColorArr[j],
                                weight: 1,
                                opacity: 1,
                                color: cityColorArr[j],
                                //dashArray: '3',
                                fillOpacity: 0.9
                            };
                }
                //
                let myCity = L.geoJSON(myCityPolyLines, {
                    style: cityStyle(j)
                })
                let myText = CA_cities_json.features[i].properties.name;
                //
                myCity.addTo(mymap);
                myCity.on('click', onClick);
                //myCity.bindPopup(myText + ' : '+ loc.latlng);
                function onClick(loc) {
                    myCity.bindPopup(myText + ' : '+ loc.latlng)
                   // console.log("my city location is " + loc.latlng);
                }
                console.log("My city is " + Ten_Largest_CA_Cities[j]);
                }
            }
        }    
}


//-------------------------------------------------------------//
//                   Removes all CIRCLES                       //
//-------------------------------------------------------------//
function removeAllCircles(){
    //Removes any circles that have been added to the map 
    mymap.eachLayer(function(layer){
        if (layer instanceof L.Circle){
            mymap.removeLayer(layer)
        }
    })
}


//-------------------------------------------------------------//
//     unpackJSON  -  GeoJson into Array of Quake Objects      //
//-------------------------------------------------------------//
function unpackJSON(feed, sortAttr){
  // Converts the USGS's geojson feed into an array of quake objects and optionally sorts them 
  // based on the specified attribute name (if present)
  //
  // Each object in the list contains the following attributes:
  //    longitude, latitude, depth, mag, place, time, updated, tz, url, 
  //    detail, felt, cdi, mmi, alert, status, tsunami, sig, net, code, 
  //    ids, sources, types, nst, dmin, rms, gap, magType, type,
  // 
  // See the ComCat documentation page for details on what each attribute encodes:
  //    https://earthquake.usgs.gov/data/comcat/data-eventterms.php
  // 
  quakes = _.map(feed.features, item => {
        let [longitude, latitude, depth] = item.geometry.coordinates
        return _.extend({longitude, latitude, depth}, item.properties)
  })

      return sortAttr ? sortQuakes(quakes, sortAttr) : quakes
}


//-------------------------------------------------------------//
//   sort Quakes   -  Post-Sorting by different attribute      //
//-------------------------------------------------------------//
function sortQuakes(quakeArray, sortAttr){
  // Sorts an array of quake objects based on the attribute name you supply. 
  // 
  // By default the list of quakes returned by the function will be sorted in ascending order.
  // If you pass an attribute name with a '-' at the start of it, the quakes will be sorted in 
  // descending order instead. e.g.,
  // 
  //    let quakes = unpackJSON(jsonData)
  //    let chronological = sortQuakes(quakes, 'time')
  //    let reverseChron = sortQuakes(quakes, '-time')
  // 
  let sorted = _.sortBy(quakeArray, _.trim(sortAttr,'-'))
  return _.startsWith(sortAttr, '-') ? _.reverse(sorted) : sorted
}


//-------------------------------------------------------------//
//             Return Max Value inside the quake array         //
//-------------------------------------------------------------//

function maxValue(quakeArray, attr){
  // searches through all the quakes in an array to find the largest value for a particular attribute
  return _.max(_.map(quakeArray, attr))

}


//-------------------------------------------------------------//
//             Return Min Value inside the quake array         //
//-------------------------------------------------------------//

function minValue(quakeArray, attr){
  // searches through all the quakes in an array to find the smallest value for a particular attribute
//  return _.min(_.map(quakeArray, attr))
return _.min(_.map(quakeArray, attr))
}


//-------------------------------------------------------------//
//-------------------------------------------------------------//
//                   --- BELOW NOT USED ---                    //
//-------------------------------------------------------------//
//-------------------------------------------------------------//


//-------------------------------------------------------------//
//                     Show Earthquakes (CSV)                  //
//-------------------------------------------------------------//
function showEarthquakes(){ // OUT OF CA ONLY
    // calculate minimum and maximum values for magnitude and depth
    let magnitudeMin = 0.0;
    let magnitudeMax = columnMax(table, "mag");
    //  console.log('magnitude range:', [magnitudeMin, magnitudeMax])
    //
    let depthMin = 0.0;
    let depthMax = columnMax(table, "depth");
    //  console.log('depth range:', [depthMin, depthMax])
    // step through the rows of the table and add a dot for each event
    CA_Total = 0;
    CA_Earthquake = 0;
    CA_Blast = 0;
    for (let i=0; i<table.getRowCount(); i++){
        let row = table.getRow(i);
        /*
        let nearby  = Cities.closestTo(lat, lng, 1); //10 cities only;
        console.log(nearby);
        */
        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }
        //IF the location is CA - table.getString(r, 0)
        if (table.getString(i, 13).includes(", CA") == true) { 
                //1. If It's California, Update the totals
                CA_Total ++;
                //2. create a new circle on Leaflet
                let circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], { //Location
                    color: 'none',      // the stroke color  - NONE
                    fillColor: '#f6bb42', // the fill color //#ffce54 //#f6bb42 //SunFlower color
                    fillOpacity: 0.75,  // use some transparency so we can see overlaps
                    radius: row.getNum('mag') * 9000
                })
                //2.5 place the new earthquake on the map
                circle.addTo(mymap);
                //3. Differentiate the type of seimic event
                if (table.getString(i, 14).includes("earthquake") == true) { 
                //console.log ("Natural earthquake");
                CA_Earthquake ++; 
                } else if (table.getString(i, 14).includes("quarry blast") == true) {
                //console.log ("Quarry Blast");  
                CA_Blast ++;
                }
                //4. Do something else
                //The function works, however, For some reason, doesn't really provide a full list of cities.. 
                    let lat_row = row.getNum('latitude'); //column Name
                    let lng_row = row.getNum('longitude');
                    let nearby  = Cities.closestTo(lat_row, lng_row, 10); //Only one city;
                 //   console.log(nearby);
        }

    }
}

//-------------------------------------------------------------//
//                    When Using a CSV table                   //
//-------------------------------------------------------------//
// get the maximum value within a column (On the MAP)
function columnMax(tableObject, columnName){
    // get the array of strings in the specified column
    let colStrings = tableObject.getColumn(columnName);
    // convert to a list of numbers by running each element through the `float` function
    let colValues = _.map(colStrings, float);
    // find the largest value in the column
    return _.max(colValues);
}

// get the minimum value within a column (On the MAP)
function columnMin(tableObject, columnName){
    // get the array of strings in the specified column
    let colStrings = tableObject.getColumn(columnName);
    // convert to a list of numbers by running each element through the `float` function
    let colValues = _.map(colStrings, float);
    // find the largest value in the column
    return _.min(colValues);
}

// get the values of a given column as an array of numbers
function columnValues(tableObject, columnName){
  // get the array of strings in the specified column
  let colStrings = tableObject.getColumn(columnName) // P5 -> Gives column as a list
  // convert to a list of numbers by running each element through the `float` function
  return _.map(colStrings, _.toNumber)
  // Use of Underscore (_) : lodash - General purpose library , list and object and number and string...  
  // Map -> Functional programming. 
  // take the string, and map it using the functional called toNumber
}