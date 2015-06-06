define([
    'backbone',
    'tmpl/gamepadStart'
], function(
    Backbone,
    tmpl
){
    // my phone IP change it
    var socketAdress = "ws://192.168.43.123:8080/gameplay";
    //var socketAdress = "ws://127.0.0.1:8080/gameplay";
    var isItNotOpen = true;
    var socketIsOpen = false;
    var ws;
    var TouchDevice = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'gamepadStart',
        events: { 
                  "touchstart div.gamepadButton__menu": "showGamepad",                                            
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