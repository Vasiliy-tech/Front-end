define([
    'backbone',
    'tmpl/game',
    'phaser'
], function(
    Backbone,
    tmpl,
    Phaser,
    BootGameState
){

    var View = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        id: 'gamefield',
        initialize: function () {
            
            
        },
        render: function () {
            this.$el.html(this.template());
            var game = new Phaser.Game(800,480, Phaser.AUTO,'gamefield');
            
           /**************************************************/
            var BootGameState = new Phaser.State();
            var PreloaderGameState = new Phaser.State();
            var GameState = new Phaser.State();
            var GameOverState = new Phaser.State();
            BootGameState.create = function() {
                LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "Loading...", {
                    font: '32px "Press Start 2P"',
                    fill: '#FFFFFF',
                    stroke: '#000000',
                    strokeThickness: 3,
                    align: 'center'
                });
                LoadingText.anchor.setTo(0.5, 0.5);
                game.state.start('Preloader', false, false);
            };
            
             var loadAssets = function loadAssets() {
                game.load.image('background', '../img/background.png');
                game.load.image('myhero', '../img/1.png');
            };
            PreloaderGameState.preload = function() {
                loadAssets();
            };

            PreloaderGameState.create = function(){
                var tween = game.add.tween(LoadingText).to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, true);

                tween.onComplete.add(function() {
                    game.state.start('Game', false, false);
                }, this);
            };
            /**************************************************/
            GameState.create = function() {
            
              this.game.add.sprite(0,0,'background');
              this.MAX_SPEED = 500;
              
              this.player = this.game.add.sprite(this.game.width/2, this.game.height-64, 'myhero');
              this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
              console.log(this.player.body); 
              this.player.body.collideWorldBounds = true;  
               this.game.input.keyboard.addKeyCapture([
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.UP,
                Phaser.Keyboard.DOWN
            ]);
                this.ground = this.game.add.group();
                /*for(var x = 0; x < this.game.width; x += 32) {
                    // Add the ground blocks, enable physics on each, make them immovable
                    var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
                    this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
                    groundBlock.body.immovable = true;
                    groundBlock.body.allowGravity = false;
                    this.ground.add(groundBlock);
                 }*/
            };
            GameState.update = function() {
                // Collide the player with the ground
                //this.game.physics.arcade.collide(this.player, this.ground);
                if (this.leftInputIsActive()) {
                    // If the LEFT key is down, set the player velocity to move left
                    this.player.body.velocity.x = -this.MAX_SPEED;
                } else if (this.rightInputIsActive()) {
                    // If the RIGHT key is down, set the player velocity to move right
                    this.player.body.velocity.x = this.MAX_SPEED;
                } else if(this.upInputIsActive()){
                    this.player.body.velocity.y = -this.MAX_SPEED;
                } else if(this.downInputIsActive()){
                    this.player.body.velocity.y = this.MAX_SPEED;
                } else {
                    // Stop the player from moving horizontally
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = 0;
                }
            };
            GameState.leftInputIsActive = function() {
            var isActive = false;

            isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
            isActive |= (this.game.input.activePointer.isDown &&
                this.game.input.activePointer.x < this.game.width/4);

            return isActive;
            };
            GameState.upInputIsActive = function() {
            var isActive = false;

            isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
            isActive |= (this.game.input.activePointer.isDown &&
                this.game.input.activePointer.y < this.game.height/4);

            return isActive;
            };
            GameState.rightInputIsActive = function() {
                var isActive = false;

                isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.player.body.x < 350;
                // isActive |= (this.game.input.activePointer.isDown &&
                //     this.game.input.activePointer.x > 10000);

                return isActive;
            };
            GameState.downInputIsActive = function() {
                var isActive = false;

                isActive = this.input.keyboard.isDown(Phaser.Keyboard.DOWN);
                isActive |= (this.game.input.activePointer.isDown &&
                    this.game.input.activePointer.y > this.game.height/2 + this.game.height/4);

                return isActive;
            };
            game.state.add('Boot', BootGameState, false);
            game.state.add('Preloader', PreloaderGameState, false);
            game.state.add('Game', GameState, false);
            game.state.add('GameOver', GameOverState, false);
            game.state.start('Boot');
            
            return this;
        },
        show: function () {
            this.trigger('show',this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});

