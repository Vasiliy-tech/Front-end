define([
    'phaser',
    'states/menu'
], function(
    Phaser,
    game
){
	var gameOverState = new Phaser.State();
	var socket;
	var positionPlayer;
	var win;
    return {
    	init: function () {

    			
    		return gameOverState;
    	},
    	create: function(ws,position,winner) {
            
    		if (positionPlayer == win){
	    		// var tween = game.debug.text("YOU WIN!","#FFFFFF");
	    		console.log("YOU WIN")
	    		this.game.add.text("YOU WIN!","#FFFFFF");
				gameOverTitle.anchor.setTo(0.5,0.5);
	    	} else {
	    			var tween = game.add.text("YOU LOSE!");
	    			console.log("YOU close")
	    	}
	    	socket.close();	
    	}
    };
});