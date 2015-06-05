define([
    'backbone',
    'views/game',
    'views/main',
    'views/login',
    'views/scoreboard',
    'views/viewManager',
    'views/signin',
    'views/gamepad',
    'views/touchDevice',
    'views/gamepadStart',
], function(
    Backbone,
    game,
    main,
    login,
    scoreboard,
    manager,
    signin,
    gamepad,
    touchDevice,
    gamepadStart
){
    manager.addViews({
        'main'  : main,
        'game'  : game,
        'login' : login,
        'scoreboard' : scoreboard,
        'signin' : signin,
        'gamepad' : gamepad,
        'touchDevice' : touchDevice,
        'gamepadStart' : gamepadStart,
    });
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'signin' : 'signinAction',
            'gamepad' : 'gamepadAction',
            'touchDevice' : 'touchDeviceAction',
            'gamepadStart' : 'gamepadStartAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            main.show();
        },
        scoreboardAction: function () {
            scoreboard.show();
        },
        gameAction: function () {
            game.show();
        },
        loginAction: function () {
            login.show();
        },
        signinAction: function() {
            signin.show();
        },
        gamepadAction: function() {
            gamepad.show();
        },
        touchDeviceAction: function() {
            touchDevice.show();
        },
        gamepadStartAction: function() {
            gamepadStart.show();
        }
    });

    return new Router();
});