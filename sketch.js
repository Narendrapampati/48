var p1,p2,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,asteroidGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
var song, song2;
var aipayee;
var gameover;
var logo, logoImage;
//var startt;starttImage;
var spaceShip2, spaceShipImage2;
//var gameState = 3;
var game3, game3Image;
var button5, button5Image;



function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("freemage.png");
  spaceShipImage2 = loadImage("spaceship.png")

  laserImage = loadImage("laser.png");
  asteroid1 = loadImage("as1.png");
  asteroid2 = loadImage("as2.png");
  asteroid3 = loadImage("as3.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
  song = loadSound("blaster.mp3");
  aipayee = loadSound("aipayee.mp4");
 // gameover = loadImage("gameover.png");
  logoImage = loadImage("royalshooterslogo.png");
  //starttImage = loadImage("finallypng.png");
  song2 = loadSound("newsongtoday.mp3");
  game3Image = loadImage("2rocket.png")
  button5Image = loadImage("44play.jpg");
}

function setup(){  
  canvas = createCanvas(displayWidth,displayHeight);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);

  //startt = createSprite(400,400,40,40);
  //startt.addImage(starttImage);
 // startt.scale = 0.9;
  //game3 = createSprite(500,500,50,50);
  //game3.addImage(game3Image);
  //game3.scale = 0.5;

  //button5 = createSprite(100,100,80,80);
  //button5.addImage(button5Image);
  //button5.scale = 0.5;



  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.2;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  asteroidGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;

  
  
  
}

function draw() {
  background(logoImage);
  //logo.scale = 0.8;

  if(gameState === instruction) {

    //startt.visible = true;
    //song2.play();
      
    // if(mousePressedOver(button5)){
      // gameState = 1;
     //}
     
     
     
  
      stroke("lightred");
      fill("lightblue");
      textFont("trebuchetMS")
      textSize(25);
      text(" - A Game By Narendra",canvas.width/2+180,canvas.height/2-270);
      stroke("white");
      textFont("Apple chancery")
      textSize(50);
      fill("red");
      text("------WELCOME------",canvas.width/2-300,canvas.height/2-300);
      fill ("yellow");
      text("Press N or Y to hear a song(press only once)",canvas.width/2-360,canvas.height/2+180);
      stroke("darkgreen");
      fill("lightblue");
      textSize(35);
      textFont("trebuchetMS");
     // text("year 2500 .....",canvas.width/2-300,canvas.height/2-250);
      text("  Some asteroids are coming towords Earth.",canvas.width/2-650, canvas.height/2 - 210);
      text("  You are a space fighter.",canvas.width/2-650,canvas.height/2-170);
      text("  Please save the earth",canvas.width/2-650,canvas.height/2-130);
      text("  press 'space' to shoot.",canvas.width/2-650,canvas.height/2-90);
      text("  use right and left arrows",canvas.width/2-650,canvas.height/2-50);
      stroke("yellow");
      fill ("lightgreen");
      text("  press 's' to start game.",canvas.width/2-650,canvas.height/2-10);
  }
  
 // startt = createSprite(500,500,30,30);
 //startt.addImage(starttImage);
// startt.scale = 0.9;



  if(gameState === 1) {
    text("Song playing")
   // song2.stop();
   // song.play();
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("y")){
      song2.play();
    }
  

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 25;
      p2.x = p2.x + 25;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 25;
      p2.x = p2.x - 25;
    }

    if(keyDown("u")){
      gameState = instruction;
    }
    
    if(asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }
    
    if(asteroidGroup.isTouching(laserGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    //logo.visible = false
    drawSprites();
    
    asteroids();
    


    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,displayWidth/1.4,displayHeight/6.4);
    textSize(20);
    //text("Long Press W to know the song playing,",240,20);


    if(keyDown("w")){
    if(song2 === play){
      text("12345",400,400);
    }
    }
   
    
    if(asteroidGroup.isTouching(endline)) {
      asteroidGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
   // gameover = addImage(gameover);
    stroke("yellow");
    fill("white");
    textSize(110);
    text("GAME OVER!",canvas.width/2-500,canvas.height/2-250);
    stroke ("red");
    fill("blue");
    textSize(40);
    text("The asteroids destroyed the planet",canvas.width/2-630,canvas.height/2-200);
    text("Your final score:"+score,canvas.width/2-630,canvas.height/2-150);
    text("No worries, better luck next time",canvas.width/2-400, canvas.height/2+300);
    //text("thank you from Narendra",canvas.width/2-400, canvas.height/2);

    //aipayee.play();
    song.stop();
    song2.stop();
   // gameovertoday.pdf.play();

    
  }

  if(keyDown("h")){
    gameState = end;
  }
  
  
 

{
   // text("wanna hear song while playing? click N",canvas.width/2-30,canvas.height/2-40);
   
 
  //  if(keyDown("w")){
  //    textSize(25);
    //  text("Song Playing : master the blaster",canvas.width/2-870,canvas.height/2-270);
   // }
   
    
   
    //text("file:///C:/Users/paran/Desktop/info.html",canvas.width/2-50,canvas.width/2-30);
    
    if(keyDown("s")) {
      gameState = play;

    } 

    
    
   
  }
  if(keyDown("n")){
    song.play();
    
  }
 
  
 // logo.visible = true;
}



  

function asteroids() {
  if(frameCount % 120 === 0) {
  
    var asteroid = createSprite(Math.round(random(50,1050)),-20);
    asteroid.velocityY = (6 + score/10);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.4,0.5);
    //asteroid.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
              asteroid.setCollider("circle",-80,10,160);
              break;
      case 2: asteroid.addImage(asteroid2);
              asteroid.setCollider("circle",50,0,150);
              break;
      case 3: asteroid.addImage(asteroid3);
              asteroid.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(asteroid.x);
    asteroidGroup.add(asteroid);
  }
}




