define([
    'phaser',
    'states/menu'
], function(
    Phaser,
    game
){
	var gameState;
	return {
		init: function(game){
			gameState = new Phaser.State();
			gameState.create = function() {
		        this.game.add.sprite(0,0,'background');
		        
		        this.MAX_SPEED = 350;
		        this.NUMBER_OF_BULLETS = 20;
		        this.BULLET_SPEED = 800;

		   		this.player = this.game.add.sprite(32, this.game.height-100, 'myhero');
		    
		    	this.game.physics.arcade.enable(this.player);

			    this.player.body.bounce.y = 0.2;
			    this.player.body.gravity.y = 900;
			    this.player.body.collideWorldBounds = true;
			    this.player.animations.add('right', [5,6,7,8,9],10, true);
			    this.player.animations.add('left', [4,3,2,1,0],10,true);
			    

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
			    bullet.reset(this.player.x+this.player.width, this.player.y+this.player.height/10);
			    bullet.rotation = -0.2;

			    bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
			    bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
		    };

		    gameState.update = function() {
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

		        if (this.leftInputIsActive()) {
		            this.player.body.velocity.x = -this.MAX_SPEED;
		            this.player.animations.play('left');
		        } else if (this.rightInputIsActive()) {
		            this.player.body.velocity.x = this.MAX_SPEED;
		            this.player.animations.play('right');
		        } else if(this.upInputIsActive()){
		            this.player.body.velocity.y = -this.MAX_SPEED*1.3;
		           
		        } else if(this.downInputIsActive()){
		            this.player.body.velocity.y = this.MAX_SPEED;
		            
		        } else if (this.spaceInputIsActive()){
		            this.shootBullet();
		        } else {
		            this.player.animations.stop();
		            this.player.body.velocity.x = 0;
		           
		            this.player.frame = 5;
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
			    gameState.upInputIsActive = function() {
			    var isActive = false;

			    isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
			    this.input.keyboard.removeKey(Phaser.Keyboard.UP);

			    return isActive;
		    };
		    gameState.rightInputIsActive = function() {
		        var isActive = false;

		        isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.player.body.x < 350;

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