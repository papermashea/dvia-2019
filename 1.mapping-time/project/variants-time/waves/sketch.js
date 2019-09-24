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

var phase = 0

function draw() {
  background(255)
  noStroke()

  phase += .01 // this controls the speed of the horizontal drift
  var now = clock()
  var secSpeed = map(now.sec, 0, 60)
  var secSpeed = now.progress.min

  var minSpeed = map(now.min, 0, 60)
  var minSpeed = now.progress.hour

  var hourSpeed = map(now.hour, 1,12)
  var hourSpeed = now.progress.day


  let amp = 100 // the vertical size of the largest wave

  fill(255,255,0, 160)
  drawWave(height*.2, amp*now.progress.day, 2*now.progress.day, phase*hourSpeed)

  fill(255,0,255, 160)
  drawWave(height*.3, amp*now.progress.hour, 4*now.progress.hour, phase*minSpeed)

  fill(0,255,255, 160)
  drawWave(height*.4, amp*now.progress.min, 8*now.progress.min, phase*secSpeed)
}
