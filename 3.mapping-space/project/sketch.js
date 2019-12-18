// VARIABLES
var table;
var quakes;
var quake;
var quakePattern;
var hospitals;
var water;
var energy;
let depthScale;
var depthColor;
var mymap;
let height = window.innerHeight;
let width = window.innerWidth;
let hs = 20;

// DATA
let count;
// let vulnerable; 


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
    allQuakes = loadTable("data/significant_month.csv", "csv","header");
    hospitals = loadTable("data/HospitalLocations_trimmed.csv", "csv", "header");    
    water = loadTable("data/WastewaterLocations_trimmed.csv", "csv", "header");    
    energy = loadTable("data/PlantLocations_Supertrimmed.csv", "csv", "header");

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
    quakePattern();

    // THIS IS THE FILTERED DATA
    // addHospitals();
    // findHospitals();
    // addFacility();
    findFacility();
    allHospitals();
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

var facilityIcon = L.Icon.extend({
    options: {
        iconSize: [30, 30],
    }
});

var hospitalIcon = new facilityIcon({iconUrl: 'design/Hospital.svg'}),
    waterIcon = new facilityIcon({iconUrl: 'design/Water.svg'}),
    plantIcon = new facilityIcon({iconUrl: 'design/Plant.svg'});


function sidebar() {
// ADD CANVAS
    let canvas = createCanvas(400, 4000);
    canvas.parent('sidebar');
    background('white');
    noStroke();

    // ADD CANVAS ELEMENTS
        // DESCRIPTION
        let title = createElement('h1', 'Earthquakes + Critical Facilities');
           title.parent('title');

        let description = createElement('p', 'In October 2019, <a href="https://www.nytimes.com/2019/10/09/us/california-power-outage-PGE.html" target="_blank">Pacific Gas and Electric deliberately turned off power for hundreds of thousands of homes</a> as a precaution against wildfires. In a state where households, companies, and schools are known for cutting-edge technology, the vulnerability of basic infrastructure came as <a href="https://twitter.com/search?q=california%20power%20outage&src=typed_query" target="_blank">a shock.</a>');
           description.parent('descriptionText');

        // DETAILS
        // let detailsTitle = createElement('h3', 'Vulnerable Facilities');
        //     detailsTitle.parent('key');
        
        let details = createElement('p', 'This map explores populations and critical facilities vulnerable earthquakes in the United States. You can explore depth and magnitude of the latest earthquakes of the day in relation to their proximity to critical facilities including <span class="hospitalText">hospitals</span>, <span class="treatmentText">water treatment centers</span>, and <span class="energyText">energy plants</span>.<br><br>');
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
        text('Depth (m)', 35, 60);

        setGradient(35, 80, 240, 80, lowDepth, highDepth, 1);
        fill(0,0,0);
        textSize(14);
        text('.1', 35, 140);
        textSize(14);
        fill(0,0,0);
        text('500', 360, 140);

        // ALL DATA INPUTS
        // let hosBox = createCheckbox('Hospitals', 'false');
        //     hosBox.type = 'checkbox';
        //     hosBox.parent('descriptionText');

        // let watBox = createCheckbox('Water Treatment Facilities', 'false');
        //     watBox.type = 'checkbox';
        //     watBox.parent('descriptionText');

        // SIMPLE CHART
            // var quakeData = quakePattern.getRow(i)        
            // var quakeDepth = quakeData.getNum('depth')
            // var quakeMag = quakeData.getNum('mag')
        //     var quakeDepth = map(function(d) {return d.Depth});
        // //Set Min for better visiable range
        //         var minX = d3.min(quakeDepth);
        //         minX -= 1;
                
        //         var chart = new Chart('chart', {
        //             type: 'horizontalBar',
        //             data: {
        //                 labels: Magnitude,
        //                 datasets: [
        //                     {
        //                         data: quakeDepth
        //                     }
        //                 ]
        //             },
        //             options: {
        //                 title: {
        //                     display: true,
        //                 },
        //                 legend: {
        //                     display: false
        //                 },
        //                 scales: {
        //                     xAxes: [
        //                         {
        //                             ticks: {
        //                                 suggestedMin: minX,
        //                             }
        //                         }
        //                     ]
        //                 }
        //             }
        //         });
        //     }


        // PRINT VULNERABLE CITIES
            // CITIES AFFECTED
            push();
            fill(0,0,0);
            textSize(20);
            textFont("futura-pt");
            textAlign(LEFT);
            text('Magnitude', 35, 200);
            text('Cities Affected (Month)', 140, 200);
            textSize(12);   

        var xPos = 35;
        var yPos = 240;
        // var vulnerableHospitals = findHospitals()

          for (var q=0; q<allQuakes.getRowCount(); q++){
            var row = allQuakes.getRow(q)
            var lat = row.getNum('latitude')
            var lng = row.getNum('longitude')
            var closest = Cities.closestTo(lat, lng)
            print(row)

            // COLOR FOR DEPTH
            var depthMin = 0.0;
            var depthMax = columnMax(allQuakes, "depth")
            var depth = columnValues(allQuakes, "depth")

            // COLOR PALETTE FOR DEPTH
            let from = color(255,36,160);
            let to = color(138, 0, 0);
            let depthScale = map(depth[q], depthMin, depthMax, .1, 1.0);
            var depthColor = lerpColor(from, to, depthScale);

              // for (var h=0; h<vulnerableHospitals.getRow(h); r++){
              //   var closeHos = vulnerableHospitals.getRow(h)

            var y = yPos + q*20
            var x = xPos
            var quakeMag = row.getNum('mag')
            fill(depthColor);
            rect(x, y, quakeMag*4, 8)
                    push();
           fill(0,0,0);
             
            // x+= 40
            // text(closeHos.getString('name'), x, y)

            x+= 110
            text(`near  ${closest[0].name},${closest[0].country},`, x, y)

            x+= 160
            
            var pop = closest[0].population
            if (pop>=1000000){
              text(`pop.${(pop/1000000).toFixed(1)} million`, x, y)
            }else{
              text(`pop. ${numberWithCommas(pop)}`, x, y)
            }

        // x+= 200
        // text(`distance ${floor(closest[0].distance)} km`, x, y)

        // x+= 200
        // text(`compass direction: ${floor(closest[0].direction)}°`, x, y)
      }

        // WEEKLY THREATS
            // WEEKLY THREATS
            // push();
            // fill(0,0,0);
            // textSize(20);
            // textFont("futura-pt");
            // textAlign(LEFT);
            // text('Weekly Threas', 35, 600);

            // for (var a=0; a<allQuakes.getRowCount(); a++){ 
            // var all = allQuakes.getRow(a)
            // var quakeDepth = all.getNum('depth')
            // var quakeMag = all.getNum('mag')
            //   push();
            //     rect(35, 200, quakeDepth, quakeMag)

    }


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function quakePattern() {
        for (var i=0; i<allQuakes.getRowCount(); i++){
        var quakeData = allQuakes.getRow(i)

        // SKIP ROWS WHERE DATA IS MISSING
        if (quakeData.get('depth')==''){
            continue
        }
        if (quakeData.get('magnitude')==''){
            continue
        }
        if (quakeData.get('latitude')==''){
            continue
        }
        if (quakeData.get('longitude')==''){
            continue
        }
    }
}


