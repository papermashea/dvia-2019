var palette // will hold the colors that correspond to the seasons
var cloudX = 300;
var sunRadius = 100;


function setup() {
  // set the width & height of the sketch
  createCanvas(800, 800)

  background(255)

  colorMode(RGB, 255, 255, 255, 1)
  seasons = [
    color('pink'),  // jan
    color('red'),  // april
    color('orange'),  // july
    color('lightyellow'), // sept
    color('yellow'), // sept
    color('lightgreen'), // sept
    color('green'), // sept
    color('teal',), // sept
    color('lightblue'), // sept
    color('blue'), // sept
    color('purple'), // sept
    color('brown'), // sept

  ]
}

function draw() {
  var now = clock()
  strokeWeight(0)
  fill(seasons[(now.month) % 12])
  circle(400,200,100)

  // clouds 
    // cloud1
    fill (220,.2)
    ellipse(cloudX, 200, 1000, 30);
    fill (180,.2)
    ellipse(cloudX+400, 200, 800, 20);
    fill (120,.2)
    ellipse(cloudX-200, 200, 700, 10);
    
    // cloud 2
    fill (220,.2)
    ellipse(cloudX, 225, 800, 30);
    fill (180,.2)
    ellipse(cloudX+300, 225, 800, 20);
    fill (120,.2)
    ellipse(cloudX-300, 225, 900, 10);

    // cloud 3
    fill (220,.2)
    ellipse(cloudX, 225, 600, 10);
    fill (180,.2)
    ellipse(cloudX+200, 225, 800, 10);
    fill (120,.2)
    ellipse(cloudX-200, 225, 900, 20);
}
