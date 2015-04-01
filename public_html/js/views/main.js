define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var Main = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'menu',
        initialize: function () {
        
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        show: function () {
            this.trigger('show',this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });
    
    return new Main();
});