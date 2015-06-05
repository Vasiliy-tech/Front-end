define([
    'backbone',
    'tmpl/touchDevice'
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
        className: 'touchDevice',
        events: { 
                  "touchstart .touchDevice__button": "showGamepad",
                  "click .touchDevice__button": "showGamepad",

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
            //console.log(event.originalEvent);

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

            var sendData = {
                action : '0'
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                console.log('send on socket');
                ws.send(strSendData);
            }
        },
        touchRight: function (event) {
            console.log('r');

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

            var sendData = {
                action : '1'
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        },
        touchDown: function (event) {
            console.log('d');

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

            var sendData = {
                action : '2'
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
          
        },
        touchLeft: function (event) {
            console.log('l');

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

            var sendData = {
                action : '3'
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        },
        touchFire: function (event) {
            console.log('f');

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

            var sendData = {
                action : '5'
            };
            var strSendData = JSON.stringify(sendData);
            if (socketIsOpen === true) {
                ws.send(strSendData);
            }
        },

        showGamepad: function(event) {
        },

    });
    return new TouchDevice();
});