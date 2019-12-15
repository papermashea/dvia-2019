// shades of the hour
var colors = ['darkblue','steelblue','darkslategrey']
var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()
}

var hRot = 0


function setup() {
  createCanvas(800, 800);
  frameRate(60)
}

function draw() {
  var now = clock()
  var color = colorForProgress(now.progress.hour)
  var hMax = PI/14;
  hRot += now.hour/24 * hMax;

  background(102, 70);
  noStroke()

  /*days of the week*/
  push();
  translate(width*0.8, height*0.5);
  rotate(hRot);
  fill(color);
  polygon(0, 0, 60, 14);
  pop();
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}