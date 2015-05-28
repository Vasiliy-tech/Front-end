define([
    'phaser',
    'states/menu'
], function(
    Phaser,
    game
){
	var preloaderGameState;
	return {
		init: function(game){
			preloaderGameState= new Phaser.State();
			var loadAssets = function loadAssets() {
		        game.load.image('background', '../img/background.png');
		        game.load.image('bullet','../img/bullet.png');
		        game.load.image('ground', '../img/ground.png');
		        game.load.spritesheet('myhero', '../img/2.gif', 25,38);
		        game.load.spritesheet('explosion', '../img/explosion.png', 35,31);     
	 		};
	    	preloaderGameState.preload = function() {
	        	loadAssets();
	    	};
			preloaderGameState.create = function(){
		        var tween = game.add.tween(LoadingText).to({
		            alpha: 0
		        }, 1000, Phaser.Easing.Linear.None, true);

		        tween.onComplete.add(function() {
		        	//this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
		            game.state.start('Game', false, false);
		        }, this);
		    };
	   		return preloaderGameState;
	   	}
	};
});