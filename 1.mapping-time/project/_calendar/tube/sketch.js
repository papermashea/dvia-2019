function setup() {
  // set the width & height of the sketch
  createCanvas(800, 800)

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())

}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  background(200)
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(30, 15, 8, 8);

}