/* Adapted from https://processing.org/examples/clock.html */

var cx, cy; // center position of canvas
var discrete = false // ticking motion?

// Radius for hands of the clock
var secondsRadius
var minutesRadius
var hoursRadius
var clockDiameter
var dotRadius
var tickRadius

var discrete = true

function setup() {
  createCanvas(640, 360)
  stroke(255)
  background('white')

  var radius = min(width, height) / 2; // this is the maximum possible radius
  secondsRadius = radius * 0.725
  minutesRadius = radius * 0.60
  hoursRadius = radius * 0.50
  tickRadius = radius * .7
  dotRadius = radius * .75
  clockDiameter = radius * 1.666

  cx = width / 2
  cy = height / 2


var dots = min(width, height) / 2; // this is the maximum possible radius
  seedRowOne = radius * 0.725
  seedRowTwo = radius * 0.60
  seedRowThree = radius * 0.50
  seedRowFour = radius * .7
  seedRowFive = radius * .75
  seedRowSix = radius * 1.666
}

function draw() {
  background('white')

  // Draw the clock background
  fill('white')
  noStroke()
  ellipse(cx, cy, clockDiameter, clockDiameter)
  

  // draw petals around the radius
  stroke(1)
  stroke('red')
  for (var a = 0; a < 360; a+=6) {
    let angle = radians(a),
        x0 = cx + cos(angle) * minutesRadius,
        x1 = cx + cos(angle) * minutesRadius,
        y0 = cy + sin(angle) * minutesRadius,
        y1 = cy + sin(angle) * minutesRadius
    line(x0, y0, x1, y1)
  }

  stroke(1)
    stroke('green')
    for (var a = 0; a < 360; a+=6) {
      let angle = radians(a),
          x0 = cx + cos(angle) * secondsRadius,
          x1 = cx + cos(angle) * secondsRadius,
          y0 = cy + sin(angle) * secondsRadius,
          y1 = cy + sin(angle) * secondsRadius
      line(x0, y0, x1, y1)
    }

stroke(2)
stroke('green')

  // Angles for sin() and cos() start at 3 o'clock
  // subtract HALF_PI to make them start at the top
  var now = clock()
  var s = (now.progress.min * TWO_PI) - HALF_PI
  var m = (now.progress.hour * TWO_PI) - HALF_PI
  var h = (now.progress.halfday * TWO_PI) - HALF_PI

  if (discrete){
    // L[inearly] [int]ERP[olate] from the current fraction of a minute to a
    // proportional value in the range 0–2π (for a 'ticking' effect)
    s = lerp(0, TWO_PI, now.sec/60) - HALF_PI
  }

  // Draw the lit petal
  ellipse('blue')
  ellipse(1)
  ellipse(cx, cy, cx + cos(s)*secondsRadius, cy + sin(s)*secondsRadius)
}