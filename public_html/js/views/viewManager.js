define([
	'backbone'
], function(Backbone){

	var ViewManager = Backbone.View.extend({
		initialize: function(){
			console.log("Init viewManager");
			this.listenTo(Backbone.Events, 'error', this.showError);
			this.$el = $('.page');
			this.views = {};
			this.inLoad = false;
		},
		addViews : function(views){

			_.forEach(views, function(view,name){
				 console.log("Add view:",name);
				 this.views[name] = view;
				 this.listenTo(this.views[name], 'show', this.hide);
				 

			}, this);
		},
		get: function(name){
			this.trigger('stopall');
			console.log("Get view:",name);
			var view = this.views[name];
			this.views[name].render();
			this.$el.append(view.$el);
			return view;
		},
		hide: function(view){
			
			  _.forEach(this.views, function (v) {
                if (view !== v) {
                    v.hide();
                }
            });
		}
	});
	return new ViewManager();
});