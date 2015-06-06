define([
    'phaser',
    'states/menu',
    'states/gameover'
], function(
    Phaser,
    game,
    GameOver
){
	var gameState;
	var data;
	var flag;
	var score;
	var scoreText;
	var timer;
	var timerEvent;
	var flag = false;
	var queuePlayer = [];  
	var queueEnemy = [];  
	var queueTimer = [];
	var shootingPlayer = [];
	var shootingEnemy = [];
	var currentMessageForPlayer;
	var currentMessageForEnemy;
	var currentMessageForTimer; 
	var sendCoord = {
		check: '',
 		x: '',
 		y:'',
	};
	var sendShoot = {
		fire:'success'
	}
	return {
		init: function(game, position, ws) {
			gameState = new Phaser.State();
			function minusScore(){
			   
			 }
			gameState.create = function() {
		        this.game.add.sprite(0,0,'background');

		        score = 100;
				
				

				timer = this.game.time.create();
				timerEvent = timer.add(Phaser.Timer.SECOND*100,this.minusScore,this);
				timer.start();
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
				    this.enemy = this.game.add.sprite(this.game.width-32, this.game.height-100,'myhero');
				    this.enemy.animations.add('right', [5,6,7,8,9],10, true);
				    this.enemy.animations.add('left', [4,3,2,1,0],10,true);
			    } else {
			    	this.player.animations.add('left', [4,3,2,1,0],10,true);
				    this.player.animations.add('right', [5,6,7,8,9],10, true);
			    	this.enemy = this.game.add.sprite(32, this.game.height-100, 'myhero');
			    	this.enemy.animations.add('left', [4,3,2,1,0],10,true);
			    	this.enemy.animations.add('right', [5,6,7,8,9],10, true);
			    }
			      
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
			        for(var x = 32; x < this.game.width/1.5; x += 32) {  
			            var groundBlock = this.game.add.sprite(x, this.game.height - 132, 'ground');
			            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			            groundBlock.body.immovable = true;
			            groundBlock.body.allowGravity = false;
			            this.ground.add(groundBlock);
			         }
			         for(var x = 0; x < this.game.width/2.5; x += 32) {
			            var groundBlock = this.game.add.sprite(x, this.game.height - 232, 'ground');
			            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			            groundBlock.body.immovable = true;
			            groundBlock.body.allowGravity = false;
			            this.ground.add(groundBlock);
			         }
			         for(var x = 400; x < this.game.width/1.0; x += 32) {
			            var groundBlock = this.game.add.sprite(x, this.game.height - 232, 'ground');
			            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			            groundBlock.body.immovable = true;
			            groundBlock.body.allowGravity = false;
			            this.ground.add(groundBlock);
			         }
			         for(var x = 64; x < this.game.width/2.0; x += 32) {
			            var groundBlock = this.game.add.sprite(x, this.game.height - 332, 'ground');
			            this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
			            groundBlock.body.immovable = true;
			            groundBlock.body.allowGravity = false;
			            this.ground.add(groundBlock);
			         }
			         for(var x = 128; x < this.game.width/1.2; x += 32) {
			            var groundBlock = this.game.add.sprite(x, this.game.height - 432, 'ground');
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
		    gameState.shootBulletForEnemy = function() {
		    	if (this.lastBulletForEnemyShotAt === undefined) 
			        this.lastBulletForEnemyShotAt = 0;
			    if (this.game.time.now - this.lastBulletForEnemyShotAt < this.SHOT_DELAY) 
			        return;
			    this.lastBulletForEnemyShotAt = this.game.time.now;
			    var bullet = this.bulletPool.getFirstDead();
			    if (bullet === null || bullet === undefined) 
			        return;
			    bullet.revive();
			    bullet.checkWorldBounds = true;
			    bullet.outOfBoundsKill = true;           
			   
			    if(this.enemy.animations.name == "right") {
			    	bullet.reset(this.enemy.x+this.enemy.width, this.enemy.y+this.enemy.height/10);
			    	bullet.rotation = -0.2;
			    } else {
			    	bullet.reset(this.enemy.x-this.enemy.width, this.enemy.y+this.enemy.height/10);
			    	bullet.rotation = Math.PI + 0.2;
			    }
			    bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
			    bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
		    };
		    ws.onmessage = function(event){
	    		data = JSON.parse(event.data);
	    		if(data.status == "sync"){
	    			queueTimer.push(data);
	    		} else if(data.status == "finish"){
	    			var str; 
	    			if(data.result == position){
	    				console.log("TADA");
	    				gameState.enemy.kill();
	    				str = "You WIN!";
	    			} else if (data.result == 0){
	    				str = "DRAW!";
	    				
	    				//game.gamePaused();
	    			} else {
	    				gameState.player.kill();
	    				str = "You LOSE!";
	    			}
	    			LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, str, {
				            font: '32px "Press Start 2P"',
				            fill: '#FFFFFF',
				            stroke: '#000000',
				            strokeThickness: 3,
				            align: 'center'
				        });
			        LoadingText.anchor.setTo(0.5, 0.5);
			        /*game.gamePaused();
			        ws.close;*/
	    		} else {
	    			if ( data.player == position ){
	    				queuePlayer.push(data);
	    			} else {
	    				queueEnemy.push(data);
	    			}
	    		}
	    	}
		    gameState.update = function() {
		    	
		    	
		    	sendCoord.x = this.player.x;
		    	sendCoord.y = this.player.y;

		    	var jsonCoord = JSON.stringify(sendCoord);
		    	ws.send(jsonCoord);

		    	var sendData = {
		    		action:'',
		    	};

		        this.game.physics.arcade.collide(this.player, this.ground);
		        this.game.physics.arcade.collide(this.enemy, this.ground);
		        this.game.physics.arcade.collide(this.player, this.enemy);
		        this.game.physics.arcade.collide(this.bulletPool, this.ground, function(bullet, ground) {
		        	this.getExplosion(bullet.x, bullet.y);
					bullet.kill();
		   		}, null, this);
		        this.game.physics.arcade.collide(this.bulletPool, this.enemy, function(bullet, enemy) {
		          	this.getExplosion(bullet.x, bullet.y);
		            //bullet.kill();
		            enemy.kill();
		        }, null, this);
		        this.game.physics.arcade.collide(this.bulletPool, this.player, function(bullet, player) {
		          	
		          	this.getExplosion(bullet.x, bullet.y);
		          	if (flag){
		          		var jsonShoot = JSON.stringify(sendShoot);
		          		console.log(jsonShoot);
		            	ws.send(jsonShoot);
		            	flag = false;
		          	}
		            //bullet.kill();
		  
		        }, null, this);
		        var onTheGround = this.player.body.touching.down;



		        if (this.leftInputIsActive()) {
		        	sendData.action = 3;
		      		
		        	var jsonData = JSON.stringify(sendData);
		        	ws.send(jsonData);     
		        } else if (this.rightInputIsActive()) {
		        	sendData.action = 1;
		        	
		        	var jsonData = JSON.stringify(sendData);
		        	ws.send(jsonData);
		        } else if(onTheGround && this.upInputIsActive()){
		        	sendData.action = 0;
		        	
		        	var jsonData = JSON.stringify(sendData);
		        	ws.send(jsonData);   
		        } else if(this.downInputIsActive()){
		        	sendData.action = 2;
		        	
		        	var jsonData = JSON.stringify(sendData);
		        	ws.send(jsonData);    
		        } else if (this.spaceInputIsActive()){
		        	sendData.action = 5;
		        	var jsonData = JSON.stringify(sendData);
		        	ws.send(jsonData);

		        } else {


		        }
	        	
		    	
		        this.bulletPool.forEachAlive(function(bullet) {
		            bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
		        }, this);
		        
		       
		    };
		   
		    gameState.render = function(){
		    	currentMessageForPlayer = queuePlayer.shift();
		    	currentMessageForEnemy = queueEnemy.shift();
		    	currentMessageForTimer = queueTimer.shift();


		    	 if(currentMessageForPlayer !== undefined){
		        	if(currentMessageForPlayer.action == 0){	    		
		    			this.player.body.velocity.y = -this.MAX_SPEED*1.3;
		    		} else if (currentMessageForPlayer.action == 1){
		    			this.player.body.velocity.x = this.MAX_SPEED;
	            		this.player.animations.play('right');
		    		} else if (currentMessageForPlayer.action == 2){
		    			this.player.body.velocity.y = this.MAX_SPEED;
					} else if (currentMessageForPlayer.action == 3){
						this.player.body.velocity.x = -this.MAX_SPEED;
	           			this.player.animations.play('left');
					} else if (currentMessageForPlayer.action == 5){
						this.shootBullet();
					}
		        } else {
		        	this.player.animations.stop();
		            this.player.body.velocity.x = 0;
	            	if(this.player.animations.name == "right")
		           		this.player.frame = 5;
		           	else
		           		this.player.frame = 4;
		        }
		        if(currentMessageForEnemy !== undefined){
		        	if(currentMessageForEnemy.action == 0){	  		
		    			this.enemy.body.velocity.y = -this.MAX_SPEED*1.3;
		    		} else if (currentMessageForEnemy.action == 1){
		    			this.enemy.body.velocity.x = this.MAX_SPEED;
		    			this.enemy.animations.play('right');
		    		} else if (currentMessageForEnemy.action == 2){
		    			this.enemy.body.velocity.y = this.MAX_SPEED;
					} else if (currentMessageForEnemy.action == 3){
						this.enemy.body.velocity.x = -this.MAX_SPEED;
						this.enemy.animations.play('left');
					} else if (currentMessageForEnemy.action == 5){
						this.shootBulletForEnemy();
						flag=true;
					}
		        } else {
		        	this.enemy.animations.stop();
		            this.enemy.body.velocity.x = 0;
	            	if(this.enemy.animations.name == "right")
		           		this.enemy.frame = 5;
		           	else
		           		this.enemy.frame = 4;
		        }
		    	if(currentMessageForTimer !== undefined){
		    		score = Math.round((currentMessageForTimer.time) / 1000);
			    			
	    			var minutes = "0" + Math.floor(score / 60);
			        var seconds = "0" + (score - minutes * 60);
			        var str = minutes.substr(-2) + ":" + seconds.substr(-2);
			        var healtLeft = currentMessageForTimer.firstPlayer.health;
			        var healtRight = currentMessageForTimer.secondPlayer.health;
	    			this.game.debug.text(str,2, 18, "#ff0");
					this.game.debug.text(healtLeft,10, 40, "#FF0000");
					this.game.debug.text(healtRight,750, 40, "#FF0000");
	    			if (position == currentMessageForTimer.firstPlayer.position){
	    				this.player.x  = currentMessageForTimer.firstPlayer.x;
	    				this.player.y  = currentMessageForTimer.firstPlayer.y;
	    				this.enemy.x  = currentMessageForTimer.secondPlayer.x;
	    				this.enemy.y  = currentMessageForTimer.secondPlayer.y;
	    				
	    			} else {
	    				this.player.x  = currentMessageForTimer.secondPlayer.x;
	    				this.player.y  = currentMessageForTimer.secondPlayer.y;
	    				this.enemy.x  = currentMessageForTimer.firstPlayer.x;
	    				this.enemy.y  = currentMessageForTimer.firstPlayer.y;
	    			}
		    	}
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
		},
		stopScores: function(){
			timer.stop();
		}
	};   
});