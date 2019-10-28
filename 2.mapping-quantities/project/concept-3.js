var years

function preload(){
  years = loadTable('data/1994-2003.csv','csv', 'header'); 
}

function setup(){
  createCanvas(1460, 800)
  background(250)

  // pick one of the three data files to work with and call it 'table'
  var table = years

  // log the whole dataset to the console so we can poke around in it
  print(table)

  // set up typography
  textFont("Rokkitt")
  textSize(14)
  fill(30)
  noStroke()

  var x = 200
  var y = 100
  var rowHeight = 60
  var colWidth = 130

  //draw a title
  push(); 
  let s = 'Nuclear testing';
  fill(50);
  textSize(20)
  textStyle(BOLD)
  text(s, 65, 30, 500, 200);
  pop(); 

  // draw years labels on the left edge of the table
  textStyle(NORMAL)
  textAlign(LEFT)
  for (var c=1; c<table.getColumnCount(); c++){
    text(table.columns[c], x-colWidth, y)
    y += rowHeight
  }

  // draw country labels below
  x = 200
  y = 800
  textStyle(NORMAL)
  textAlign(CENTER)
  for (var r=0; r<table.getRowCount(); r++){
    var year = table.getString(r, 0)
    text(year, x, y-rowHeight)
    x += colWidth
  }


  // add a shape for each countries values, one column at a time
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
