define([
    'backbone',
    'models/score'
], function(
    Backbone,
    Score
){

    var Scores = Backbone.Collection.extend({
    	model: Score
    });

    var myScores = new Scores();
    myScores.comparator = function(Score) {
    	var element = Score.get("score"); 
        return (-element);
    };

    return myScores;
});