// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    allEnemies.forEach(function(enemy) {
        if(enemy.x > 500) {
            enemy.x = -100;
            enemy.speed = 1 + Math.floor(Math.random() * 512);
            enemy.y = randPosition(enemyPos);
        }
    });
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(gameReady != true) {
    }
    else {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite;
}

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
        setTimeout(win,500);
    }
}

Player.prototype.checkCollisions = function() {
    if(gameReady===true) {
    allEnemies.forEach(function(enemy) {
        if(player.y === enemy.y && Math.abs(player.x-enemy.x)<70 ) {
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
  
Player.prototype.render = function() {
  if(gameReady != true) {
        ctx.fillStyle="white";
        ctx.fillRect(50, 170, 400, 300);
        imageBoy = new Image();
        imageGirl = new Image();
        imageBoy.src = playerSprites.boy;
        imageGirl.src = playerSprites.girl;
        ctx.drawImage(imageBoy, 125, 225);
        ctx.drawImage(imageGirl, 275, 225);
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Welcome!",250,220);
        ctx.font = "15px Arial";
        ctx.fillText("Select you player.",250,240);
        ctx.font = "10px Arial";
        ctx.fillText("\'b' - Boy, \'g' - Girl, \'Space' - Select",250,260);
         
        
        document.addEventListener('keyup', function(e) {
            var allowedKeys = {
                66: 'b',
                71: 'g',
                32: '(space)'
            };

            if(allowedKeys[e.keyCode] === 'b') {              
                selected = playerSprites.boy;
                ctx.globalCompositeOperation="source-over";
                ctx.strokeStyle="red";
                ctx.lineWidth = "6";                  
                ctx.rect(125,270,100,120);            
                ctx.stroke();      
            }
            if(allowedKeys[e.keyCode] === 'g') {
                selected = playerSprites.girl;   
            }
            if(allowedKeys[e.keyCode] === '(space)') {
                if(selected!=undefined){
                    player.sprite = selected;
                    gameReady = true;
                }
            }
        });        
     }
    else {    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

var Gem = function(x,y,spriteArr,width,height) {
    this.x = x;
    this.y = y;
    this.sprite = spriteArr[Math.floor(Math.random() * spriteArr.length)];
    this.width = width;
    this.height = height;
}

Gem.prototype.checkCollisions = function() {
   if(gameReady===true){
    allGems.forEach(function(gem) {
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

Gem.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width,this.height);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var gameReady = false;
var lives = 3;
var score = 0;
var selected;
var allEnemies = [];
var allGems = [];
var playerSprites = {boy:'images/char-boy.png', girl:'images/char-princess-girl.png'};
var gemSprites = ['images/Gem_Blue.png','images/Gem_Green.png','images/Gem_Orange.png'];
var enemyPos = [60,145,230];
var gemPos = [[25,125,225,325,425],[140,225,310]];
var player = new Player(200,400);
var enemyQuantity = 3;
var gemQuantity = 2;
document.addEventListener('keyup',press, true);
gemGenerate();
enemyGenerate();



// Rebuilded *
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var press = function(e) {
     var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
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

// Win game
function win() { 
    player.x = 200;
    player.y = 400;
    pauseGame(); 
}

function lose() {
    ctx.globalCompositeOperation="source-over";
    ctx.strokeStyle="red";
    ctx.lineWidth = "6";                  
    ctx.rect(125,270,100,120);            
    ctx.stroke();  
    console.log('ggg');
    pauseGame();    
}

// Pause game
function pauseGame() {
    allEnemies.forEach(function(enemy) {
        enemy.speed = 0;
    });
    document.removeEventListener('keyup',press,true);    
}

// Resume Game
function resumeGame() {
    allEnemies.forEach(function(enemy) {
        enemy.speed = 100;
    });
    document.addEventListener('keyup',press,true);
}

function restartGame(){

}


