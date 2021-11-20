
var bg_Img;
var knight, kngt_Walk, kngt_Jump;
var demon, demonAttack, demonDeath;
var invis_grnd, invisible, invis;
var plt, plt1, plt2, plt3, plt4;
var coin, coin_Img, coinGroup;
var pltGroup, invisibleGroup;
var coinScore=0;


function preload(){
  bg_Img = loadImage("./Assets/Background_01.png");
  kngt_Walk = loadAnimation("./Knight/walk1.png", "./Knight/walk2.png", "./Knight/walk3.png", "./Knight/walk4.png", "./Knight/walk5.png", 
  "./Knight/walk6.png");
  kngt_Jump = loadAnimation("./Knight/jump1.png", "./Knight/jump2.png", "./Knight/jump3.png", "./Knight/jump4.png", "./Knight/jump5.png", 
  "./Knight/jump6.png","./Knight/jump7.png");
  plt1 = loadImage("./Assets/Ground_Merged.png");
  plt2 = loadImage("./Assets/Ground.png");
  plt3 = loadImage("./Assets/Ground_i.png");
  plt4 = loadImage("./Assets/Ground_ii.png");
  coin_Img = loadAnimation("./Assets/Coin_01.png", "./Assets/Coin_02.png", "./Assets/Coin_03.png", "./Assets/Coin_04.png", "./Assets/Coin_05.png", "./Assets/Coin_06.png");
  demonAttack = loadAnimation("./Demon/Walk1.png", "./Demon/Attack1.png", "./Demon/Attack2.png", "./Demon/Attack3.png", "./Demon/Attack4.png");
  demonDeath = loadAnimation("./Demon/Death1.png", "./Demon/Death2.png", "./Demon/Death3.png", "./Demon/Death4.png", "./Demon/Death5.png", "./Demon/Death6.png");
}

function setup() {
  createCanvas(windowWidth*3,windowHeight);
  invis_grnd = createSprite(windowWidth/2, height-70, windowWidth*5, 10);
  invis_grnd.visible = false;
  
  knight = createSprite(100, height-80, 50, 50);
  knight.addAnimation("walk", kngt_Walk);
  //knight.debug = true;
  knight.setCollider("rectangle",-20,9,40,69);

  pltGroup = new Group();
  invisibleGroup = new Group();
  coinGroup = new Group();
}

function draw() {
  background(bg_Img); 

  if(keyDown(RIGHT_ARROW)){
    knight.x +=5;
  }
  if(keyDown(LEFT_ARROW)){
    knight.x -=5;
  }
  if(keyDown(UP_ARROW)){
    knight.addAnimation("jump", kngt_Jump);
    knight.velocityY -=2;
  }
  knight.velocityY = knight.velocityY+0.8;

  if(invisibleGroup.isTouching(knight)){
    knight.collide(invisibleGroup);
  }

  knight.collide(invis_grnd);  

  spawnPlatform();
  handlePowerCoins();
  drawSprites();
  textSize(18)
  text("Coins: " + coinScore, 700,50);
}

function spawnPlatform() {
  if (frameCount % 100 === 0) {
    plt = createSprite(windowWidth,500);
    plt.addImage(plt1);
    plt.scale = 0.7;

    grd = createSprite(windowWidth,windowHeight-75);
    grd.velocityX = -7;
    grd.addImage(plt3);

    invisible = createSprite(windowWidth,300)
    invisible.width = plt.width-200;
    invisible.height= 2;

    invis = createSprite(windowWidth,300)
    invis.width = grd.width-15;
    invis.height= 2;

    coin = createSprite(windowWidth, 300, 30, 30);
    coin.addAnimation("spinning",coin_Img);
    coin.scale=0.5;

    plt.x = Math.round(random(windowWidth, windowWidth*4))
    plt.y = Math.round(random(300,700))
    plt.velocityX = -7;

    
    invisible.x = plt.x;
    invisible.y = plt.y-40;
    invisible.velocityX = -7;

    invis.x = grd.x;
    invis.y = grd.y-60;
    invis.velocityX = -7;

    coin.x = plt.x;
    coin.y = plt.y-80;
    coin.velocityX = -7
    //var ran = Math.round(random(1, 2));
    
    pltGroup.add(plt);
    pltGroup.add(grd);
    invisibleGroup.add(invisible);
    invisibleGroup.add(invis);
    coinGroup.add(coin);
  }
}

