//sun variables
var colors = ['darkblue','steelblue','darkslategrey']
var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()
}
var hRot = 0


//cloud variables
var cloudX = 400;

// snow variables
let snowflakes = []; // array to hold snowflake objects
var x = 0 // starting x position to draw
var y = 800  // starting y position to draw
var barWidth = 800 // height of each bar
var maxHeight = -200 // maximum height of each bar (the actual width will always be ≤ this)
var spacing = 10 // the vertical space to skip between bars
var discrete = false


function setup() {
  createCanvas(800, 800);
  colorMode(RGB, 255, 255, 255, 1)
}

function draw() {
  var now = clock()
  noStroke()

//sun
  var color = colorForProgress(now.progress.hour)
  var hMax = PI/14;
  hRot += now.hour/24 * hMax;
  background(240, 70);


  //days of the week
  push();
  translate(width*0.5, height*0.25);
  rotate(hRot);
  fill(color);
  polygon(0, 0, 60, 20);
  pop();

// clouds 
  // cloud1
    fill (220,.2)
    ellipse(cloudX, 200, 1000, 30);
    fill (180,.2)
    ellipse(cloudX+400, 260, 800, 20);
    fill (120,.2)
    ellipse(cloudX-200, 260, 700, 10);
    fill (110,.2)
    ellipse(cloudX+300, 250, 1000, 30);
    fill (40,.2)
    ellipse(cloudX+100, 225, 800, 20);
    fill (250,.2)
    ellipse(cloudX-20, 180, 700, 10);   
  // cloud 2
    fill (220,.2)
    ellipse(cloudX, 225, 800, 30);
    fill (180,.2)
    ellipse(cloudX-300, 200, 1000, 20);
    fill (120,.2)
    ellipse(cloudX-300, 225, 900, 10);
    fill (240,.2)
    ellipse(cloudX, 200, 1000, 30);
    fill (160,.2)
    ellipse(cloudX-150, 200, 900, 20);
    fill (80,.2)
    ellipse(cloudX-100, 275, 900, 10);
  // cloud 3
    fill (220,.2)
    ellipse(cloudX, 225, 600, 10);
    fill (180,.2)
    ellipse(cloudX+200, 225, 800, 10);
    fill (120,.2)
    ellipse(cloudX-200, 225, 900, 20);

//snowfall
  // snowflakes falling 
    let t = frameCount*.1 / map(now.month, 0, 60, 0, 10); 
    for (let i = 0; i < random(3); i++) {
      snowflakes.push(new snowflake()); 
    }

    // snowflake loop
    for (let snowflake of snowflakes) {
      snowflake.update(t); // update snowflake position
      snowflake.display(); // draw snowflake
    }

  // snowflake pile
    if (discrete){
      // the map() function lets us *normalize* a value from a starting range then *project* it into another range
      var snowHeight = map(now.month, 1,12, 0,maxHeight) // from hours (1-12) to pixels (0–maxWidth)
     }else{
      // alternatively, we can use the clock's 'progress' percentages
      snowHeight = maxHeight * now.progress.month
    }

    // ...the minutes for the snowflake pile in the middle...
    fill('lightblue')
    rect(x, y,  barWidth, snowHeight)

// mountains
  // mountain 1
    fill(206, 122, 137);
    triangle(51, 554, -13, 874, -73, 894);
    fill(232, 151, 168);
    triangle(51, 554, -13, 874, 119, 894);
  // mountain 2
    fill(10, 30, 49);
    triangle(111, 526, 157, 816, -3, 816);
    fill(31, 60, 78);
    triangle(111, 526, 257, 816, 89, 816);
  // mountain 3
    fill(127, 201, 201);
    triangle(158, 634, 143, 880, 20, 880);
    fill(175, 232, 229);
    triangle(158, 634, 133, 880, 303, 880);


// buildings
  // building 1
      fill (150, 150, 150);
      rect(700, 400, 80, 800);
      fill (200, 200, 200);
      beginShape();
      vertex(700, 400);
      vertex(725, 370);
      vertex(800, 370);
      vertex(780, 400);
      endShape(CLOSE);
      fill (25, 25, 25);
      beginShape();
      vertex(780, 400);
      vertex(800, 370);
      vertex(800, 800);
      vertex(780, 800);
      endShape(CLOSE);
    // building 2
      fill (75, 75, 75);
      rect(550, 550, 200, 600);
      fill (100, 100, 100);
      beginShape();
      vertex(570, 520);
      vertex(760, 520);
      vertex(750, 550);
      vertex(550, 550);
      endShape(CLOSE);
      fill (25, 25, 25);
      beginShape();
      vertex(749, 550);
      vertex(760, 520);
      vertex(760, 800);
      vertex(750, 800);
      endShape(CLOSE);

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

function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflakes spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}