define([
	'backbone'
], function(Backbone){

	var ViewManager = Backbone.View.extend({
		initialize: function(){
			console.log("Init viewManager");
			this.$el = $('.page');
			this.views = {};
		},
		addViews : function(views){
			_.forEach(views, function(view,name){
				 console.log("Add view:",name);
				 this.views[name] = view;
				 this.listenTo(this.views[name], 'show', this.hide);
				 this.$el.append(view.$el);

			}, this);
		},
		get: function(name){
			this.trigger('stopall');
			console.log("Get view:",name);
			var view = this.views[name];
			this.views[name].render();
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