function setGradient (x, y, w, h, c1, c2, axis){
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let key = lerpColor(lowDepth, highDepth, inter);
      fill(key);
      rect(i, y, i, 40);
    }

}


// function addData (){
//     //ALL HOSPITALS
//     var hostpitalData = L.marker(latlng).addTo(map);

//     for (var i=0; i<hosTable.getRowCount(); i++){
//         var row = hosTable.getRow(i)

//         // SKIP ROWS WHERE DATA IS MISSING
//         if (row.get('latitude')==''){
//             continue}

//         // SKIP ROWS WHERE DATA IS MISSING
//         if (row.get('longitude')==''){
//             continue}

//         // IF BOX IS CHECKED, ADD ALL DATA
//         var hosBox = document.getElementById("89m4luvgb38");
//         if (hosBox.checked == true){
//         allHospitals.addTo(mymap);
//       } else {
//         hosCircle.removeFrom(mymap);
//       }
//         var watBox = document.getElementById("89m4luvgb38");
//         if (watBox.checked == true){
//         allWater.addTo(mymap);
//       } else {
//         watCircle.removeFrom(mymap);
//       }
//     }
// }

// function removeData(){
// //Removes any circles that have been added to the map 
// mymap.eachLayer(function(addData){
//     if (layer instanceof L.Circle){
//         mymap.removeLayer(layer)
//         }
//     })
// }

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
            quake.on("click", function(e){console.log(e)})
    }
}

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
            var hospitallatlngs = [
                [hospital.getNum('latitude'), hospital.getNum('longitude')],
                [quakeSite.getNum('latitude'), quakeSite.getNum('longitude')] 
            ]

            L.polyline(hospitallatlngs, {
                color: 'black',
                weight: .8,
                opacity: .5
            }).addTo(mymap);

            // DRAW CIRCLE FOR LOCATION
            L.marker([hospital.getNum('latitude'), hospital.getNum('longitude')], {icon: hospitalIcon}).bindTooltip(hospital.getString('NAME')).addTo(mymap);
            }
        }  

    // VULNERABLE WATER TREATMENT CENTERS
    for (var t=0; t<water.getRowCount(); t++){
        var treatment = water.getRow(t);

        // WITHIN 50KM
        var disancetInKm = distanceFrom(quakeSite.getNum('latitude'), quakeSite.getNum('longitude'), treatment.getNum('latitude'), treatment.getNum('longitude'))
        if (disancetInKm < 50){

            // DRAW LINE FOR DISTANCE
            var waterlatlngs = [
                [treatment.getNum('latitude'), treatment.getNum('longitude')],
                [quakeSite.getNum('latitude'), quakeSite.getNum('longitude')] 
            ]

            L.polyline(waterlatlngs, {
                color: 'black',
                weight: .8,
                opacity: .5
            }).addTo(mymap);

            L.marker([treatment.getNum('latitude'), treatment.getNum('longitude')], { icon: waterIcon}).bindTooltip(treatment.getString('CWP_NAME')).addTo(mymap);
            }
        }    

    // VULNERABLE ENERGY PLANTS
    for (var t=0; t<energy.getRowCount(); t++){
        var plant = energy.getRow(t);

        // WITHIN 50KM
        var disancetInKm = distanceFrom(quakeSite.getNum('latitude'), quakeSite.getNum('longitude'), plant.getNum('latitude'), plant.getNum('longitude'))
        if (disancetInKm < 50){

            // DRAW LINE FOR DISTANCE
            var plantlatlngs = [
                [plant.getNum('latitude'), plant.getNum('longitude')],
                [quakeSite.getNum('latitude'), quakeSite.getNum('longitude')] 
            ]

            L.polyline(plantlatlngs, {
                color: 'black',
                weight: .8,
                opacity: .5
            }).addTo(mymap);

            L.marker([plant.getNum('latitude'), plant.getNum('longitude')], {icon: plantIcon}).bindTooltip(plant.getString('name')).addTo(mymap);
            }
        }         


    }        
}

