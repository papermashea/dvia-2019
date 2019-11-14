var data
var padding = 50
var totals 
var atmospheric
var timeframe 


function preload(){
  totals = loadTable('data/totals.csv', 'csv', 'header')
  atmospheric = loadTable('data/atmospheric.csv', 'csv', 'header')
  underground = loadTable('data/underground.csv', 'csv', 'header')
  hydronuclear = loadTable('data/hydronuclear.csv', 'csv', 'header')
}


function setup(){
  createCanvas(11000, 800, SVG)
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

// map tests to circles
// atmospheric tests
  x = 200
  for (var r=0; r<atmosData.getRowCount(); r++){
    y = 200
    for (var c=1; c<atmosData.getColumnCount(); c++){
      var value = atmosData.getNum(r, c)  
      if (value > 0) { 
          fill('purple')
          circle(x, y, value+25)
        } 
      y += rowHeight
    }
    x += colWidth
     }


// hydronuclear tests
  x = 200
  for (var r=0; r<hydroData.getRowCount(); r++){
    y = 200
    for (var c=1; c<hydroData.getColumnCount(); c++){
      var value = hydroData.getNum(r, c)  
      if (value > 0) { 
          fill('blue')
          circle(x, y, value+25)
        } 
      y += rowHeight
    }
    x += colWidth
     }

// underground tests
  x = 200
  for (var r=0; r<underData.getRowCount(); r++){
    y = 200
    for (var c=1; c<underData.getColumnCount(); c++){
      var value = underData.getNum(r, c)  
      if (value > 0) { 
          fill('green')
          circle(x, y, value+25)
        } 
      y += rowHeight
    }
    x += colWidth
     }

save('concept_2.svg')

}
