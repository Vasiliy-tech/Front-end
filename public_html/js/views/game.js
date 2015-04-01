define([
    'backbone',
    'tmpl/game',
    'phaser'
], function(
    Backbone,
    tmpl,
    Phaser
){

    var View = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'gamefield',
        initialize: function () {
            
            
        },
        render: function () {
            this.$el.html(this.template());
            var game = new Phaser.Game(800,480, Phaser.AUTO,"gamefield");
           /**************************************************/
            var BootGameState = new Phaser.State();
            var PreloaderGameState = new Phaser.State();
            var GameState = new Phaser.State();
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
             /**************************************************/
             var loadAssets = function loadAssets() {
                // game.load.spritesheet('bird', 'img/bird.png', 48, 35);
                // game.load.spritesheet('clouds', 'img/clouds.png', 64, 34);

                game.load.image('background', 'img/background.png');
            };
            PreloaderGameState.preload = function() {
                loadAssets();
            };

            PreloaderGameState.create = function() {
                var tween = game.add.tween(LoadingText).to({
                    alpha: 0
                }, 1000, Phaser.Easing.Linear.None, true);

                tween.onComplete.add(function() {
                    game.state.start('Game', false, false);
                }, this);
            };
            /**************************************************/
            game.state.add('Boot', BootGameState, false);
            game.state.add('Preloader', PreloaderGameState, false);
            game.state.add('Game', GameState, false);
            /*Game.state.add('MainMenu', MainMenuState, false);
            Game.state.add('GameOver', GameOverState, false);*/
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

