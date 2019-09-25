// shades of the hours
var colors = ['darkblue','steelblue','darkslategrey']

// the colorForProgress() function takes a 'progress' value between 0.0 and 1.0 and returns a hex string
// that can be passed to p5 functions like background(), fill(), stroke(), etc.
// see the chroma.js docs for details: https://vis4.net/chromajs
var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()
}

function setup() {
  // set the width & height of the sketch
  createCanvas(400, 200)

  // draw will be called this many times per second
  frameRate(60)
}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var depth = clock()

  // use the current 'doneness' of the current hour to choose the background color from our gradient
  // (note that setting the background also clears the canvas from our previous round of drawing)
  var color = colorForProgress(depth.progress.hour)
  background(color)

  // set up typography & drawing-color
  let pointSize = 42
  textFont("Nixie One")
  textSize(pointSize)
  textAlign(CENTER)
  fill('white')

  // print the time string to the canvas
  text(depth.text.time, width/2, height/2 + pointSize/3)
}
