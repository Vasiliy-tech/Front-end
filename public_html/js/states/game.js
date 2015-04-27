define([
    'phaser',
    'states/menu'
], function(
    Phaser,
    game
){
	var gameState;
	return {
		init: function(game, position,ws) {
			gameState = new Phaser.State();
			gameState.create = function() {
		        this.game.add.sprite(0,0,'background');
		        
		        this.MAX_SPEED = 350;
		        this.NUMBER_OF_BULLETS = 20;
		        this.BULLET_SPEED = 800;
		        if(position === 1){
		        	this.player = this.game.add.sprite(32, this.game.height-100, 'myhero');
		        	this.player.frame = 5;
		        } else {
		        	this.player = this.game.add.sprite(this.game.width-32, this.game.height-100,'myhero');
		        	this.player.frame = 4;
		        }
		   		
		    
		    	this.game.physics.arcade.enable(this.player);

			    this.player.body.bounce.y = 0.2;
			    this.player.body.gravity.y = 900;
			    this.player.body.collideWorldBounds = true;
			    if (position === 1){
				    this.player.animations.add('left', [4,3,2,1,0],10,true);
				    this.player.animations.add('right', [5,6,7,8,9],10, true);
			    } else {
			    	this.player.animations.add('right', [5,6,7,8,9],10, true);
			    	this.player.animations.add('left', [4,3,2,1,0],10,true);
			    }
			    this.enemy = this.game.add.sprite(this.game.width-32, this.game.height-100,'myhero');  
			    this.game.physics.arcade.enable(this.enemy);

			    this.enemy.body.bounce.y = 0.2;
			    this.enemy.body.gravity.y = 900;
			    this.enemy.body.collideWorldBounds = true;
			    
			    this.ground = this.game.add.group();
			    this.game.physics.arcade.collide(this.player, this.ground);
			    this.game.physics.arcade.collide(this.enemy, this.ground);
			        for(var x = 0; x < this.game.width; x += 32) {
			            var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
			            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			            groundBlock.body.immovable = true;
			            groundBlock.body.allowGravity = false;
			            this.ground.add(groundBlock);
			         }
			        for(var x = 32; x < this.game.width/2.5; x += 32) {  
			            var groundBlock = this.game.add.sprite(x, this.game.height - 132, 'ground');
			            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			            groundBlock.body.immovable = true;
			            groundBlock.body.allowGravity = false;
			            this.ground.add(groundBlock);
			         }
			         for(var x = 0; x < this.game.width/3.5; x += 32) {
			            var groundBlock = this.game.add.sprite(x, this.game.height - 232, 'ground');
			            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			            groundBlock.body.immovable = true;
			            groundBlock.body.allowGravity = false;
			            this.ground.add(groundBlock);
			         }
			        this.bulletPool = this.game.add.group();
			        for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
			            var bullet = this.game.add.sprite(0, 0, 'bullet');
			            this.game.physics.arcade.enable(bullet);
			            bullet.body.gravity.y = 980;
			            this.bulletPool.add(bullet);

			            bullet.anchor.setTo(0.5, 0.5);

			            this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

			           
			            bullet.kill();
			        }
			        this.explosionGroup = this.game.add.group();
			        this.game.input.keyboard.addKeyCapture([
			        Phaser.Keyboard.LEFT,
			        Phaser.Keyboard.RIGHT,
			        Phaser.Keyboard.UP,
			        Phaser.Keyboard.DOWN,
			        Phaser.Keyboard.SPACEBAR
			    ]);   
		    };

		    gameState.shootBullet = function(){
			    if (this.lastBulletShotAt === undefined) 
			        this.lastBulletShotAt = 0;
			    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) 
			        return;
			    this.lastBulletShotAt = this.game.time.now;
			    var bullet = this.bulletPool.getFirstDead();
			    if (bullet === null || bullet === undefined) 
			        return;
			    bullet.revive();
			    bullet.checkWorldBounds = true;
			    bullet.outOfBoundsKill = true;           
			   
			    if(this.player.animations.name == "right") {
			    	bullet.reset(this.player.x+this.player.width, this.player.y+this.player.height/10);
			    	bullet.rotation = -0.2;
			    } else {
			    	bullet.reset(this.player.x-this.player.width, this.player.y+this.player.height/10);
			    	bullet.rotation = Math.PI + 0.2;
			    }
			    bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
			    bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
		    };

		    gameState.update = function() {
		    	ws.onmessage = function(event){
		    		var data = JSON.parse(event.data);
		    		console.log(data);
		    		console.log(position);
		    		if(data.Player !== position){
		    			console.log("TADA");
		    			console.log(data);
		    		if(data.action == "1"){	    				
		    				this.enemy.body.velocity.y=-this.MAX_SPEED*1.3;
		    			}
		    		}
		    	}
		        this.game.physics.arcade.collide(this.player, this.ground);
		        this.game.physics.arcade.collide(this.enemy, this.ground);
		        this.game.physics.arcade.collide(this.bulletPool, this.ground, function(bullet, ground) {
		        	this.getExplosion(bullet.x, bullet.y);
					bullet.kill();
		   		}, null, this);
		        this.game.physics.arcade.collide(this.bulletPool, this.enemy, function(bullet, enemy) {
		          	this.getExplosion(bullet.x, bullet.y);
		            bullet.kill();
		            enemy.kill();
		        }, null, this);
		        var onTheGround = this.player.body.touching.down;
		        if (this.leftInputIsActive()) {
		        	var action = 3;
		        	var message = "{\"Player\":\""+position+"\",\"action\":\""+action+"\"}";
		        	ws.send(message);
		            this.player.body.velocity.x = -this.MAX_SPEED;
		            this.player.animations.play('left');
		        } else if (this.rightInputIsActive()) {
		        	var action = 1;
		        	var message = "{\"Player\":\""+position+"\",\"action\":\""+action+"\"}";
		        	ws.send(message);
		            this.player.body.velocity.x = this.MAX_SPEED;
		            this.player.animations.play('right');

		        } else if(onTheGround && this.upInputIsActive()){
		        	var action = 0;
		        	var message = "{\"Player\":\""+position+"\",\"action\":\""+action+"\"}";
		        	ws.send(message);
		            this.player.body.velocity.y = -this.MAX_SPEED*1.3;
		           
		        } else if(this.downInputIsActive()){
		        	var action = 2;
		        	var message = "{\"Player\":\""+position+"\",\"action\":\""+action+"\"}";
		        	ws.send(message);
		            this.player.body.velocity.y = this.MAX_SPEED;
		            
		        } else if (this.spaceInputIsActive()){
		        	var action = 5;
		        	var message = "{\"Player\":\""+position+"\",\"action\":\""+action+"\"}";
		        	ws.send(message);
		            this.shootBullet();
		        } else { 	
	        		/*var action = 4;
		        	var message = "{\"Player\":\""+position+"\",\"action\":\""+action+"\"}";
		        	ws.send(message);*/
		            this.player.animations.stop();
		            this.player.body.velocity.x = 0;
		            
		            if(this.player.animations.name == "right")
		           		this.player.frame = 5;
		           	else
		           		this.player.frame = 4;

		        }

		        this.bulletPool.forEachAlive(function(bullet) {
		            bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
		        }, this);
		    };
		    gameState.getExplosion = function(x,y){
		        var explosion = this.explosionGroup.getFirstDead();

		        if (explosion === null){
		            explosion = this.game.add.sprite(0, 0, 'explosion');
		            explosion.anchor.setTo(0.5, 0.5);
		            var animation = explosion.animations.add('boom', [0,1], 60, false);
		            animation.killOnComplete = true;

		            this.explosionGroup.add(explosion);
		        }
		        explosion.revive();

		       
		        explosion.x = x;
		        explosion.y = y;

		        explosion.angle = this.game.rnd.integerInRange(0, 360);

		        explosion.animations.play('boom');

		        return explosion;
		    };
		    gameState.spaceInputIsActive = function() {
		    	var isActive = false;

			    isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
			    this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
			    return isActive;
		    };
		    gameState.leftInputIsActive = function() {
			    var isActive = false;
			    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
			    

			    return isActive;
			    };
			gameState.upInputIsActive = function(duration) {
			    var isActive = false;
			    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP,duration);

			    return isActive;
		    };
		    gameState.rightInputIsActive = function() {
		        var isActive = false;

		        isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

		        return isActive;
		    };
		    gameState.downInputIsActive = function() {
		        var isActive = false;

		        isActive = this.input.keyboard.isDown(Phaser.Keyboard.DOWN);
		        this.input.keyboard.removeKey(Phaser.Keyboard.DOWN);

		        return isActive;
		    };
			return gameState;
		}
	};   
});