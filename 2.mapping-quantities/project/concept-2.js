var data
var tests 
var reactors
// var testing =[]
var testData

function preload(){
  // tests = loadTable('data/tests_country_decadeRow.csv', 'csv', 'header');
  tests = loadTable('data/tests_country_decadeCol.csv', 'csv', 'header');
  // print(tests)
  // fourtiesTests = loadTable('data/tests_country_decadeCol.csv', 'csv', 'header'); 
  reactors = loadTable('data/reactors_country_decadeRow.csv', 'csv', 'header');
  // reactorData = loadTable('data/reactors_country_decadeCol.csv', 'csv', 'header');
  // print(reactors)
}

function palette(){

}

function setup(){
  createCanvas(800, 1200, SVG)
  background(250)
  colorMode(RGB, 100)
  // var data = tests

// TITLE
  // push(); 
  // let title = 'Do nuclear tests lead to nuclear power development?'
  // textSize(14)
  // textFont("futura-pt")
  // fill(30)
  // text(title, 70, 30)
  // textAlign(CENTER)
  // pop(); 

// TEST CHART

  var x = 200
  var y = 100
  var rowHeight = 60
  var colWidth = 40

    // for (let f=0; f<tests.getRowCount(); f++){
     // var row = tests.getRow(f)
     // var g = row.getNum('1940')
     //    push();
     //    noStroke()
     //    fill('red')
     //    rect(x, y, g+10, 10)
     //    pop();

  // for (var c=1; c<tests.getColumnCount(); c++) {
  //   var testData = tests.getColumn(c)
  //     print(testData)
  //   }

  for (var r=0; r<tests.getRowCount(); r++) {
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1940')
      noStroke()
      fill('red')
      rect(300, r * 20 + 400, testBar*10, 10)
      text(tests.getString(r, 0), 200, r * 20 + 410)


      print(testData)
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
 }
