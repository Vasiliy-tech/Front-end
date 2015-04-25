define([
    'phaser',
    'states/boot',
    'states/preloader',
    'states/game',
    'states/gameover'
], function(
    Phaser,
    Boot,
    PreLoader,
    Game,
    GameOver
){
	var game;

	return {
		create: function(el){
			game =  new Phaser.Game(800,480, Phaser.AUTO,el);   
			//console.log(game);
		},
		start: function(){
			game.state.add('Boot', Boot.init(game), false);
			game.state.add('PreLoader',PreLoader.init(game),false);
            game.state.add('Game', Game.init(game), false);
            game.state.add('GameOver', GameOver.init(game), false);
            game.state.start('Boot');
		},
		get: function(){
			//console.log("Get game");
			return game;
		}
	};
});