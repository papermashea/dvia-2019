var maxHeight = 6 // maximum height of wave


function setup() {
  createCanvas(800,600)
}

function drawWave(y, amplitude, count, phase){
  // y: the vertical position of the *middle* of the waveform
  // amplitude: the height between the top of a peak and depth of a trough
  // count: the number of peaks to be drawn (a.k.a. 'frequency')
  // phase: the amount to shift the wave by horizontally
  beginShape()
  let resolution = 2
  for (var x=0; x<=canvas.width+resolution; x+=resolution){
    vertex(x, amplitude*cos(TWO_PI*count * x/width - phase*count) + y)
  }
  vertex(canvas.width, canvas.height)
  vertex(0, canvas.height)
  endShape(CLOSE)
}

// measure the current time & calculate the height in pixels of each bar
// var now = clock()
// if (discrete){
  // the map() function lets us *normalize* a value from a starting range then *project* it into another range
  // var hourHeight = map(now.hour, 1,12, 0, ) // from hours (1-12) to pixels (0–maxWidth)
  // var minHeight = map(now.min,  0,60, 0)  // from mins (0–60) to pixels (0–maxWidth)
//   var secsHeight = map(now.sec, 0,60, 0, maxHeight)  // from secs (0–60) to pixels (0–maxWidth)
// }else{
    // alternatively, we can use the clock's 'progress' percentages
    // hourWidth = maxHeight * now.progress.day
    // minsWidth = maxHeight * now.progress.hour
  //   secsHeight = maxHeight * now.progress.min
  // }


var phase = 0

function draw() {
  background(255)
  noStroke()

  phase += .01 // this controls the speed of the horizontal drift
  var now = clock()
  var secSpeed = map(now.sec, 0, 60, 0, 10)
  var secSpeed = now.progress.min

  var minSpeed = map(now.min, 0, 60, 0, 10)
  var minSpeed = now.progress.hour

  var hourSpeed = map(now.hour, 0, 60, 0, 10)
  var hourSpeed = now.progress.day


  let amp = 20 // the vertical size of the largest wave

  fill(255,255,0, 160)
  drawWave(height*.22, amp*now.progress.day, 4, phase*hourSpeed)

  fill(255,0,255, 160)
  drawWave(height*.33, amp*now.progress.min, 4, phase*minSpeed)

  fill(0,255,255, 160)
  drawWave(height*.44, amp*now.progress.hour, 4, phase*secSpeed)
}
