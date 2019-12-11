function findHospitals(){
    // create an empty list that we'll fill up with references to any hospitals that are close to quakes
    var hospitalIDs = []

    for (var r=0; r<quakes.rows.length; r++){
        var quake = quakes.getRow(r);

        for (var h=0; h<hospitals.getRowCount(); h++){
            var hospital = hospitals.getRow(h);

            var disancetInKm = distanceFrom(quake.getNum('latitude'), quake.getNum('longitude'), hospital.getNum('latitude'), hospital.getNum('longitude'))
            if (disancetInKm < 50){
                // if the hospital is close enough, add just its ID to a list
                hospitalIDs.push(hospital.getNum('ID'))
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
    }

    // finally, we need to use the `return` statement to pass the results of all this work back to the caller. this is
    // the part that will allow for code like:
    //    var vulnerableHospitals = findHospitals()
    return vulnerable
}

function countHospitals(){
    var vulnerable = findHospitals()
    return vulnerable.length
}

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
