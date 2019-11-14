var data
var padding = 50
var nuclearElectricity_trimmed

function preload(){
  electricity = loadTable('data/nuclearElectricity_trimmed.csv', 'csv', 'header')
}


function setup(){
	createCanvas(1100, 800, SVG)
	background(250)
  var energy = electricity

// title
  push(); 
  let t = 'Nuclear tests vs. energy consumption'
	textSize(40)
  textStyle(BOLD)
  textFont("Open Sans")
	fill(30)
	text(t, 65, 30, 500, 200)
  textAlign(LEFT)
  pop(); 

	print(energy)

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
  for (var c=1; c<energy.getColumnCount(); c++){
    text(energy.columns[c], x-colWidth, y)
    y += rowHeight
  }

  // place years at the bottom
  x = 200
  y = 750
  textStyle(NORMAL)
  textAlign(CENTER)
  for (var r=0; r<energy.getRowCount(); r++){
    var year = energy.getString(r, 0)
    text(year, x, y-rowHeight)
    x += colWidth
  }

// map tests to circles
  // x = 200
  // for (var r=0; r<atmosData.getRowCount(); r++){
  //   y = 200
  //   for (var c=1; c<atmosData.getColumnCount(); c++){
  //     var value = atmosData.getNum(r, c)  
  //     if (value > 0) { 
  //         fill('purple')
  //         circle(x, y, value+25)
  //       } 
  //     y += rowHeight
  //   }
  //   x += colWidth
  //    }

// draw spend line
  var energyYear = colValsMinMax(spend,"year");
  var energy = colValsMinMax(spend,"percent");

  for (var i = 1; i < energy.getRowCount(); i++) {
    let xpos = map(energyYear.values[i], x.min, x.max, 0+padding, width-padding);
    let ypos = map([percent].values[i], 0, percent.max, graphCenter, 0+padding);
    let xpos2 = map(spendYear.values[i+1], x.min, x.max, 0+padding, width-padding);
    let ypos2 = map(percent.values[i+1], 0, percent.max, graphCenter, 0+padding);
    stroke(0,200,0)
    line(xpos, ypos, xpos2, ypos2);
    console.log(percent.values[i], ypos);
  }


// save('concept_5.svg')

}
