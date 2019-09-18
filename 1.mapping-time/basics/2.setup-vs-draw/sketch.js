var length = 100; // define a 'state' variable letting us know how big of a square to draw

// The statements in the setup() function execute a single time when the program begins
function setup() {
  createCanvas(720, 400); // createCanvas must be the first statement
  stroke(255); // Set line drawing color to white
  rectMode(CENTER); // the rect() command will draw from the center rather than the corner
  frameRate(10); // update the screen (by calling draw()) 60 times per second
}

// The statements in draw() are executed until the program is stopped.
// Each statement is executed in sequence until the function 'exits'.
// A fraction of a second later the function will start again, running from first line to last.
function draw() {
  // Set the background to black (and clear the screen in the process)
  // background(0,0,255,8);

  // decrement the current length value
  length = length - 2;
  if (length < 0) {
    length = height;
  }

  // draw a square in the center of screen, using the 'length' variable to set its dimensions.
  // ('width' & 'height' are automatic variables based on our createCanvas args)
  rect(width/2, height/2, length, length);
}
