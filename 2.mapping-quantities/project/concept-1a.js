var data
var tests 
var reactors
// let height = window.innerHeight;
// let width = window.innerWidth;


function preload(){
  tests = loadTable('data/tests_country_decadeRow.csv', 'csv', 'header');
  testData = loadTable('data/tests_country_decadeCol.csv', 'csv', 'header');
  // print(tests)
  reactors = loadTable('data/reactors_country_decadeRow.csv', 'csv', 'header');
  reactorData = loadTable('data/reactors_country_decadeCol.csv', 'csv', 'header');
  // print(reactors)
}


function setup(){
  createCanvas(1000, 1000, SVG)
  background(250)
  colorMode(RGB, 100)

// title and intro
  push(); 
  let title = 'Do nuclear tests lead to nuclear power?'
  textSize(14)
  textFont("futura-pt")
  fill(30)
  text(title, 80, 30)
  textAlign(CENTER)
  pop(); 

  // push();
  // let intro = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
  // textSize(8)
  // textFont("futura-pt")
  // fill(30)
  // text(intro, 200, 50)
  // textAlign(CENTER)
  // pop(); 

  // // DRAW YEARS LABELS
  // textStyle(BOLD)
  // textAlign(CENTER)
  // textSize(8)
  // textFont("futura-pt")
  // fill(30)

  // CHART
  // var x = 200
  // var y = 80
  var rowHeight = 40
  var colWidth = 40

    // DRAW YEARS
    x = 400
    y = 140
    textSize(6)
    textFont("futura-pt")
    fill(30)
    textAlign(CENTER)

    for (var r=0; r<tests.getRowCount(); r++){
      var year = tests.getString(r, 0)
      noStroke()
      text(year, x, y-rowHeight)
      strokeWeight(.1)
      stroke(20,20,20)
      line(x-25, y-rowHeight, x-380, y-rowHeight) // REACTOR LINES
      // line(x+25, y-rowHeight, x+340, y-rowHeight)  // TEST LINES
      y += colWidth
    }

  // TESTS TITLE
      textSize(8)
      textFont("futura-pt")
      noStroke()      
      fill(0,20,120,100) // blue
      textStyle(NORMAL)
      textAlign(CENTER)
      text('Nuclear Tests Run', 130, 50)

  // REACTORS TITLE
      textSize(8)
      textFont("futura-pt")
      noStroke()
      fill(120,60,40,100) // orange
      textStyle(NORMAL)
      textAlign(CENTER)
      text('Nuclear Reactors Connected', 250, 50)


  // DRAW TESTS FOR EACH COUNTRY
  x = 40
  for (var r=0; r<testData.getRowCount(); r++){
    y = 100
    for (var c=1; c<testData.getColumnCount(); c++){
      var value = testData.getNum(r, c)
      if(value>0)
      // text(value, x, y)
          noStroke()
          fill(0,20,120,20) // blue
          circle(x, y, value/4)
          y += rowHeight
        }
    x += colWidth
  }

  // LABEL COUNTRIES FOR REACTORS
    x = 80
    y = 80
      textSize(4)
      textFont("futura-pt")
      fill(30)
      textStyle(NORMAL)
      textAlign(CENTER)
      for (var c=1; c<reactors.getColumnCount(); c++){
        text(reactors.columns[c], x-colWidth, y)
        x += rowHeight
      }

  // DRAW REACTORS FOR EACH COUNTRY
  x = 40
  for (var r=0; r<reactors.getRowCount(); r++){
    y = 100
    for (var c=1; c<reactors.getColumnCount(); c++){
      var value = reactors.getNum(r, c)
      if(value>0)
          noStroke()
          fill(120,60,40,20) // orange        
          circle(x, y, value)
        // text(value, x, y)
          y += rowHeight
        }
    x += colWidth
  }

     

// save('Nuclear Tests & Reactors by Decade (condensed).svg')
}
