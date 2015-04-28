define([
    'backbone'
], function(
    Backbone
){

    var Score = Backbone.Model.extend({
    	/*url: 'auth',
    	sync: apiSync,*/
    	defaults: {
    		"name" : '',
    		"score": 0
    	}
    });

    return Score;
});