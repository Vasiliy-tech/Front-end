define([
    'backbone',
    'tmpl/touchDevice'
], function(
    Backbone,
    tmpl
){
    // my phone IP change it
    var socketAdress = "ws://g09.javaprojects.tp-dev.ru/gameplay";
    //var socketAdress = "ws://192.168.43.123:8080/gameplay";
    //var socketAdress = "ws://127.0.0.1:8080/gameplay";
    var isItNotOpen = true;
    var socketIsOpen = false;
    var ws;
    var TouchDevice = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'touchDevice',
        events: { 
        
                  "touchstart .circle__up" : "touchUpStart",
                  "touchend .circle__up" : "touchUpEnd",
                  //"touchmove .circle__up" : "touchUpStart",
                  //"touchcancel .circle__up" : "touchUpStart",

                  "touchstart .circle__down" : "touchDownStart",
                  "touchend .circle__down" : "touchDownEnd",
                  //"touchmove .circle__down" : "touchDownStart",

                  "touchstart .circle__left" : "touchLeftStart",
                  "touchend .circle__left" : "touchLeftEnd",
                  //"touchmove .circle__left" : "touchLeftStart",

                  "touchstart .circle__right" : "touchRightStart",
                  "touchend .circle__right" : "touchRightEnd",
                  //"touchmove .circle__right" : "touchRightStart",

                  "touchstart .circle__fire" : "touchFireStart",
                  "touchend .circle__fire" : "touchFireEnd",
                  //"touchmove .circle__fire" : "touchFireStart",
                                 
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

            if (isItNotOpen === true) {
                isItNotOpen = false;

                function sleep(ms) {
                    ms += new Date().getTime();
                    while (new Date() < ms) {}
                }
                
                ws = new WebSocket(socketAdress);
                console.log("touch socket create");
                var slp = sleep(300);
                ws.onopen = function (event) {
                console.log("touch socket open");
                socketIsOpen = true;
               }
            }

        },
        hide: function () {
            this.$el.hide();
        },
        touchUpStart: function (event) {
            
            this.$el.find('div.circle__up').css({'background': '#1BF840'});
            console.log('up');
            //console.log(event.originalEvent);

            var sendData = {
                action : 0,
                touchEvent: "touchStart"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                console.log('send on socket start');
                ws.send(strSendData);
            }
        },
        touchUpEnd: function(event) {
            this.$el.find('div.circle__up').css({'background': 'green'});
            var sendData = {
                action : 0,
                touchEvent: "touchEnd"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                console.log('send on socket end');
                ws.send(strSendData);
            }
        },
        touchRightStart: function (event) {
            this.$el.find('div.circle__right').css({'background': '#1BF840'});
            console.log('r');

            var sendData = {
                action : 1,
                touchEvent: "touchStart"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        },
        touchRightEnd: function(event) {
            this.$el.find('div.circle__right').css({'background': 'green'});
            var sendData = {
                action : 1,
                touchEvent: "touchEnd"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        },
        touchDownStart: function (event) {
            this.$el.find('div.circle__down').css({'background': '#1BF840'});
            console.log('d');

            var sendData = {
                action : 2,
                touchEvent: "touchStart"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
          
        },
        touchDownEnd: function(event) {
            this.$el.find('div.circle__down').css({'background': 'green'});
            var sendData = {
                action : 2,
                touchEvent: "touchEnd"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        },
        touchLeftStart: function (event) {
            this.$el.find('div.circle__left').css({'background': '#1BF840'});
            console.log('l');

            var sendData = {
                action : 3,
                touchEvent: "touchStart"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        },
        touchLeftEnd: function(event) {
            this.$el.find('div.circle__left').css({'background': 'green'});
            var sendData = {
                action : 3,
                touchEvent: "touchEnd"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        },
        touchFireStart: function (event) {
            this.$el.find('div.circle__fire').css({'background': '#520A05'});
            console.log('f');

            var sendData = {
                action : 5,
                touchEvent: "touchStart"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        },
        touchFireEnd: function(event) {
            this.$el.find('div.circle__fire').css({'background': 'red'});
            var sendData = {
                action : 5,
                touchEvent: "touchEnd"
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        }

    });
    return new TouchDevice();
});