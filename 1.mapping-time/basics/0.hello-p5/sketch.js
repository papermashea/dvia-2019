
function setup() {
  createCanvas(512, 256); // set the size of the canvas
<<<<<<< HEAD
  frameRate(60) // redraw the screen 60 times per second
  background(44) // fill the canvas with black pixels
  print("Hello, javascript console.")
  print('The PS canvas is ${width}px wide and ${height}px tall')
}

function draw() {
  // set parameters that will affect our drawing commands below
  ellipseMode(CENTER)
  textAlign(CENTER)
  textSize(72)
  noStroke()

  // pick random values to decide on location, size, and opacity of the next dot
  var x = random(width),
      y = randomGaussian(height/2, height/8),
      r = random(4, 200),
      c = color(255, random(100));
=======
  background(255) // fill the canvas with black pixels
  print("Hello, javascript console.")
  print(`The P5 canvas is ${width}px wide and ${height}px tall`)

  // display out greeting message in medium grey
  fill(127) // grey value between 0–255
  textSize(60) // size in pixels
  text("Hello P5 👋", 90, height/2) // (message, x, y)
>>>>>>> 686a14112ab9168151462f568ffcc9b816a20150

  // pick a light grey fill and bright red stroke to draw shapes with
  fill(200)         // a single value is greyscale
  stroke(200, 0, 0) // three values are red/green/blue
  strokeWeight(4)   // line weight in pixels

  // draw three shapes
  square(100, 200, 40) // (x, y, size)
  circle(200, 200, 40) // (x, y, radius)
  arc(300, 200, 100, 100, -PI, -HALF_PI) // (x, y, w, h, start, stop)
}

