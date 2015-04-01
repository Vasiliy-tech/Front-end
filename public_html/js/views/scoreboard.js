define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    Scores
){

    var Scoreboard = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'scoreboard menu',
        collection: Scores,
        initialize: function () {
            Scores.add([{name:'Vasya', score:5}, {name:'Petya', score:11}, {name:'Boria', score:2}]);
            Scores.add({name:'Vasya', score:0});
        },
        render: function () {

            this.$el.html(this.template({temp: this.collection.toJSON()}));

            return this;
        },
        show: function () {
            this.trigger('show',this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },
        destroy: function() {
            alert("Back!");
        }

    });

    return new Scoreboard();
});