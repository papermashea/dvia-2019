var totals
var hydroElectricity
var nuclearElectricity

function preload(){
  hydroElectricity = loadTable('data/hydroElectricity_trimmed.csv', 'csv', 'header')
  nuclearElectricity = loadTable('data/nuclearElectricity_trimmed.csv', 'csv', 'header')
}

function setup(){
  createCanvas(3200, 800)
  background(230)

  // pick one of the three data files to work with and call it 'table'
  var table = hydroElectricity

  // log the whole dataset to the console so we can poke around in it
  print(table)

// title
  push(); 
  let t = 'What kind of energy do we produce?'
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
  var y = 200
  var rowHeight = 60
  var colWidth = 70

  // draw country name labels on the left edge of the table
  textStyle(BOLD)
  textAlign(RIGHT)
  for (var c=1; c<table.getColumnCount(); c++){
    text(table.columns[c], x-colWidth, y)
    y += rowHeight
  }


  // draw year labels in the header row
  x = 200
  y = 700
  textStyle(NORMAL)
  textAlign(BOLD)
  for (var r=0; r<table.getRowCount(); r++){
    var year = table.getString(r, 0)
    text(year, x, y-rowHeight)
    x += colWidth
  }

 // map usage to circles
   x = 200
  for (var r=0; r<table.getRowCount(); r++){
    y = 200
    for (var c=1; c<table.getColumnCount(); c++){
      var value = table.getNum(r, c)  
      if (value > 0) { 
          fill('yellow')
          circle(x, y, value*100)
        } 
      y += rowHeight
    }
    x += colWidth
     }

//  save('concept_4.svg')

 }