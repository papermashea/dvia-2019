var x = 0 // starting x position to draw
var y = 800  // starting y position to draw
var z = 0
var barWidth = 800 // height of each bar
var sourceWidth = 200
var maxHeight = -800 // maximum height of each bar (the actual width will always be ≤ this)
var sourceHeight = 800
var spacing = 10 // the vertical space to skip between bars
var discrete = false 
var colors = ['darkblue','steelblue','darkslategrey']
var gradient = chroma.scale(colors).mode('lab')

function colorForProgress(pct){
  return gradient(pct).hex()
}



function setup() {
  createCanvas(800, 800)
}

//this gets called every frame (about 60 frames per second)
function draw() {
  background('white')
  noStroke()

  // measure the current time & calculate the width in pixels of each bar
  var now = clock()
  if (discrete){
    // the map() function lets us *normalize* a value from a starting range then *project* it into another range
    var hourHeight = map(now.hour, 1,12, 0,maxHeight) // from hours (1-12) to pixels (0–maxWidth)
    var minsHeight = map(now.min,  0,60, 0,maxHeight)  // from mins (0–60) to pixels (0–maxWidth)
    var secsHeight = map(now.sec,  0,60, 0,sourceHeight)  // from secs (0–60) to pixels (0–maxWidth)
  }else{
    // alternatively, we can use the clock's 'progress' percentages
    hourHeight = maxHeight * now.progress.day
    minsHeight = maxHeight * now.progress.hour
    secsHeight = sourceHeight * now.progress.min
  }

  var color = colorForProgress(now.progress.hour)

  // ...the seconds bar in the middle...
  fill(0, 0, 255)
  rect(x, z, sourceWidth, secsHeight)

  // ...the minutes bar in the middle...
  fill(color)
  rect(x, y,  barWidth, minsHeight)


}