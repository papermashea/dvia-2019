// object containing all of our data!
var zooTable;

// chart edges
var chartTop = 100;
var chartBottom = 300;
var chartLeft = 100;
var chartRight = 300;

var chartDomainMin = 1450000;
var chartDomainMax = 1700000;

var plainFont;
var boldFont;

var barWidth = 40;


// preload waits for all of our data to finish loading
// before it runs setup or draw!
function preload() {
  
  // table is comma separated value file, "csv"
  // and has a header specifying the columns labels
  // (header is the first line of file)
  // data from https://catalog.data.gov/dataset/l-a-zoo-attendance-46503
  zooTable = loadTable("L.A._Zoo_Attendance.csv", "csv", "header");

	// load the fonts.
  // note: these were uploaded because their license
  // is not very restrictive.
  boldFont = loadFont('Roboto-Bold.ttf');
  regularFont = loadFont('Roboto-Regular.ttf');
}

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);
  
	noStroke();
  textSize(10);
  
  var rowCount = zooTable.getRowCount();
  
  // cycle through the table,
  // draw a bar and label for each row in the table.
  // where the label is the "fiscal year" and the
  // height of the bar is proportional to the attendance.
  for (var r = 0; r < rowCount; r++) {
    var x = map(r, rowCount - 1, 0, chartLeft, chartRight);
    var attendance = zooTable.getNum(r, "Attendance");
    var y = map(attendance,
                chartDomainMin, chartDomainMax,
                chartBottom, chartTop);
    
    strokeWeight(barWidth);
    strokeCap(SQUARE);
    stroke(0);
    line(x, chartBottom, x, y);
    
    noStroke();
    textAlign(CENTER);
    textFont(boldFont);
    text(zooTable.get(r, "Fiscal Year"), x, chartBottom + 15);
  }
  
  // title
	noStroke();
  textFont(regularFont);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("LA Zoo Attendance by Fiscal Year", 200, 50);
}