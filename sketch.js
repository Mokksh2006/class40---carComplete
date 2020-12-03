var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var cars, car1, car2, car3, car4;
var car1Img, car2Img, car3Img, car4Img, trackImg;
var goldMedal, silverMedal, bronzeMedal;

var finishedPlayers = 0;
var pastFinishedline;
function preload(){

  car1Img = loadImage('https://raw.githubusercontent.com/whitehatjr/carRacingStage2/master/images/car1.png');
  car2Img = loadImage('https://raw.githubusercontent.com/whitehatjr/carRacingStage2/master/images/car2.png');
  car3Img = loadImage('https://raw.githubusercontent.com/whitehatjr/carRacingStage2/master/images/car3.png');
  car4Img = loadImage('https://raw.githubusercontent.com/whitehatjr/carRacingStage2/master/images/car4.png');
  trackImg = loadImage('https://raw.githubusercontent.com/whitehatjr/carRacingStage2/master/images/track.jpg');
  goldMedal = loadImage('images/gold.png');
  silverMedal = loadImage('images/silver.png');
  bronzeMedal = loadImage('images/bronze.png');
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

  if(playerCount === 4 && finishedPlayers === 0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(finishedPlayers === 4){
   game.update(2);
  }
  if (gameState === 2 && finishedPlayers === 4){
    game.displayRank();
  }
}
