var data
var tests 
var reactors
var palette
var testData

// WORKAROUND PALETTE
// CHINA - peach
// rgb(237, 182, 119)

// FRANCE - light blue
// rgb(101, 184, 199)

// PAKISTAN - yellow
// rgb(240, 226, 131)

// INDIA - purple
// rgb(192, 128, 182)

// NORTH KOREA - teal
// rgb(146, 231, 201)

// RUSSIA - pea green
// rgb(184, 199, 101)

// USA - red
// rgb(210, 116, 116)

// UK - blue
// rgb(101, 135, 199)

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
  createCanvas(1000, 2100, SVG)
  background(250)

  // var USA = (210, 116, 116)

// TITLE & INTRO
  fill('black')
  textSize(28)
  textStyle(NORMAL)
  textFont('futura-pt')
  text('Does nuclear weapons testing lead to nuclear power development?', 150, 350)

  fill('black')
  textSize(16)
  textStyle(NORMAL)
  textFont('futura-pt')
  text('This data examines nuclear testing numbers and nuclear reaction numbers of several countries between 1950 and 2010', 140, 450)

  fill('black')
  textSize(16)
  textStyle(NORMAL)
  textFont('futura-pt')
  text('The color dominating each decade is the leading country for that field, that decade', 280, 480)


// KEY
  s = 10
  x = 50
  y = 550
  noStroke()
  fill(237, 182, 119)
  rect(x, y, s, s)
  fill('black')
  textSize(16)
  textStyle(NORMAL)
  textFont('futura-pt')
  text('China', x+20, y+10)

  x = 50 + 100
  fill(101, 184, 199)
  rect(x, y, 10, 10)
  fill('black')
  text('Frace', x+20, y+10)

  x = 50 + 200
  fill(192, 128, 182)
  rect(x, y, 10, 10)
  fill('black')
  text('India', x+20, y+10)

  x = 50 + 300
  fill(146, 231, 201)
  rect(x, y, 10, 10)
  fill('black')
  text('North Korea', x+20, y+10)

  x = 50 + 450
  fill(184, 199, 101)
  rect(x, y, 10, 10)
  fill('black')
  text('Pakistan', x+20, y+10)

  x = 50 + 550
  fill(237, 182, 119)
  rect(x, y, 10, 10)
  fill('black')
  text('Russia', x+20, y+10)

  x = 50 + 650
  fill(101, 135, 199)
  rect(x, y, 10, 10)
  fill('black')
  text('UK', x+20, y+10)

  x = 50 + 750
  fill(210, 116, 116)
  rect(x, y, 10, 10)
  fill('black')
  text('USA', x+20, y+10)

// CHART LABELS

  textSize(16)
  fill(122)
  textStyle(ITALIC)
  text('Number of Nuclear Weapons Tests', 125, 620)

  textStyle(ITALIC)
  text('Number of Nuclear Reactors', 690, 620)



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


// YEAR LABELS
  noStroke()
  fill('black')
  textSize(22)
  text('1950', 475, 633)
  text('1960', 475, 833)
  text('1970', 475, 1033)
  text('1980', 475, 1233)
  text('1990', 475, 1433)
  text('2000', 475, 1633)
  text('2010', 475, 1833)


// COUNTRIES
  textSize(14)
  textStyle(NORMAL)


// 1950 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1950')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(testX-testBar*10, r * 20 + 650, testBar*10, 10)
    }

// 1960 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1960')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(testX-testBar*10, r * 20 + 850, testBar*10, 10)
    }    

// 1970 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1970')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(184, 199, 101) // RUSSIA
      rect(testX-testBar*10, r * 20 + 1050, testBar*10, 10)
    }    

// 1980 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1980')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(184, 199, 101) // RUSSIA
      rect(testX-testBar*10, r * 20 + 1250, testBar*10, 10)
    } 

// 1990 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1990')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(testX-testBar*10, r * 20 + 1450, testBar*10, 10)
    }  

// 2000 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('2000')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(testX-testBar*10, r * 20 + 1650, testBar*10, 10)
    }  

// 2010 TESTS
 for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('2010')
    var country = tests.getRowCount('Country')
      noStroke()
      fill(146, 231, 201) //CHINA
      rect(testX-testBar*10, r * 20 + 1850, testBar*10, 10)
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
      rect(reactX, r * 20 + 650, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 660)
    }

// 1960 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1960')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(101, 135, 199) // UK BUT TIED WITH US
      rect(reactX, r * 20 + 850, reactorBar*10, 10)
      fill(210, 116, 116)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 860)
    }    

// 1970 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1970')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(reactX, r * 20 + 1050, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1060)
    }    

// 1980 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1980')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(210, 116, 116) // USA
      rect(reactX, r * 20 + 1250, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1260)
    } 

// 1990 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1990')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(101, 184, 199) // FRANCE
      rect(reactX, r * 20 + 1450, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1460)
    }  

// 2000 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('2000')
    var country = reactors.getRowCount('Country')
      noStroke()
      fill(101, 184, 199) // FRANCE
      rect(reactX, r * 20 + 1650, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1660)
    }  

// 2010 REACTORS
  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('2010')
    var country = reactors.getRowCount('Country')
    // print(reactorData)
     noStroke()
      fill(237, 182, 119) // CHINA
      rect(reactX, r * 20 + 1850, reactorBar*10, 10)
      textAlign(CENTER)
      fill('black')
      text(reactors.getString(r, 0), 500, r * 20 + 1860)
    }  

   save('Global Leader in Nuclear Testing and Reactor Connection.svg')


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

 // }
