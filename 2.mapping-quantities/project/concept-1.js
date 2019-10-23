var nuclearData

function preload(){
  data = loadJSON('data/totals.csv', 'csv', 'header')
}

function setup(){
  createCanvas(800, 600)

  print(data)
}
