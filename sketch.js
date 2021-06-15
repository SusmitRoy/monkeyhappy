
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground, groundImage, invGround;
var score = 0;

PLAY = 1;
END = 0;

gameState = PLAY;

function preload(){
  
  monkeyStill = loadAnimation("sprite_0.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  groundImage = loadImage("ground.jpeg");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(100,245,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("still", monkeyStill)
  monkey.scale = 0.12;
  
  ground = createSprite(300,600,50,10);
  ground.addImage(groundImage);
  ground.scale = 2;
  ground.x = ground.width/2;
  ground.velocityX = -(3 + score/1);
  
  invGround = createSprite(100,290,200,20);
  invGround.visible = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  monkey.depth=2;
  ground.depth=1;
}


function draw() {
  background("lightBlue");
  
  textAlign(CENTER);
  textSize(15);
  text("score: " + score, 550,20);
  
  monkey.collide(invGround);
  
  if(gameState === PLAY){
  if(ground.x<200){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.y>240){
    monkey.velocityY=-18;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 1;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  
  spawnObstacles();
  spawnBanana();
    
  }
  
  if(gameState === END){
    ground.velocityX = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    monkey.velocityY = 0;
    monkey.changeAnimation("still",monkeyStill);
    
    if(keyDown("r")){
      reset();
    }
    
    textAlign(CENTER);
    textSize(20);
    text("Press R to restart", 300,50);
  }
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount%100 === 0){              
    obstacle = createSprite(600,255,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    
    obstacle.velocityX = -(3+score/1);
    
    obstacle.lifetime = 300;
    
    obstacle.debug = true;
    obstacle.setCollider("circle",0,0,40)
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  if(frameCount%70 === 0){
    banana = createSprite(600,150,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    
    banana.y = Math.round(random(50,250));
    
    banana.velocityX=-(3+score/1);
    
    banana.lifetime = 300;
    
    banana.debug = true;
    banana.setCollider("rectangle",0,0,40,10);
    foodGroup.add(banana);
  }
}

function reset(){
  gameState = PLAY;
  
  monkey.changeAnimation("running", monkey_running);
  
  ground.velocityX = -(3+score/1);
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
  score = 0;
}
