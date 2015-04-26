define([
    'phaser'
], function(
    Phaser
){
    var bootGameState;

    return {
        init: function(game) {
            console.log("TADA");
            console.log(game);
           // debugger;
            bootGameState = new Phaser.State();
            bootGameState.create = function() {
                LoadingText = game.add.text(game.world.width / 2, game.world.height / 2, "Loading...", {
                    font: '32px "Press Start 2P"',
                    fill: '#FFFFFF',
                    stroke: '#000000',
                    strokeThickness: 3,
                    align: 'center'
                });
                LoadingText.anchor.setTo(0.5, 0.5);
                game.state.start('PreLoader', false, false);
            };
            return bootGameState;
        }
    };
});