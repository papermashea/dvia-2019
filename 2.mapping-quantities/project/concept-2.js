var data
var tests 
var reactors
var palette
var testData

function preload(){
  // tests = loadTable('data/tests_country_decadeRow.csv', 'csv', 'header');
  tests = loadTable('data/tests_country_decadeCol.csv', 'csv', 'header');
  // print(tests)
  // fourtiesTests = loadTable('data/tests_country_decadeCol.csv', 'csv', 'header'); 
  // reactors = loadTable('data/reactors_country_decadeRow.csv', 'csv', 'header');
  reactors = loadTable('data/reactors_country_decadeCol.csv', 'csv', 'header');
  // print(reactors)
}

function setup(){
  createCanvas(1000, 2000, SVG)
  background(250)

  // var USA = (210, 116, 116)

// TITLE
  textSize(14)
  textFont("futura-pt")
  fill('black')
  text('Do nuclear tests lead to nuclear power development?', 200, 100)
  textAlign(CENTER)

// SETUP CHART
  var rowHeight = 50
  var colWidth = 40
  testX = 450;
  reactX = 550;

// TEST CHART  
// 1940 TESTS
 // for (var r=0; r<tests.getRowCount(); r++) {   
 //    var testData = tests.getRow(r)
 //    var testBar = testData.getNum('1940')
 //    var country = tests.getRowCount('Country')
 //      noStroke()
 //      fill(210, 116, 116) // USA
 //      rect(x-testBar*10, r * 20 + 400, testBar*10, 10)
 //    }

// 1950 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1950')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(testX-testBar*10, r * 20 + 600, testBar*10, 10)
    }

// 1960 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1960')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(testX-testBar*10, r * 20 + 800, testBar*10, 10)
    }    

// 1970 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1970')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(184, 199, 101) // RUSSIA
      rect(testX-testBar*10, r * 20 + 1000, testBar*10, 10)
    }    

// 1980 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1980')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(184, 199, 101) // RUSSIA
      rect(testX-testBar*10, r * 20 + 1200, testBar*10, 10)
    } 

// 1990 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1990')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(testX-testBar*10, r * 20 + 1400, testBar*10, 10)
    }  

// 2000 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('2000')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(testX-testBar*10, r * 20 + 1600, testBar*10, 10)
    }  

// 2010 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('2010')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(146, 231, 201) //CHINA
      rect(testX-testBar*10, r * 20 + 1800, testBar*10, 10)
    }

// REACTOR CHART 
// 1940 REACTORS
  // for (var r=0; r< reactors.getRowCount(); r++) { // RUNNING THROUGH THE ROWS
  //     var reactorData = reactors.getRow(r)
  //     var reactorBar = reactorData.getNum('1940')
  //     noStroke()
  //     fill(122) // no data
  //     rect(700, r * 20 + 400, reactorBar*10, 10)
  //     textAlign(CENTER)
  //     text(reactors.getString(r, 0), 600, r * 20 + 410)
  //   }

// 1950 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1950')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(101, 135, 199) // UK
      rect(reactX, r * 20 + 600, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 610)
    }

// 1960 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1960')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(101, 135, 199) // UK BUT TIED WITH US
      rect(reactX, r * 20 + 800, reactorBar*10, 10)
      fill(210, 116, 116)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 810)
    }    

// 1970 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1970')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(reactX, r * 20 + 1000, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1010)
    }    

// 1980 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1980')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(reactX, r * 20 + 1200, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1210)
    } 

// 1990 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1990')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(101, 184, 199) // FRANCE
      rect(reactX, r * 20 + 1400, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1410)
    }  

// 2000 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('2000')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(101, 184, 199) // FRANCE
      rect(reactX, r * 20 + 1600, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1610)
    }  

// 2010 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('2010')
    var country = reactors.getRowCount('Country')
    // print(reactorData)
     noStroke()
      fill(237, 182, 119) // CHINA
      rect(reactX, r * 20 + 1800, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1810)
    }  




}

// [[[[[[[[[[[[[[[ WORKING ON ]]]]]]]]]]]]]]]



// [[[[[[[[[[[[[[ WORKING ON THE BREWER PALETTE]]]]]]]]]]]]]]

  // var palette = Brewer.qualitative('Paired', 8);
  // var numColor = 8
  // var palette = Brewer.qualitative('Paired', numColor);
    // print(palette)


      // var value = testBar *2
      // print(testBar)
      // var value = ['(120,60,40,.5)','(220,60,40,.5)','(120,60,40,.5)','(120,60,40,.5)','(220,60,40,.5)','(120,60,40,.5)']
      // var value = tests.getColumn(r)
      // print(value)
      // var color = palette.colorForValue(value)
      // print(color)    


      //   for (var c=1; c < tests.getColumnCount(); c++) { // RUNNING THROUGH THE COLUMNS
//     for (var r=1; r < tests.getRowCount(); r++) { // RUNNING THROUGH THE ROWS
//       var key = tests.getColumn(c)
//       // var value = tests.getNum(c)
//       // var color = palette.colorForValue(value)
//       print(key)
//       // print(color)
//       // print(value)
// }}


// [[[[[[[[[[[[[ WORKING ON CHANGING VARIABLES]]]]]]]]]]]]]


// }

  //   print(fourties)



    // var fourties = tests.getColumn('1940')
    // var fifties = tests.getColumn('1950')
      // for (var r=0; r<tests.getRowCount(); r++) {
      // }

    // var testCols = tests.getColumn(c)

    // var testBar = tests.getNum(fourties,c)
    // print(fourties)
    // print(fifties)

    // rect(x+5, y+10, testBar*10, 10)


    // print(testData)


// }

  // countryRows = tests.getRowCount();
  // decades = tests.getColumnCount();

  // fourtiesCol = tests.getColumn('1940');
  // print(fourtiesCol)
  // fiftiesTests = tests.getColumn('1950');
  // print(fiftiesTests)

  // COUNTRIES
  // for (var d = 0; d < decades; d++) {
  //   text(tests.getString(d, 0), 200, d * 20 + 400);
  //   fourties = fourtiesCol.getNum('1940');

// // DECADE
//   for (var i=0; i<countryRows(); i++) {
//     text(tests.getString(d, 0), 200, d * 20 + 400);

  // // DECADE
  // for (var d = 0; d < decades; d++) {
  //   text(tests.getString(d, 0), 200, d * 20 + 400);

  // COUNTRIES


  // for (var i=0; i<tests.getColumnCount(); i++) {
  //     var col = tests.getColumn(i)
  //     var fourties = col.getNum('1940')
      // text(tests.getString(i, 0), 200, c * 20 + 400);
      // print(tests.getColumn('1940'))

  // for (var d = 0; d < fourties; d++) {
  //   text(tests.getString(d, 0), 220, d * 20 + 400);
// }
  
//     // 1940s
//   for (var e = 1; e < fourties; e++) {
//       fourtiesBar = fourties.getNum()
//       fill(black)
//       rect(220, c * 20 + 400, fourtiesBar * 10, 10);
// }
// } 





 // save('Nuclear Tests & Reactors by Decade: Bars.svg')
 // }
