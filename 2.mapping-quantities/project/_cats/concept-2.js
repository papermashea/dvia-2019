var data
var tests 
var palette

function preload(){
  tests = loadTable('data/tests_country_decadeCol.csv', 'csv', 'header');
}

function setup(){
  createCanvas(1500, 1200, SVG)
  background(250)
  // colorMode(RGB, 100)
  // palette = Brewer.qualitative('Accent', ['China','France','India','North Korea','Pakistan','Russia','United Kindom','United States']);
  palette = Brewer.qualitative('Accent', 8);
    print(palette)

// TEST CHART
  var x = 200
  var y = 100
  var rowHeight = 60
  var colWidth = 40

  for (var r=0; r<tests.getRowCount(); r++) {   
    var testData = tests.getRow(r)
    var testBar = testData.getNum('1940')
    var country = tests.getRowCount('Country')
    // print(country) 
    var color = palette.colorForValue()
      noStroke()
      fill(color)
      rect(300, r * 20 + 400, testBar*10, 10)
      text(tests.getString(r, 0), 200, r * 20 + 410)

      // print(testData)
    
    }
}