// function findHospitals(){
//     // HOSPITAL LIST
//     var hospitalIDs = []

//     for (var r=0; r<quakes.rows.length; r++){
//         var quake = quakes.getRow(r);

//         for (var h=0; h<hospitals.getRowCount(); h++){
//             var hospital = hospitals.getRow(h);

//             var disancetInKm = distanceFrom(quake.getNum('latitude'), quake.getNum('longitude'), hospital.getNum('latitude'), hospital.getNum('longitude'))
//             if (disancetInKm < 50){
//                 // if the hospital is close enough, add just its ID to a list
//                 hospitalIDs.push(hospital.getNum('ID'))
//             }
//         }
//     }

//     // since the same hospital may be close to multiple quakes, we might have added it to the list repeatedly,
//     // so let's use a lodash function that filters out duplicates and gives us a list where each element only
//     // appears once. _.uniq can only handle simple values like strings and numbers, so that's why we only added
//     // the ID to the array, not the whole row object
//     var uniqueIDs = _.uniq(hospitalIDs)
//     print(`got ${hospitalIDs.length} hits, ${uniqueIDs.length} unique`)

//     // create another empty array, this time to be filled with the row objects from the hospitals table that
//     // correspond to the IDs in our filtered list
//     var vulnerable = []
//     for (var h=0; h<hospitals.getRowCount(); h++){
//         var hospital = hospitals.getRow(h)
//         if (_.includes(hospitalIDs), hospital.getNum('ID')){
//             vulnerable.push(hospital)
//         }
//     }

