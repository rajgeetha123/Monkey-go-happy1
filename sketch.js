
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;
var PLAY=1;
var END=0;
 gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600)
monkey=createSprite(50,440,20,20);
  monkey.addAnimation("monkey",monkey_running);
 monkey.scale=0.2;
  
  ground=createSprite(300,500,700,20)
  ground.velocityX=-3;
  ground.x=ground.width/2;
  
  bananaGroup=new Group();
  obstaclesGroup=new Group();
  
}


function draw() {
background("white");
  
  
  //text for the scores
  stroke("black")
  textSize(20);
  fill("black")
  survivalTime=Math.ceil(frameCount/60)
  text("Survival Time: "+survivalTime,100,50)
  
  
  if(gameState===PLAY){
    if(keyDown("space")){
    monkey.velocityY=-8 ; 
   }
     monkey.velocityY=monkey.velocityY+0.5;
    if(monkey.isTouching(obstaclesGroup)){
      gameState=END;
    }
    spawnBanana();
  spawnObstacles();
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
    }
  }
  
  else if(gameState===END){
    monkey.velocityX=0;
    monkey.velocityY=0;
    ground.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    survivalTime=0;
  }
  
  
  //resetting the ground
  if(ground.x<280){
    ground.x=300;
  }
  
  
 //colliding the monkey with ground
  monkey.collide(ground);
  

  
  
  
  drawSprites()
}

function spawnBanana(){
  if(frameCount%80===0){
  banana=createSprite(300,100,20,20)
    banana.y=Math.round(random(120,200))
    banana.addImage("banana",bananaImage);
    banana.scale=0.2;
    banana.velocityX=-3;
    
    bananaGroup.add(banana);
    banana.lifetime=100
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(300,450,20,20)
    obstacle.addImage("stone", obstacleImage)
    obstacle.velocityX=-3;
    obstacle.scale=0.2;
    
    obstaclesGroup.add(obstacle);
    obstacle.lifetime=150;
    
  }
}


