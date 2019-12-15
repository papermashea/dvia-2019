// function setup() {
//   // Sets the screen to be 720 pixels wide and 400 pixels high
//   createCanvas(800, 800);
//   background(0);
//   noStroke();
  
//    fill(232, 151, 168);
//    triangle(41, 254, -13, 444, -73, 444);
//    fill(206, 122, 137);
//    triangle(41, 254, -13, 444, 119, 444);

// }

var p = 'Some say the world will end in fire, Some say in ice.'

function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(250);
  translate(0, 0, 0);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(70);
  pop();

textSize(32);
fill(150);
text(p, 100, 300);
}



