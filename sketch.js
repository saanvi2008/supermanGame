//start variables
var playerImg,player;
var bg,bgImg;
var coinImg, coin1,coin2;
var count = 0;
var life = 3;
var coinGroup1, coinGroup2;
var eagleImg, eagle, eagleGroup;
var edges;
var gameState = "PLAY";
var gameOverImg, gameOver;
var resetImg, reset;
var villainImg, villain, villainGroup;
var punchImg,punchGroup;
var sound;
//end variables

function preload(){
  playerImg   = loadImage("Images/superman.png");
  bgImg       = loadImage("Images/background.jpg");
  coinImg     = loadImage("Images/coin.png");
  eagleImg    = loadImage("Images/ob1.png");
  gameOverImg = loadImage("Images/gameOver.png");
  resetImg    = loadImage("Images/reset.png");
  villainImg  = loadImage("Images/villian.png");
  punchImg    = loadImage("Images/punch.png");
  sound       = loadSound("sound.mp3");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  sound.play();

  //sprites start
  bg = createSprite(displayWidth/2,displayHeight/2);
  bg.addImage(bgImg);
  bg.scale = 3;
  bg.velocityX = -4;
  
  player = createSprite(300,displayHeight-390,40,40);
  player.addImage(playerImg);
  player.scale = 0.5;

  edges = createEdgeSprites();
  
  //created groups start
  coinGroup1 = createGroup();
  coinGroup2 =  createGroup();
  eagleGroup = createGroup();
  villainGroup = createGroup();
  punchGroup= createGroup();
  //created groups end

  gameOver  = createSprite(displayWidth/2,displayHeight/2-100,40,40);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  reset = createSprite(displayWidth/2, displayHeight/2 + 30, 40,40);
  reset.addImage(resetImg);
  reset.scale = 0.3;
  //sprites end
}

function draw() {
  background(255,255,255);  

  //if condition for ground
  if(bg.x < 0){
    bg.x = displayWidth/2;
  }
   if(gameState === "PLAY"){
     gameOver.visible = false;
     reset.visible    = false;

  //if condition for arrow keys start
  if(keyDown("UP")){
    player.y = player.y-4;
  }
  if(keyDown("DOWN")){
    player.y = player.y+4;
  }

  spawnCoin();
  spawnCoin2();
  spawnEagle();
  spawnVillain();
  //if condition for arrow keys end
  
  //isTouching if conditions start
  if(coinGroup1.isTouching(player)){
    count = count + 2;
    coinGroup1.destroyEach();
  }
  if(coinGroup2.isTouching(player)){
    count = count + 2;
    coinGroup2.destroyEach();
  }
  if(eagleGroup.isTouching(player)){
    life  = life - 1;
    eagleGroup.destroyEach();
  }
  if(villainGroup.isTouching(player)){
    
    count = count - 10;
  }
    if(count < 0){
    count = 0;
    }
    if(keyDown("space")){
      
      var punch_obj= createPunch();
      punch_obj.addImage(punchImg);
      punch_obj.x= player.x;
      punch_obj.y= player.y;
      
    }
  if(punchGroup.isTouching(villainGroup)){
    villainGroup.destroyEach();
    punchGroup.destroyEach();
    count = count + 50;
  }
  //isTouching if conditiond end
  
  if(count >= 100){
    gameState = "WIN";
}

  if(life <= 0){
    gameState = "END";
  }

  
}
if(gameState === "END"){
  gameOver.visible = true;
  reset.visible    = true;

  player.velocityY = 0;
  bg.velocityX     = 0;

  coinGroup1.setVelocityXEach(0);
  coinGroup2.setVelocityXEach(0);
  eagleGroup.setVelocityXEach(0);
  eagleGroup.setVelocityYEach(0);

  coinGroup1.setLifetimeEach(-1);
  coinGroup2.setLifetimeEach(-1);
  eagleGroup.setLifetimeEach(-1);
  }
  if(mousePressedOver(reset)){
    restart();
  }

  if(gameState === "WIN"){
    reset.visible = true;
    textSize(25);
    fill("purple");
    text("YOU WIN!! :)",displayWidth/2-40, displayHeight/2-50);
  }
  drawSprites();
  textSize(15);
  textFont("Georgia");
  fill("black");
  text(" Coins Collection : " + count, displayWidth-300 , 100 );
  text(" Lives : " + life, displayWidth - 400, 100 );
}
function spawnCoin(){
  if(frameCount % 120 === 0){
    coin1 = createSprite(displayWidth,Math.round(random(100,displayHeight-100)),10,10);
    coin1.addImage(coinImg);
    coin1.scale = 0.2;
    coin1.velocityX = -6;
    coin1.lifetime  = 3000;
    coinGroup1.add(coin1);
  }
}
function spawnCoin2(){
  if(frameCount % 120===0){
    coin2 = createSprite(displayWidth + 200,Math.round(random(100,displayHeight-100)),10,10);
    coin2.addImage(coinImg);
    coin2.scale = 0.2;
    coin2.velocityX = -6;
    coin2.lifetime  = 3000;
    coinGroup2.add(coin2);
  }
}
function spawnEagle(){
  if(frameCount % 80 === 0){
    eagle = createSprite(displayWidth-50,displayHeight/2,10,10);
    eagle.addImage(eagleImg);
    eagle.scale = 0.2;
    eagle.velocityX = -6;
    eagle.velocityY = random(-3,3);
    eagle.lifetime  = 300;
    eagle.bounceOff(edges);
    eagleGroup.add(eagle);
  }
}

function restart(){
 gameState = "PLAY";
 
  gameOver.visible = false;
  reset.visible    = false;

  eagleGroup.destroyEach();
  coinGroup1.destroyEach();
  coinGroup2.destroyEach();

  life  = 3;
  count = 0;
}

function spawnVillain(){
  if(frameCount % 300 === 0){
    var villain = createSprite(displayWidth, random(100,displayHeight-100), 40,40);
    villain.addImage(villainImg);
    villain.scale = 0.3;
    villain.velocityX = -4;
    villain.lifetime = 200;
    villainGroup.add(villain);
  }
}
function createPunch(){
  var punch = createSprite(0,0,30,30);
  punch.velocityX = 8;
  punch.addImage(punchImg);
  punchGroup.add(punch);
  return punch;
}