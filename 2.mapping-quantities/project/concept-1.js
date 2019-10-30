var data
var padding = 50
var totals 
var timeframe 


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
  let t = 'What kinds of nuclear tests do they run?'
  textSize(40)
  textStyle(BOLD)
  textFont("Open Sans")
  fill(30)
  text(t, 65, 30, 500, 200)
  textAlign(LEFT)
  pop(); 

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

// place country names to the left
  textFont("Open Sans")
  textAlign(LEFT)
  for (var c=1; c<totals.getColumnCount(); c++){
    text(totals.columns[c], x-colWidth, y)
    y += rowHeight
  }

  // place years at the bottom
  x = 200
  y = 750
  textStyle(NORMAL)
  textAlign(CENTER)
  for (var r=0; r<totals.getRowCount(); r++){
    var year = totals.getString(r, 0)
    text(year, x, y-rowHeight)
    x += colWidth
  }

// map all to circles
  x = 200
  for (var r=0; r<totals.getRowCount(); r++){
    y = 200
    for (var c=1; c<totals.getColumnCount(); c++){
      var value = totals.getNum(r, c)  
      if (value > 0) { 
          fill('yellow')
          circle(x, y, value+25)
        } 
      y += rowHeight
    }
    x += colWidth
     }


save('concept_1.svg')

}
