var data
var padding = 50
var totals 

function preload(){
  totals = loadTable('data/totals.csv', 'csv', 'header')
  atmospheric = loadTable('data/atmospheric.csv', 'csv', 'header')
  underground = loadTable('data/underground.csv', 'csv', 'header')
  hydronuclear = loadTable('data/hydronuclear.csv', 'csv', 'header')
}


function setup(){
  createCanvas(11000, 800)
  background(250)

// title
  push(); 
  let t = 'Who is running nuclear tests?'
  textSize(40)
  textStyle(BOLD)
  textFont("Open Sans")
  fill(30)
  text(t, 65, 30, 500, 200)
  textAlign(LEFT)
  pop(); 

  var atmosData = atmospheric
  var underData = underground
  var hydroData = hydronuclear
  print(totals)

// axes text
  textFont("Open Sans 300")
  textSize(10)
  textStyle(NORMAL)
  fill(30)
  noStroke()

// draw table
var x = 200
  var y = 200
  var rowHeight = 60
  var colWidth = 140

// place countries at the bottom
  x = 200
  y = 450
  textFont("Open Sans")
  textStyle(NORMAL)
  textAlign(CENTER)
  for (var c=1; c<totals.getColumnCount(); c++){
    text(totals.columns[c], x, y)
    x += colWidth
  }

// map tests to circles
  x = 100
  y = 200 
  for (var i=0; i<totals.getColumn(); i++){
    var value = totals.getNum(i, 0)  
          fill('purple')
          circle(x += colWidth, y, value/10)
     }



//save('concept_2.svg')

}
