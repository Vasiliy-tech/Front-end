define([
    'backbone',
    'tmpl/gamepadRule'
], function(
    Backbone,
    tmpl
){
    var TouchDevice = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'gamepadRule menu',
        events: { 
                                                            
        },
        initialize: function () {
            //this.$el.removeClass('menu');
            //$(this.el).find('.circle').css({'height' : '10px'});
        },
        render: function () {
            this.$el.html(this.template(this.attributes));
            return this;
        },
        show: function () {    
            this.trigger('show',this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },
        showGamepad: function () {
            window.location.href = '#touchDevice';
        }

    });
    return new TouchDevice();
});