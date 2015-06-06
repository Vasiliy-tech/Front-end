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
    'views/gamepadRule',
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
    gamepadStart,
    gamepadRule
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
        'gamepadRule' : gamepadRule,
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
            'gamepadRule' : 'gamepadRuleAction',
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
        },
        gamepadRuleAction: function() {
            gamepadRule.show();
        }
    });

    return new Router();
});