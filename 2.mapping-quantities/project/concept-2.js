var data
var padding = 50
var totals 
var atmospheric
var timeframe 


function preload(){
  totals = loadTable('data/totals.csv', 'csv', 'header')
  atmospheric = loadTable('data/atmospheric.csv', 'csv', 'header')

}


function setup(){
	createCanvas(3200, 600)
	background(250)

// title
	textAlign(CENTER);
	textSize(50)
	fill(150)
	text('Environmental Testing', width/2, 0+padding)

	var table = atmospheric
	print(table)

// typography
	textFont("Rokkitt")
	textSize(16)
	fill(30)
	noStroke()

// draw tests
var x = 200
  var y = 100
  var rowHeight = 60
  var colWidth = 130

  // draw country name labels on the left edge of the table
  textStyle(NORMAL)
  textAlign(RIGHT)
  for (var c=1; c<table.getColumnCount(); c++){
    text(table.columns[c], x-colWidth, y)
    y += rowHeight
  }


  // draw year labels in the header row
  x = 200
  y = 100
  textStyle(NORMAL)
  textAlign(CENTER)
  for (var r=0; r<table.getRowCount(); r++){
    var year = table.getString(r, 0)
    text(year, x, y-rowHeight)
    x += colWidth
  }

  // print out the total for each country, one column at a time
  x = 200
  for (var r=0; r<table.getRowCount(); r++){
    y = 100
    for (var c=1; c<table.getColumnCount(); c++){
      var value = table.getNum(r, c)  
      if (value > 0) { 
          fill(50)
          circle(x, y, value+25)
        } 
      y += rowHeight
    }
    x += colWidth
     }

}
