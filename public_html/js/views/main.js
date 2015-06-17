define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){
    var isItShow;
    var Main = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'main menu',
        events: { 
                  "click .js-exit": "exitLogin",                
        },
        initialize: function () {

            
            if ( isTouchDevice() && isItSmallWindow() ) {
                ////// TO DO: удали
                //window.location.href = '#touchDevice';
                window.location.href = '#gamepad';   
            } else {

            }  

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        show: function () {
            $.ajax({
                type: 'GET',
                url: '/api/v1/auth/check',
                success: function(result, code){
                    console.log(result);
                    if (result.status === 200)
                    {
                        $('.autorizationLabel').text("Hello " + result.data.login + "!");
                        $('.autorizationLabel').show();
                        $('a.signin__href').addClass('disabled');
                        $('a.login__href').addClass('disabled');
                        $('a.start-game__href').removeClass('disabled');
                        localStorage.clear();
                    
                    } 
                    else 
                    {
          
                    }
                },
                error:  function(xhr, str){
                     $('.content').html('Критическая ошибка'); 
                },
            });
            this.trigger('show',this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },
        exitLogin: function () {
            $.ajax({
                type: 'POST',
                url: '/api/v1/auth/signout',
                contentType:'json', 
                data: '{}',
                dataType:'json',
                success: function(result, code){
                    console.log(result);
                    if (result.status === 200)
                    {
                        $('.autorizationLabel').hide();
                        $('a.signin__href').removeClass('disabled');
                        $('a.login__href').removeClass('disabled');
                        $('a.start-game__href').addClass('disabled');
                    
                    } 
                    else 
                    {
                        isItShow = true;
                        $('.informationMessage_main').text(result.data.message+'!');
                        $('div.allMain').hide();
                        $(".informationBg_main").show();

                        $('body').click( function () {
                            if (isItShow) {
                                $(".informationBg_main").hide();
                                $('div.allMain').show();
                                isItShow = false;
                            }
                        });
          
                    }
                },
                error:  function(xhr, str){
                     $('.content').html('Критическая ошибка'); 
                },
            });
        },

    });

    function isItSmallWindow() {
        var screenWidth = screen.width;
        if (screenWidth < 1000) {
            return true;
        } else {
            return false;
        }
    }

    function isTouchDevice() {
          try {
            document.createEvent('TouchEvent');
            return true;
          }
          catch(e) {
            return false;
          }
    }
    
    return new Main();
});