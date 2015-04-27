define([
    'backbone',
    'views/game',
    'views/main',
    'views/login',
    'views/scoreboard',
    'views/viewManager',
    'views/signin'
], function(
    Backbone,
    game,
    main,
    login,
    scoreboard,
    manager,
    signin
){
    manager.addViews({
        'main'  : main,
        'game'  : game,
        'login' : login,
        'scoreboard' : scoreboard,
        'signin' : signin
    });
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'signin' : 'signinAction',
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
        }
    });

    return new Router();
});