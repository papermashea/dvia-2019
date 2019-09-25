
let snowflakes = []; // array to hold snowflake objects
var x = 0 // starting x position to draw
var y = 800  // starting y position to draw
var barWidth = 800 // height of each bar
var maxHeight = -800 // maximum height of each bar (the actual width will always be ≤ this)
var spacing = 10 // the vertical space to skip between bars
var discrete = false

function setup() {
  createCanvas(800, 800);
  fill(240);
  noStroke();
}

function draw() {
  background(40);
  var now = clock()

// snowflakes falling for seconds
  let t = frameCount*.1 / map(now.sec, 0, 60, 0, 10); // update time
  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let snowflake of snowflakes) {
    snowflake.update(t); // update snowflake position
    snowflake.display(); // draw snowflake
  }


// snowflake pile build for minutes
    // measure the current time & calculate the width in pixels of each bar
  var now = clock()
  if (discrete){
    // the map() function lets us *normalize* a value from a starting range then *project* it into another range
    var hourHeight = map(now.hour, 1,12, 0,maxHeight) // from hours (1-12) to pixels (0–maxWidth)
    var minsHeight = map(now.min,  0,60, 0,maxHeight)  // from mins (0–60) to pixels (0–maxWidth)
    var secsHeight = map(now.sec,  0,60, 0,maxHeight)  // from secs (0–60) to pixels (0–maxWidth)
  }else{
    // alternatively, we can use the clock's 'progress' percentages
    hourHeight = maxHeight * now.progress.day
    minsHeight = maxHeight * now.progress.hour
    secsHeight = maxHeight * now.progress.min
  }

  // ...the minutes for the snowflake pile in the middle...
  fill(255, 255, 255)
  rect(x, y,  barWidth, minsHeight)

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





