var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime=3;
var monkey , monkey_running,ground,groundimage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var diesound,jumpsound,checkpointsound,restart;
var restartimage,gameover,gameoverimage;

function preload(){
  
  monkey_running =                   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage ("banana.png");
  obstacleImage = loadImage ("obstacle.png");
  groundimage = loadImage ("ground2.png");
  restartimage = loadImage ("restart.png");
  gameoverimage = loadImage ("gameOver.png");
  
  jumpsound = loadSound ("jump.mp3");
  checkpointsound = loadSound ("checkPoint.mp3");
  diesound = loadSound ("die.mp3");
 
}



function setup() {
   
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  //ground.addImage(groundimage);
 
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  obstacleGroup=new Group();
  FoodGroup=new Group();
}


function draw() {
  
  background("white");
  
  if(ground.x<0){
     ground.x=ground.width/2;
  }
 
  if(keyDown("space")){
  monkey.velocityY=-12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
 
  if(monkey.y<0 || monkey.y>315){
  monkey.y=315; 
  monkey.velocityY=0; 
  }
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  monkey.collide(ground);
  spawnObstacles();
  banana();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,100,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
  
}

function spawnObstacles(){
  if (frameCount % 150 === 0){
  var obstacle = createSprite(600,310,10,40);
    obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6 ;
  obstacle.scale = 0.2;
  obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);
 }
}

function banana(){
  if(frameCount%60==0){
    
   var banana=createSprite(600,200,40,10)
   banana.addImage(bananaImage)
    banana.scale=0.1;
   banana.y=random(120,200);
    banana.velocityX=-5;
    banana.lifetime=300;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    FoodGroup.add(banana)
}
}
  
  
  




