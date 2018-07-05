"use strict";

// Rendering objects with parameters 
var renderObject = function(sprite,x,y,height,width) {
    if(gameReady === true) {
        if(height && width !=null) {
            ctx.drawImage(Resources.get(sprite),x,y,height,width);
        } else {
            ctx.drawImage(Resources.get(sprite),x,y);
       }
    }
}

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    allEnemies.forEach((enemy) => {
        if(enemy.x > 500) {
            enemy.x = -100;
            enemy.speed = 1 + Math.floor(Math.random() * 512);
            enemy.y = randPosition(enemyPos);
        }
    });
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    renderObject(this.sprite,this.x,this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite;
}

//Player hadle key pressed
Player.prototype.handleInput = function(key){
    if(key === 'up') {
        player.y -=85;
    }
    if(key === 'down') {
        player.y +=85;
    }
    if(key === 'left') {
        player.x -=100;
    }
    if(key === 'right') {
        player.x +=100;
    }
}

//Player movement update
Player.prototype.update = function() {
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
       this.x = 0;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.y < 0) {
        this.y = -25;
        document.removeEventListener('keyup',press,true);
        setTimeout(water,200);
    }
}

//Player check collisions with bugs
Player.prototype.checkCollisions = function() {
    if(gameReady===true) {
    allEnemies.forEach((enemy) => {
        if(this.y === enemy.y && Math.abs(this.x-enemy.x)<70 ) {
            player.x = 200;
            player.y = 400;
            lives-=1;
            if(lives === 2) {
                $(".l3").attr("src","images/Heart_empty.png");
            }
            if(lives === 1) {
                $(".l2").attr("src","images/Heart_empty.png");
            }
            if(lives === 0) {
                $(".l1").attr("src","images/Heart_empty.png");
                lose();
            }
        }
  });
  }
};

// Render player on canvas
Player.prototype.render = function() {
    renderObject(this.sprite,this.x,this.y);
}

//Gem constructor
var Gem = function(x,y,spriteArr,width,height) {
    this.x = x;
    this.y = y;
    this.sprite = spriteArr[Math.floor(Math.random() * spriteArr.length)];
    this.width = width;
    this.height = height;
}

//Check collision Gem vs Player
Gem.prototype.checkCollisions = function() {
   if(gameReady===true){
    allGems.forEach((gem) => {
        if((Math.abs(gem.y - player.y) === 80 || Math.abs(gem.y - player.y) === 85) && Math.abs(gem.x - player.x) === 25) { 
            score+=100;
            document.querySelector('.player-score').textContent = score;
            delete allGems[allGems.indexOf(gem)];      
            gem = new Gem(randPosition(gemPos[0]),randPosition(gemPos[1]),gemSprites,50,50);
            allGems.push(gem);
        }
    });
  }   
};

//Gem render on canvas
Gem.prototype.render = function() {
    // if(gameReady === true) {
    //  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width,this.height);
    // }
    renderObject(this.sprite,this.x,this.y,this.height,this.width);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var gameReady = false; 
var gameLose = false;
var lives = 3;
var score = 0;
var selected;
var gem;
var enemy;
var player;
var allEnemies = [];
var allGems = [];
var enemySpeed = [];
var playerSprites = {boy:'images/char-boy.png', girl:'images/char-princess-girl.png'};
var gemSprites = ['images/Gem_Blue.png','images/Gem_Green.png','images/Gem_Orange.png'];
var enemyPos = [60,145,230];
var gemPos = [[25,125,225,325,425],[140,225,310]];
var player = new Player(200,400);
var enemyQuantity = 3;
var gemQuantity = 2;
gemGenerate();
enemyGenerate();
document.addEventListener('keyup',press,true);



// Rebuilded *
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var press = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };
    player.handleInput(allowedKeys[e.keyCode]);
}

// Restart 
var restartPress = function(e) {
    var allowedKeys = {
        82: 'r',
    };
    restartGame(allowedKeys[e.keyCode]);     
}

// Randomize position 
function randPosition(arr) {
     return (arr[Math.floor(Math.random() * arr.length)]);
}

// Generate enemies
function enemyGenerate () {
    allEnemies = [];
    while(enemyQuantity!=0){
        enemy = new Enemy(0, randPosition(enemyPos), 1 + Math.floor(Math.random() * 512));
        allEnemies.push(enemy);
        enemyQuantity--;
        }
    enemyQuantity;
}

// Generate gems
function gemGenerate () {
    while(gemQuantity!=0){
        gem = new Gem(randPosition(gemPos[0]),randPosition(gemPos[1]),gemSprites,50,50);
        allGems.push(gem);
        gemQuantity--;
        }
    gemQuantity;
}

function water() {
    player.x = 200;
    player.y = 400;
    document.addEventListener('keyup',press,true);
}

function lose() {
    gameReady = false;
    gameLose = true;
    lives = 3;
}

// Pause game
function pauseGame() {
    document.removeEventListener('keyup',press,true);
    allEnemies.forEach((enemy) => {
        enemySpeed.push(enemy.speed);
        enemy.speed = 0;
    });
}

// Resume Game
function resumeGame() {
    allEnemies.forEach((enemy,index) => {
        enemy.speed = enemySpeed[index];
    });
    enemySpeed = [];
    document.addEventListener('keyup',press,true);
}

// Game handle restart
function restartGame(key) {
    if(key === 'r'){
       score = 0;
       document.querySelector('.player-score').textContent = score;
       $(".l3").attr("src","images/Heart.png");
       $(".l2").attr("src","images/Heart.png");
       $(".l1").attr("src","images/Heart.png");
       document.removeEventListener('keyup',restartPress,true);
       gameLose = false;
       gameReady = true;
    }
}

// Game control listeners
function gameControlListeners() {
    document.addEventListener('keyup',press, true);
     $('.pause').on('click', function()  {
        if(enemy.speed!=0){
            pauseGame();
        }
     }); 
    $('.play').on('click', function()  {
        if(enemy.speed === 0) {
            resumeGame();
        }
    }); 
}




