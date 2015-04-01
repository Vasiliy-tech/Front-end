define([
    'game'
], function(
    Phaser
){
var BootGameState = new Phaser.State();
    console.log(Phaser.GAMES);
    BootGameState.create = function() {
        LoadingText = game.add.text(Game.world.width / 2, Game.world.height / 2, LOADING_TEXT, {
            font: '32px "Press Start 2P"',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        LoadingText.anchor.setTo(0.5, 0.5);
        game.state.start('Preloader', false, false);
    };

    return BootGameState;
});