
var consumption

function preload(){
  consumption = loadTable('data/consumption_trimmed.csv', 'csv', 'header')
}

function setup(){
  createCanvas(4500, 1000, SVG)
  background(230)

  // pick one of the three data files to work with and call it 'table'
  var table = consumption

  // log the whole dataset to the console so we can poke around in it
  print(table)

// title
  push(); 
  let t = 'How much energy do we consume?'
  textSize(40)
  textStyle(BOLD)
  textFont("Open Sans")
  fill(30)
  text(t, 65, 30, 500, 200)
  textAlign(LEFT)
  pop();

  // set up typography
  textFont("Open Sans")
  textSize(16)
  fill(30)
  noStroke()

  var x = 200
  var y = 250
  var rowHeight = 70
  var colWidth = 140

  // draw country name labels on the left edge of the table
  textStyle(BOLD)
  textAlign(RIGHT)
  for (var c=1; c<table.getColumnCount(); c++){
    text(table.columns[c], x-colWidth, y)
    y += rowHeight
  }


  // draw year labels in the header row
  x = 200
  y = 250
  textStyle(BOLD)
  textAlign(CENTER)
  for (var r=1; r<table.getRowCount(); r++){
    var year = table.getString(r, 0)
    text(year, x, y-rowHeight)
    x += colWidth
  }

// map usage to circles
  x = 200
  for (var r=1; r<table.getRowCount(); r++){
    y = 250
    for (var c=1; c<table.getColumnCount(); c++){
      var value = table.getNum(r, c)  
      if (value > 0) { 
          fill('red')
          circle(x, y, value/50)
        } 
      y += rowHeight
    }
    x += colWidth
     }

 // save('Global Energy Consumption.svg')

}