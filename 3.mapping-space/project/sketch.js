// VARIABLES
var table;
var quakes;
var quake;
var hospitals;
var water;
var energy;
var mymap;
let height = window.innerHeight;
let width = window.innerWidth;
let hs = 20;

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

        lowDepth = color(255,36,160);
        highDepth = color(138, 0, 0);
          noLoop();
}

function setup() {
    color(RGB);
    // THIS IS THE SIDEBAR
    sidebar();

    // THIS IS THE DIAGRAM
    // diagram();
    
    // THIS IS THE MAP
    setupMap();
    setGradient();
    
    // THIS IS THE COMPLETE DATA
    addQuake();
        lowDepth = color(255,36,160);
        highDepth = color(138, 0, 0);
          noLoop();

    // THIS IS THE FILTERED DATA
    // addFacility();
    // findFacility();
    // countHospital();

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
// ADD CANVAS
    let canvas = createCanvas(400, height);
    canvas.parent('sidebar');
    background('white');
    noStroke();

    // ADD CANVAS ELEMENTS
        // DESCRIPTION
        let title = createElement('h1', 'Earthquakes + Critical Facilities');
           title.parent('title');

        let description = createElement('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
           description.parent('descriptionText');

        // DETAILS
        // let detailsTitle = createElement('h3', 'Vulnerable Facilities');
        //     detailsTitle.parent('key');
        
        let details = createElement('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
            details.parent('descriptionText');

        // KEY
        // let keyTitle = createElement('h3', 'Depth');
        //     keyTitle.parent('key');

        // DEPTH KEY
        push();
        fill(0,0,0);
        textSize(20);
        textFont("futura-pt");
        textAlign(LEFT);
        text('Depth', 35, 60);

        setGradient(35, 80, 240, 80, lowDepth, highDepth, 1);
        fill(0,0,0);
        textSize(14);
        text('1', 35, 140);
        textSize(14);
        fill(0,0,0);
        text('8', 360, 140);

        // ALL DATA
        let hosBox = createCheckbox('Hospitals', 'true');
            hosBox.type = 'checkbox';
            hosBox.parent('descriptionText');
            // hosBox.position('descriptionText');

        // PRINT VULNERABLE CITIES
        var xPos = 35;
        var yPos = 300;

          for (var r=0; r<quakes.getRowCount(); r++){
            var row = quakes.getRow(r)
            var lat = row.getNum('latitude')
            var lng = row.getNum('longitude')
            var closest = Cities.closestTo(lat, lng)


        var y = yPos + r*20
        var x = xPos
        text(row.getString('mag'), x, y)
        
        x+= 40
        text(row.getString('place'), x, y)

        x+= 200
        text(`closest to: ${closest[0].name}, ${closest[0].country}`, x, y)

        x+= 200
        
        var pop = closest[0].population
        if (pop>=1000000){
          text(`population ${(pop/1000000).toFixed(1)} million`, x, y)
        }else{
          text(`population ${numberWithCommas(pop)}`, x, y)
        }

        x+= 200
        text(`distance ${floor(closest[0].distance)} km`, x, y)

        x+= 200
        text(`compass direction: ${floor(closest[0].direction)}°`, x, y)
      }
    }


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function setGradient (x, y, w, h, c1, c2, axis){
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let key = lerpColor(lowDepth, highDepth, inter);
      fill(key);
      rect(i, y, i, 40);
    }

}

function addData (){

    //ALL HOSPITALS
    var hostpitalData = L.marker(latlng).addTo(map);

    for (var i=0; i<hosTable.getRowCount(); i++){
        var row = hosTable.getRow(i)

        // SKIP ROWS WHERE DATA IS MISSING
        if (row.get('latitude')==''){
            continue}

        // SKIP ROWS WHERE DATA IS MISSING
        if (row.get('longitude')==''){
            continue}

        // IF BOX IS CHECKED, ADD ALL DATA
        var hosCheckBox = document.getElementById("hosBox");
        if (hosCheckBox.checked == true){
        hosCircle.addTo(mymap);
      } else {
        hosCircle.removeFrom(mymap);
      }
    }
}

function removeData(){
//Removes any circles that have been added to the map 
mymap.eachLayer(function(addData){
    if (layer instanceof L.Circle){
        mymap.removeLayer(layer)
        }
    })
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

function findHospitals(){
    // HOSPITAL LIST
    var hospitalIDs = []

    for (var r=0; r<quakes.rows.length; r++){
        var quake = quakes.getRow(r);

        for (var h=0; h<hospitals.getRowCount(); h++){
            var hospital = hospitals.getRow(h);

            var disancetInKm = distanceFrom(quake.getNum('latitude'), quake.getNum('longitude'), hospital.getNum('latitude'), hospital.getNum('longitude'))
            if (disancetInKm < 50){
                // CLOSE HOSTPITAL ADDS ID TO LIST
                hospitalIDs.push(hospital.getNum('ID'))}{
                    return closeHospitals
            }
        }
    }

    // since the same hospital may be close to multiple quakes, we might have added it to the list repeatedly,
    // so let's use a lodash function that filters out duplicates and gives us a list where each element only
    // appears once. _.uniq can only handle simple values like strings and numbers, so that's why we only added
    // the ID to the array, not the whole row object
    var uniqueIDs = _.uniq(hospitalIDs)
    print(`got ${hospitalIDs.length} hits, ${uniqueIDs.length} unique`)

    // create another empty array, this time to be filled with the row objects from the hospitals table that
    // correspond to the IDs in our filtered list
    var vulnerable = []
    for (var h=0; h<hospitals.getRowCount(); h++){
        var hospital = hospitals.getRow(h)
        if (_.includes(hospitalIDs), hospital.getNum('ID')){
            vulnerable.push(hospital)
        }
    }     return vulnerable }


function addHospitals(){
    var vulnerable = findHospitals()

    for (var i=0; i<vulnerable.length; i++){
        L.circleMarker([hospital.getNum('latitude'), hospital.getNum('longitude')], {
            weight: 0,
            fillColor:'orange',
            fillOpacity:.5,
            radius: 8
        }).bindTooltip(hospital.getString('NAME')).addTo(mymap);
    }
}

// function findFacility(){
//     for (var r=0; r<quakes.rows.length; r++){
//         var quakeSite = quakes.getRow(r);

//     // VULNERABLE HOSPITALS
//     for (var h=0; h<hospitals.getRowCount(); h++){
//         var hospital = hospitals.getRow(h);

//         // WITHIN 50KM
//         var disancetInKm = distanceFrom(quakeSite.getNum('latitude'), quakeSite.getNum('longitude'), hospital.getNum('latitude'), hospital.getNum('longitude'))
//         if (disancetInKm < 50){
            
//             // DRAW LINE FOR DISTANCE
//             var latlngs = [
//                 [hospital.getNum('latitude'), hospital.getNum('longitude')],
//                 [quakeSite.getNum('latitude'), quakeSite.getNum('longitude')] 
//             ]

//             L.polyline(latlngs, {
//                 color: 'black',
//                 weight: .8,
//                 opacity: .5
//             }).addTo(mymap);

//             // DRAW CIRCLE FOR LOCATION
//             L.circleMarker([hospital.getNum('latitude'), hospital.getNum('longitude')], {
//                 weight: 0,
//                 fillColor:'orange',
//                 fillOpacity:.5,
//                 radius: 8
//             }).bindTooltip(hospital.getString('NAME')).addTo(mymap);
//             }
//         }

    // VULNERABLE WATER TREATMENT CENTERS
    // for (var t=0; t<water.getRowCount(); t++){
    //     var treatment = water.getRow(t);

    //     // WITHIN 50KM
    //     var disancetInKm = distanceFrom(quakeSite.getNum('latitude'), quakeSite.getNum('longitude'), treatment.getNum('latitude'), treatment.getNum('longitude'))
    //     if (disancetInKm < 50){

    //         // DRAW LINE FOR DISTANCE
    //         var latlngs = [
    //             [treatment.getNum('latitude'), treatment.getNum('longitude')],
    //             [quakeSite.getNum('latitude'), quakeSite.getNum('longitude')] 
    //         ]

    //         L.polyline(latlngs, {
    //             color: 'black',
    //             weight: .8,
    //             opacity: .5
    //         }).addTo(mymap);

    //         L.circleMarker([treatment.getNum('latitude'), treatment.getNum('longitude')], {
    //             weight:0,
    //             fillColor:'blue',
    //             fillOpacity:.5,
    //             radius: 8
    //         }).bindTooltip(treatment.getString('CWP_NAME')).addTo(mymap);
    //         }
    //     }    
//     }
// }        




function distanceFrom(srcLat, srcLng, dstLat, dstLng){
    return L.latLng(srcLat, srcLng).distanceTo(L.latLng(dstLat, dstLng)) / 1000 // in km
    }
