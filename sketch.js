/*let score = 0;

let scroll = 10;
let scrollBg = 0;
let trains = [];
let unicorn;
let restart = false;

function preload() {
  //music = loadSound('this.mp3');
  //ding = loadSound('ding.mp3');
  //whistle = loadSound('whistle.mp3');
  bg = loadImage('https://raw.githubusercontent.com/CodingTrain/website/master/CodingChallenges/CC_147_Chrome_Dinosaur_Game/P5/background.jpg');
  train = loadImage('https://raw.githubusercontent.com/CodingTrain/website/master/CodingChallenges/CC_147_Chrome_Dinosaur_Game/P5/train.png');
  jumper = loadImage('https://raw.githubusercontent.com/CodingTrain/website/master/CodingChallenges/CC_147_Chrome_Dinosaur_Game/P5/unicorn.png');

  
}

function setup() {
  createCanvas(700, 400);
  unicorn = new Unicorn();
 

  createP('Controls: ');
  createP('Space to jump. It\'s really that simple!');
  createP('<hr>');
  createP('Plot:');
  createP('Everytime Dan forgets the this dot a train leaves the train station. The supply of trains is running out and you equals sign have be assigned the task of letting him know and saving the train station before he runs out of this dots. Quick! Get on your unicorn and avoid the oncoming trains!');

}

function keyPressed() {
  if (restart) {
    restart = false;
    score = 0;
    scollBg = 0;
    scroll = 10;
    trains = [];
    loop();
  }
  if (key == ' ') {
    unicorn.jump();
    return false;
  }
}


function draw() {
  image(bg, -scrollBg, 0, width, height);
  image(bg, -scrollBg + width, 0, width, height);

  if (scrollBg > width) {
    scrollBg = 0;
  }

  if (random(1) < 0.75 && frameCount % 50 == 0) {
    trains.push(new Train());
  }


  if (frameCount % 5 == 0) {
    score++;
  }

  fill(255);
  textSize(32);
  textFont('monospace');
  text(`Score: ${score}`, 10, 30);

  for (let t of trains) {
    t.move();
    t.show();

    if (unicorn.collide(t)) {
      noLoop();

      fill(255);
      text(`Game Over! Press any key to restart`, 45, height / 2);
      restart = true;
    }
  }

  unicorn.show();
  unicorn.move();

  scroll += 0.005;
  scrollBg += scroll / 5;
}

class Unicorn {
  constructor() {
    this.r = 100;
    this.x = 50;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 2;
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;

    this.y = constrain(this.y, 0, height - this.r);
  }

  jump() {
    if (this.y == height - this.r) {
      this.vy = -32;
      //ding.play();
    }
  }

  collide(other) {
    let hitX = this.x + this.r > other.x && this.x < other.x + other.r;
    let hitY = this.y + this.r > other.y;
    return (hitX && hitY);
  }

  show() {
    fill(255, 127);
    //rect(this.x, this.y, this.r, this.r)
    image(jumper, this.x, this.y, this.r, this.r);
  }
}

class Train {
  constructor() {
    this.r = 75;
    this.x = width;
    this.y = height - this.r;
  }

  move() {
    this.x -= scroll;
  }

  show() {
    fill(255, 127);
    //rect(this.x, this.y, this.r, this.r)
    image(train, this.x, this.y, this.r, this.r);
  }
}*/
class Mario
{
  constructor()
  {
    this.r = 200;
    this.x = this.r;
    this.y = height-this.r;
    this.velocity = 0;
    this.gravity = .8;
  }

  jump()
  {
    if(this.y == height - this.r)
    {
      this.velocity = -25;
    }
  }

  hits(goomba)
  {
    let x1 = this.x + this.r * 0.5;
    let y1 = this.y + this.r * 0.5;
    let x2 = goomba.x + goomba.r * 0.5;
    let y2 = goomba.y + goomba.r * 0.5;

    return collideCircleCircle(x1,y1,this.r,x2,y2,goomba.r);
  }

  move()
  {
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.y = constrain(this.y,0,height-this.r);
  }

  show ()
  {
    this.r = (windowWidth+windowHeight)/20;
    image(marioImg,this.x,this.y,this.r,this.r);
    //fill(255,50);
    //rect(this.x,this.y,this.r,this.r);
  }
}

class Goomba
{
  constructor()
  {
    this.r = 100;
    this.x = width;
    this.y = height-this.r;
  }

  move()
  {
    this.x -= 10;
  }

  show()
  {
    this.r = (windowWidth+windowHeight)/40;
    this.y = height-this.r;
    image(goombaImg,this.x,this.y,this.r,this.r);
    //rect(this.x,this.y,this.r,this.r);
  }

}


let mario;
let marioImg;
let goombaImg;
let backgroundImg;
let goombas = [];
let score = 0;
let restart = false;
function preload()
{
  marioImg = loadImage('https://i.imgur.com/ZYc9jg1.png');
  goombaImg = loadImage('https://i.imgur.com/dmTCABM.png');
  backgroundImg = loadImage('https://i.imgur.com/Qf2YhXk.jpg');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mario = new Mario();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
   if (restart) {
    restart = false;
    goombas = [];
	score = 0;
    loop();
  }
  else if(key == ' ')
  {
    mario.jump();
  }
}

function draw() {
  
  background(backgroundImg);
  if(random(1) < 0.25 && frameCount % 50 == 0 )
  {
    goombas.push(new Goomba());
  }

  mario.show();
  mario.move();

  if (frameCount % 5 == 0) {
    score++;
  }
  
  for(let g of goombas)
  {
    //score++;
    g.move();
    g.show();
    if(mario.hits(g))
    {
      text(`Game Over! Press any key to restart`, width/3, height / 2);
      restart = true;
     // score = 0;
      noLoop();
    }
  }
  textSize(30);
  text('Score:', 0, 30);
  textSize(30);
  text(score, 100, 30);

}
