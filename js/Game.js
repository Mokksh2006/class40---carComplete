class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage('car1', car1Img);

    car2 = createSprite(300,200);
    car2.addImage ('car2', car2Img);

    car3 = createSprite(500,200);
    car3.addImage ('car3', car3Img);

    car4 = createSprite(700,200);
    car4.addImage ('car4', car4Img);

    cars = [car1, car2, car3, car4];

    pastFinishedline = false;
  }

  play(){

    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();

    if(allPlayers !== undefined){
      //var display_position = 100;
      
      background(120);
      image (trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5); 
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 170;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          fill('red');
          ellipse(x,y,60,60);
        }
       
        textSize(15);
        fill('yellow');
       // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      textAlign(CENTER);
        text(allPlayers[plr].name, cars[index-1].x, cars[index-1].y+72);
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && pastFinishedline !== true) {
      player.distance +=10
      player.update();
    }
    if(player.distance >3500 && pastFinishedline === false) {
      // gameState = 2;
      Player.updateFinishedPlayers();
      player.rank = finishedPlayers;
      player.update();
      pastFinishedline = true;
    }
    drawSprites();

  }
  displayRank(){
    // console.log("GAME ENDED");
    camera.position.x = 0;
    camera.position.y = 0;
    Player.getPlayerInfo();
    imageMode(CENTER);
    image(bronzeMedal, -displayWidth/4, displayWidth/9 - 100, 150, 190);
    image(silverMedal, displayWidth/4, displayWidth/10 -100, 175, 220);
    image(goldMedal, 0, -100, 200, 250);
    textAlign(CENTER);
    fill('white');
    textSize(50);
    for(var plr in allPlayers){
      if(allPlayers[plr].rank === 1){
        text('First: '+allPlayers[plr].name, 0, 80);
      }
      else if(allPlayers[plr].rank === 2){
        text('Second: '+allPlayers[plr].name, displayWidth/4 , displayHeight/9 + 70);
      }
      else if(allPlayers[plr].rank === 3){
        text('Third: '+allPlayers[plr].name, -displayWidth/4 , displayHeight/10 + 70);
      }
      else{
        textSize(30);
        text('Better luck next time '+allPlayers[plr].name, 0, 255);
      }
    }
  }
}
