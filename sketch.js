var canvas;
var backgroundImage;
var database;
var form, player;
var playerCount;
var car1Img, car2Img
var pista
var car1, car2, cars=[]
var allPlayers
var gameState=0
var fuelimage, coinimage
var fuels, coins
var obstacle1Image, obstacle2Image, obstacles
var lifeimage
var choque

function preload() {
 backgroundImage=loadImage("assets/background.png")
 car1Img=loadImage("assets/car1.png")
 car2Img=loadImage("assets/car2.png")
 pista=loadImage("assets/track.jpg")
 fuelimage=loadImage("assets/fuel.png")
 coinimage=loadImage("assets/goldCoin.png")
 obstacle1Image=loadImage("assets/obstacle1.png")
 obstacle2Image=loadImage("assets/obstacle2.png")
 lifeimage=loadImage("assets/life.png")
 choque=loadImage("assets/blast.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState()
  game.start();
}

function draw() {
  background(backgroundImage);
  if(playerCount==2){
game.update(1)
  }  

  if(gameState==1){
game.play()
  }
  if(gameState==2){
    game.showtablaPos()
    game.end()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
