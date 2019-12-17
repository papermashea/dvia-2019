var data
var tests 
var reactors
var testing =[]

function preload(){
  // tests = loadTable('data/tests_country_decadeRow.csv', 'csv', 'header');
  tests = loadTable('data/tests_country_decadeCol.csv', 'csv', 'header');
  // print(tests)
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


// title and intro
  // push(); 
  // let title = 'Do nuclear tests lead to nuclear power development?'
  // textSize(14)
  // textFont("futura-pt")
  // fill(30)
  // text(title, 70, 30)
  // textAlign(CENTER)
  // pop(); 

  // TEST CHART
  // decade = tests.getRow();
  // decades = tests.getColumnCount();
  // countries = tests.getColumn() 
  // print(countryData)

  countryRows = tests.getRowCount();
  fourties = tests.getColumnCount();
  // print(fourties)

  // // DECADE
  // for (var d = 0; d < decades; d++) {
  //   text(tests.getString(d, 0), 200, d * 20 + 400);

  // COUNTRIES
  for (var c = 0; c < countryRows; c++) {
    text(tests.getString(c, 0), 200, c * 20 + 400);

  for (var d = 0; d < fourties; d++) {
    text(tests.getString(d, 0), 220, d * 20 + 400);
}
  
//     // 1940s
//   for (var e = 1; e < fourties; e++) {
//       fourtiesBar = fourties.getNum()
//       fill(black)
//       rect(220, c * 20 + 400, fourtiesBar * 10, 10);
// }
} 
 // save('Nuclear Tests & Reactors by Decade: Bars.svg')
}
