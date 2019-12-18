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
  colorMode(RGB, 100)
  // palette = Brewer.qualitative('Paired', );
  // palette = Brewer.qualitative('Paired', 8);
    // print(palette)

// TITLE
  // push(); 
  // let title = 'Do nuclear tests lead to nuclear power development?'
  // textSize(14)
  // textFont("futura-pt")
  // fill(30)
  // text(title, 70, 30)
  // textAlign(CENTER)
  // pop(); 

// SETUP CHART

  var x = 200
  var y = 300
  var rowHeight = 50
  var colWidth = 40

  
// for (var c=0; c< tests.getColumnCount(); c++) { // RUNNING THROUGH THE ROWS
//     var key = tests.getColumn(c)
//       var country = key.getRow(c)
//       // print (country)
//       // var color = palette.colorForValue(testData)
//       print(key)

// TEST DATA

  for (var r=0; r< tests.getRowCount(); r++) { // RUNNING THROUGH THE ROWS
      var testData = tests.getRow(r)
      var testBar = testData.getNum('1940')
      // var country = tests.getRow(r)
      // print(country)    
      // var color = palette.colorForValue(8)
      // print(color)    
      noStroke()
      fill('red')
      rect(700, r * 20 + 400, testBar*10, 10)
      text(tests.getString(r, 0), 600, r * 20 + 410)

      // print(testData)
    }

  for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1950')
    var country = tests.getRowCount('Country')
      noStroke()
      fill('orange')
      rect(700, r * 20 + 600, testBar*10, 10)
      text(tests.getString(r, 0), 600, r * 20 + 610)

      // print(testData)
    }

  for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1960')
    var country = tests.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('yellow')
      rect(700, r * 20 + 800, testBar*10, 10)
      text(tests.getString(r, 0), 600, r * 20 + 810)

      // print(testData)
    }    

  for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1970')
    var country = tests.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('green')
      rect(700, r * 20 + 1000, testBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)
      text(tests.getString(r, 0), 600, r * 20 + 1010)

      // print(testData)
    }    

  for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1980')
    var country = tests.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('blue')
      rect(700, r * 20 + 1200, testBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)
      text(tests.getString(r, 0), 600, r * 20 + 1210)

      // print(testData)
    } 

  for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1990')
    var country = tests.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('purple')
      rect(700, r * 20 + 1400, testBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)
      text(tests.getString(r, 0), 600, r * 20 + 1410)

      // print(testData)
    }  

  for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('2000')
    var country = tests.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('pink')
      rect(700, r * 20 + 1600, testBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)
      text(tests.getString(r, 0), 600, r * 20 + 1610)

      // print(testData)
    }  

  for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('2010')
    var country = tests.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('brown')
      rect(700, r * 20 + 1800, testBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)
      text(tests.getString(r, 0), 600, r * 20 + 1810)

      // print(testData)
    }  


// REACTOR CHART

x = 300;

  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1940')
    var country = reactors.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('black')
      rect(x-reactorBar*10, r * 20 + 400, reactorBar*10, 10)

      // print(reactorData)
    }

  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1950')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('black')
      rect(x-reactorBar*10, r * 20 + 600, reactorBar*10, 10)
      // text(reactors.getString(r, 0), 600, r * 20 + 610)

      // print(reactorData)
    }

  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1960')
    var country = reactors.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('black')
      rect(x-reactorBar*10, r * 20 + 800, reactorBar*10, 10)

      // print(reactorData)
    }    

  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1970')
    var country = reactors.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('black')
      rect(x-reactorBar*10, r * 20 + 1000, reactorBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)

      // print(reactorData)
    }    

  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1980')
    var country = reactors.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('black')
      rect(x-reactorBar*10, r * 20 + 1200, reactorBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)

      // print(reactorData)
    } 

  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('1990')
    var country = reactors.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('black')
      rect(x-reactorBar*10, r * 20 + 1400, reactorBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)

      // print(reactorData)
    }  

  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('2000')
    var country = reactors.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('black')
      rect(x-reactorBar*10, r * 20 + 1600, reactorBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)

      // print(reactorData)
    }  

  for (var r=0; r<reactors.getRowCount(); r++) {   
    var reactorData = reactors.getRow(r)
    var reactorBar = reactorData.getNum('2010')
    var country = reactors.getRowCount('Country')
    // print(country)    
    // var color = palette.colorForValue()
      noStroke()
      fill('black')
      rect(x-reactorBar*10, r * 20 + 1800, reactorBar*10, 10)
      // text(getNum, , 200, r * 20 + 610)

      // print(reactorData)
    }

}









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
 
