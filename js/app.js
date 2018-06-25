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
    if(gamePrepare != true) {
    }
    else {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


Enemy.prototype.randPosition = function(arr) {
    var pos = arr[Math.floor(Math.random() * arr.length)] 
    return pos;
}
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
  
Player.prototype.render = function() {
  if(gamePrepare != true) {
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
        ctx.fillText("Use left,right arrow to select.",250,260);
        document.addEventListener('keyup', function(e) {
            var allowedKeys = {
                37: 'left',
                39: 'right',
                40: 'down'
            };

            if(allowedKeys[e.keyCode] === 'left') {
                player.sprite = 'images/char-boy.png';
                gameReady();   
            }
            if(allowedKeys[e.keyCode] === 'right') {
                player.sprite = 'images/char-princess-girl.png';
                gameReady();   
            }
            if(allowedKeys[e.keyCode] === 'down') {
                console.log('down');   
            }
        });        
    }
    else {    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



var enemy;
var allEnemies = [];
var playerSprites = {boy:'images/char-boy.png', girl:'images/char-princess-girl.png'};
gamePrepare = false;
var enemyPos = [60,145,230];
// var player = new Player(200,400, 'images/char-boy.png');
var player = new Player(200,400);
var enemyQuantity = 3;
enemyGenerate();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



function randPosition(arr) {
     return (arr[Math.floor(Math.random() * arr.length)]);
}

function enemyGenerate () {
    allEnemies = [];
    while(enemyQuantity!=0){
        enemy = new Enemy(0, randPosition(enemyPos), 1 + Math.floor(Math.random() * 512));
        allEnemies.push(enemy);
        enemyQuantity--;
        }
    enemyQuantity;
}

function gameReady() {
    gamePrepare = true;
}