function handlePowerCoins() {
  knight.overlap(coinGroup, function(collector, collected) {
    coinScore += 1;
    
    //collected is the sprite in the group collectibles that triggered
    //the event
    collected.remove();
  });
}

function spawnEnemies(){  
    //create knight after every 150 frames
    if (frameCount % 150 === 0) {
      var rand = Math.round(random(1,4));
  
      //random number of knight and types
      switch(rand){
      case 1:
              demon = createSprite(100,150,10,10);
              demon.addImage(brickImg);
              demon.x = plt.x;
              demon.y = plt.y - 20;
              demon.scale =2
              demon.velocityX = -4
              demon.lifetime = 400;
              enemyGroup.add(fred);
  
              /*invdemon = createSprite(1000,205,40,10);
              invdemon.y = demon.y+25;
              invdemon.velocityX = -4
              invdemon.lifetime = 400;
              invdemon.visible=false;
              //invdemon.debug=true;
              invBrickGroup.add(invdemon);*/
              break;
  
     /* case 2: for(var brs = 1000; brs<1100; brs=brs+50){
                fred = createSprite(brs,150,10,10);
                fred.addImage(brickImg);
                fred.scale =2
                fred.velocityX = -4
                fred.lifetime = 400;
                brickGroup.add(fred);
  
                invfred = createSprite(brs,150,40,10);
                invfred.y = fred.y+25;
                invfred.velocityX = -4
                invfred.lifetime = 400;
                invfred.visible=false;
                //invfred.debug=true;
                invBrickGroup.add(invfred);
              }
              break;
  
      case 3: coinbrick = createSprite(1000,160,50,10);
              coinbrick.addAnimation("coinbrick",coinbrickImg);
              coinbrick.velocityX = -4
              coinbrick.scale = 2.7;
              coinbrick.lifetime = 400;
              //coinbrick.debug=true;
              coinBrickGroup.add(coinbrick);
  
              invcoinbrick = createSprite(1000,160,40,10);
              invcoinbrick.y = coinbrick.y+25;
              invcoinbrick.velocityX = -4
              invcoinbrick.lifetime = 400;
              invcoinbrick.visible=false;
              //invcoinbrick.debug=true;
              invCoinBrickGroup.add(invcoinbrick);
              break;
      
      case 4: demon3 = createSprite(1000,160,10,10);
              demon3.addImage(brickImg);
              demon3.scale =2;
              demon3.velocityX = -4;
              demon3.lifetime = 400;
              brickGroup.add(demon3);
  
              invdemon3 = createSprite(1000,160,40,10);
              invdemon3.y = demon3.y+25;
              invdemon3.velocityX = -4;
              invdemon3.lifetime = 400;
              invdemon3.visible=false;
              //invdemon3.debug=true;
              invBrickGroup.add(invdemon3);
  
              coinbrick2 = createSprite(1050,160,50,10);
              coinbrick2.addAnimation("coinbrick",coinbrickImg);
              coinbrick2.velocityX = -4
              coinbrick2.scale = 2.7;
              coinbrick2.lifetime = 400;
              //coinbrick2.debug=true;
              coinBrickGroup.add(coinbrick2);
  
              invcoinbrick2 = createSprite(1050,160,40,10);
              invcoinbrick2.y = coinbrick2.y+25;
              invcoinbrick2.velocityX = -4
              invcoinbrick2.lifetime = 400;
              invcoinbrick2.visible=false;
              //invcoinbrick2.debug=true;
              invCoinBrickGroup.add(invcoinbrick2);
  
              demon3 = createSprite(1100,160,10,10);
              demon3.addImage(brickImg);
              demon3.scale =2
              demon3.velocityX = -4
              demon3.lifetime = 400;
              brickGroup.add(demon3);
  
              invdemon3 = createSprite(1100,160,40,10);
              invdemon3.y = demon3.y+25;
              invdemon3.velocityX = -4;
              invdemon3.lifetime = 400;
              invdemon3.visible=false;
              //invdemon3.debug=true;
              invBrickGroup.add(invdemon3);
              break;*/
     
      }
    }
  
}