//     // finally, we need to use the `return` statement to pass the results of all this work back to the caller. this is
//     // the part that will allow for code like:
//     //    var vulnerableHospitals = findHospitals()
//     return vulnerable
// }     


// function countHospitals(){
//     var vulnerable = findHospitals()
//     return vulnerable.length
// }

// function addHospitals(){
//     var vulnerable = findHospitals()

//     for (var i=0; i<vulnerable.length; i++){
//         L.circleMarker([hospitals.getNum('latitude'), hospital.getNum('longitude')], {
//             weight: 0,
//             fillColor:'orange',
//             fillOpacity:.5,
//             radius: 8
//         }).bindTooltip(hospital.getString('NAME')).addTo(mymap);
//     }
// }

function allHospitals(){
    //all hospitals 
    for (var h=0; h<hospitals.getRowCount(h); h++){
        var hospital = hospitals.getRow(h);

        // skip over any rows where the latitude data is missing
        if (hospital.get('latitude')==''){
            continue}

        // skip over any rows where the longitude data is missing
        if (hospital.get('longitude')==''){
            continue}

        var hosCircle = L.circleMarker([hospital.getNum('latitude'), hospital.getNum('longitude')], {
            color: 'orange',      // the dot stroke color
            fillColor: 'orange', // the dot fill color
            radius: 1,
            opacity: .6
        }) 

        // IF CHECKED, SHOW ALL HOSPITALS 
    //     var hosBox = document.getElementById("us0pcgdijb")
    //     if (hosBox.checked == true){

    //     hosCircle.bindTooltip(hospital.getString('name')).addTo(mymap)  
    //   } else {
    //     hosCircle.removeFrom(mymap);
    //   }
    }
}

//console.log(addvulnerableHospitals(hopsital));

// function addAllWater(){
//     //wastewater treatment
//     for (var i=0; i<watTable.getRowCount(); i++){
//         var row = watTable.getRow(i)

//         // skip over any rows where the latitude data is missing
//         if (row.get('latitude')==''){
//             continue
//         }

//         // skip over any rows where the longitude data is missing
//         if (row.get('longitude')==''){
//             continue
//         }

//         // create a new dot
//         // var disancetInKm = distanceFrom(table.getNum('latitude'), table.getNum('longitude'),watTable.getNum('latitude'), watTable.getNum('longitude'))
//         // if (disancetInKm < 1000){
//         var watCircle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
//             color: 'blue',      // the dot stroke color
//             fillColor: 'blue', // the dot fill color
//             fillOpacity: 0.25,  // use some transparency so we can see overlaps
//             radius: 1
//         })

//         // place all water treatment facillities on the map
//         var watCheckBox = document.getElementById("89m4luvgb38");
//         if (watCheckBox.checked == true){
//         watCircle.addTo(mymap);
//       } else {
//         watCircle.removeFrom(mymap);
//       }
//         }
//     }


function distanceFrom(srcLat, srcLng, dstLat, dstLng){
    return L.latLng(srcLat, srcLng).distanceTo(L.latLng(dstLat, dstLng)) / 1000 // in km
    }
