function setup() {
  createCanvas(800, 600)
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
  background(0)
  noStroke()

  phase += .01 // this controls the speed of the horizontal drift

  let amp = 50 // the vertical size of the largest wave

  fill(40)
  drawWave(height*.11, amp, 2, -phase/2)

  fill('red')
  drawWave(height*.3, amp, 4, phase*2)

  fill('orange')
  drawWave(height*.5, amp/2, 8, phase)

  fill('yellow')
  drawWave(height*.66, amp/4, 16, phase/2)
}

