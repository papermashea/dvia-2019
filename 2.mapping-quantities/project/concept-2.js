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
	textAlign(CENTER);
	textSize(50)
	fill(150)
	text('Environmental Testing', width/2, 0+padding)

	var table = atmospheric
	print(table)

	  textFont("Rokkitt")
	  textSize(16)
	  fill(30)
	  noStroke()


	var x = 200
	var y = 100
	var rowHeight = 60
	var colWidth = 40

	x = 200
	y = 100
	textStyle(NORMAL)
	textAlign(BOLD)
	  for (var r=0; r<table.getRowCount(); r++){
	    var year = table.getString(r, 0)
	    text(year, x, y-rowHeight)
	    x += colWidth
	  }


// draw timeframe
	line(100, 100, 200, 200)



// draw tests
 //  for (var i = 0; i < data.getRowCount(); i++) {
 //  	let size = colValsMinMax(data,"yield");
	// let testSize = map(size.values[i], size.min, size.max, 1, 400);
 //    //let xpos = map(x.values[i], x.min, x.max, 0+padding, width-padding);
 //    //let ypos = map(y.values[i], y.min, y.max, height-padding, 0+padding);
	// }
    
 //    circle(xpos, ypos, circleSize)


// map colors
//  let colorScale  = chroma.scale(['green', 'blue']).mode('lch');

}
