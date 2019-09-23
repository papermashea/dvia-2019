var arr = [];
var theta = 0;

function setup() {
  

  createCanvas(600, 200);
  noStroke();
  
  for(var i = 0; i <= width; i+=2){
    theta += 0.03;
    arr.push(new Circle(i, height/2 + sin(theta) * 50));
  }
  
}

function draw() {
  background(200,190,220);
  var arr = [];

  arr.push(new Circle(width, height/2 + sin(theta) * 50));
  
  for(var i = 0; i < arr.length; i++){
    arr[i].move();
    arr[i].display();
  }
  
  theta += 0.3;
  
  //ellipse(width, height/2 + sin(theta) * 50, 10,10);
  
}

// Circle class
function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.speed = 2;
  this.diameter = 10;

  this.move = function() {
    this.x -= this.speed;
  };
  
  if(this.x < 0){
    arr.shift();
  }

  this.display = function() {
    ellipse(this.x, this.y, this.diameter);
  };
}