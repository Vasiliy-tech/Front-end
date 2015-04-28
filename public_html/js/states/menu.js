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
	var ws
	return {
		create: function(el){
			game =  new Phaser.Game(800,480, Phaser.AUTO,el);   
			//console.log(game);
		},
		start: function(){
			game.state.add('Boot', Boot.init(game), false);
			game.state.add('PreLoader',PreLoader.init(game),false);
            
            ws = new WebSocket("ws://127.0.0.1:8080/gameplay");
			    console.log("Create");
		    ws.onopen = function (event) {
		        console.log("open");
		    };
			ws.onmessage = function (event) {
				var data = JSON.parse(event.data);			
				if(data.status == "start"){
					console.log(data);
					game.state.add('Game', Game.init(game, data.position, ws), false);
					game.state.add('GameOver', GameOver.init(game), false);
          			game.state.start('Boot');
				}
				
			};
			/*Without server*/
			
            
		},
		finished: function(){
			Game.stopScores();
			ws.close();
		},
		get: function(){
			//console.log("Get game");
			return game;
		}
	};
});