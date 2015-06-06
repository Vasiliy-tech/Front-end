define([
    'backbone',
    'tmpl/game',
    'phaser',
    'states/menu',
    'states/game'
], function(
    Backbone,
    tmpl,
    Phaser,
    game
){

    var View = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'gamefield',
        events: { 
            "click .backButton__inGame": "finished",                 
        },
        initialize: function () {

        },
        render: function () {     
            this.$el.html(this.template());
            
            console.log(game);
            console.log(game.get());
            return this;
        },
        show: function () {
            this.trigger('show',this);
            game.create(this.el); 
            game.start();
            console.log(game.get());
            this.$el.show();

            //this.game.state.start('Boot');
        },
        hide: function () {
            this.$el.hide();
        },
        finished:function(){
            game.finished();
        }
    });

    return new View();
});

