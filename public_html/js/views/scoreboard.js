define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    Scores
){
    var limit;
    var data = [];
    var name;
    var score;
    var Scoreboard = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'scoreboard menu',
        collection: Scores,
        initialize: function () {
        },
        render: function () {

            this.$el.html(this.template({temp: this.collection.toJSON()}));

            return this;
        },
        show: function () {
            $.ajax({
                type: 'GET',
                url: '/api/v1/score?limit=5',
                async: false,
                success: function(result, code){
                    console.log(result);

                    if (result.status === 200)
                    {
                        limit = result.data.scoreList.length;
                        data = result.data.scoreList;                   
                    } 
                    else 
                    {
                                  
                    }
                },
                error:  function(xhr, str){
                     $('.content').html('Критическая ошибка'); 
                },
            });
            var i = 0;
            while (i < limit && i < 4) {
                name = data[i].login;
                score = data[i].score;
                Scores.add({name: name, score: score});
                i = i + 1;
            }
            this.$el.html(this.template({temp: this.collection.toJSON()}));
            this.trigger('show',this);
            this.$el.show();
        },
        hide: function () {
            Scores.reset();
            this.$el.hide();
        },
        destroy: function() {
            alert("Back!");
        }

    });

    return new Scoreboard();
});