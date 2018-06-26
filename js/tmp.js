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
        ctx.fillText("Use left,right arrow to select. Down - confirm.",250,260);
        document.addEventListener('keyup', function(e) {
            var allowedKeys = {
                37: 'left',
                39: 'right',
                40: 'down'
            };

            if(allowedKeys[e.keyCode] === 'left') {
                console.log('left');
            }
            if(allowedKeys[e.keyCode] === 'right') {
                console.log('right');   
            }
            if(allowedKeys[e.keyCode] === 'down') {
                console.log('down');   
            }
        });


        
        

        // gameReady();
        
    }
    // ---------------------



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
        ctx.fillText("Use left,right arrow to select.",250,260);
        // console.log(ctx);
        document.addEventListener('keyup', function(e) {
            var allowedKeys = {
                37: 'left',
                39: 'right',
                32: '(space)'
            };

            if(allowedKeys[e.keyCode] === 'left') {
                selected = 'images/char-boy.png';
                console.log(ctx + "ggg");
            }
            if(allowedKeys[e.keyCode] === 'right') {
                selected = 'images/char-princess-girl.png';   
                // console.log(selected);
            }
            if(allowedKeys[e.keyCode] === '(space)') {
                // if(player.sprite)
                // console.log(player.sprite + ' before')
                player.sprite = selected;
                // console.log(player.sprite + ' after');
                gameReady = true;
            }
        });        
    }
    else {    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
