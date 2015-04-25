define([
    'backbone',
    'views/game',
    'views/main',
    'views/login',
    'views/scoreboard',
    'views/viewManager'
], function(
    Backbone,
    game,
    main,
    login,
    scoreboard,
    manager
){
    manager.addViews({
        'main'  : main,
        'game'  : game,
        'login' : login,
        'scoreboard' : scoreboard
    });
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
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
        }
    });

    return new Router();
});