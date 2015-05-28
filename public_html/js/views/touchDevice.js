define([
    'backbone',
    'tmpl/touchDevice'
], function(
    Backbone,
    tmpl
){
    var ws;
    ws = new WebSocket("ws://127.0.0.1:8080/touch");
                console.log("touch socket create");
            ws.onopen = function (event) {
                console.log("touch socket open");
            };
    var TouchDevice = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'touchDevice',
        events: { 
                  "touchstart .circle__up" : "touchUp",
                  "touchend .circle__up" : "touchUp",
                  "touchmove .circle__up" : "touchUp",

                  "touchstart .circle__down" : "touchDown",
                  "touchend .circle__down" : "touchDown",
                  "touchmove .circle__down" : "touchDown",

                  "touchstart .circle__left" : "touchLeft",
                  "touchend .circle__left" : "touchLeft",
                  "touchmove .circle__left" : "touchLeft",

                  "touchstart .circle__right" : "touchRight",
                  "touchend .circle__right" : "touchRight",
                  "touchmove .circle__right" : "touchRight",

                  "touchstart .circle__fire" : "touchFire",
                  "touchend .circle__fire" : "touchFire",
                  "touchmove .circle__fire" : "touchFire",
                                 
        },
        initialize: function () {
            this.$el.removeClass('menu');
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
        touchUp: function (event) {
            console.log('up');
            var sendData = {
                action : '1'
            };
            var strSendData = JSON.stringify(sendData);
            ws.send(strSendData);
        },
        touchRight: function (event) {
            console.log('r');
            var sendData = {
                action : '2'
            };
            var strSendData = JSON.stringify(sendData);
            ws.send(strSendData);
        },
        touchDown: function (event) {
            console.log('d');
            var sendData = {
                action : '3'
            };
            var strSendData = JSON.stringify(sendData);
            ws.send(strSendData);
          
        },
        touchLeft: function (event) {
            console.log('l');
            var sendData = {
                action : '4'
            };
            var strSendData = JSON.stringify(sendData);
            ws.send(strSendData);
        },
        touchFire: function (event) {
            console.log('f');
            var sendData = {
                action : '5'
            };
            var strSendData = JSON.stringify(sendData);
            ws.send(strSendData);
        },

    });
    return new TouchDevice();
});