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
            manager.get('main').show();
        },
        scoreboardAction: function () {
            manager.get('scoreboard').show();
        },
        gameAction: function () {
            manager.get('game').show();
        },
        loginAction: function () {
            manager.get('login').show();
        }
    });

    return new Router();
});