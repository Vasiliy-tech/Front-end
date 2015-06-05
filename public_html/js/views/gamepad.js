define([
    'backbone',
    'tmpl/gamepad'
], function(
    Backbone,
    tmpl
){
    var Gamepad = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'gamepad menu',
        events: { 
                  "input input": "chekLogin",
                  "submit form": "submitForm",
                  "change input": "saveData"                  
        },
        initialize: function () {
            var sendData ={
                login: '',
                email: '',
            }
            sendData.login="";
            sendData.email="";


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
        chekLogin: function () {

            var password = $(this.el).find(".input__passwordGamepad").val();
            var password_pattern = /[\W]/;
            var isItCorrectlyPassword = password_pattern.test(password);

            var myLogin = $(this.el).find(".input__loginGamepad").val()
            var myLogin_pattern = /[\W]/; 
            var isItCorrectlyLogin = myLogin_pattern.test(myLogin);


            if (!isItCorrectlyPassword && !isItCorrectlyLogin 
                && myLogin != "" && password != "") {
                $(this.el).find('input[type=submit]').prop('disabled', false); 
            } 
            else {
                $(this.el).find('input[type=submit]').prop('disabled', true);
            } 
            
            if (!isItCorrectlyPassword | password === "") {
                $(this.el).find(".label__password").css({'color' : "#FFF"});
            }
            else {
                $(this.el).find(".label__password").css({'color' : "#FF0000"});
            }

            if (!isItCorrectlyLogin | myLogin === "") {
                $(this.el).find(".label__login").css({'color' : "#FFF"});
            }
            else {
                $(this.el).find(".label__login").css({'color' : "#FF0000"});
            }
        },
        submitForm: function(e){
            e.preventDefault();
            $(this.el).find('input[type=submit]').prop('disabled', true);
            var m_method = $('.gamepad__form').attr('method');
            var m_action = $('.gamepad__form').attr('action');
            var sendData = {
                login: '',
                password: ''
            };
            sendData.login = $('.input__loginGamepad').val();
            sendData.password = $('.input__passwordGamepad').val();
            var strSendData = JSON.stringify(sendData);
            console.log(strSendData)

            $.ajax({
                type: m_method,
                url: m_action,
                contentType:'json', 
                data: strSendData,
                dataType:'json',
                success: function(result, code){
                    console.log(result);
                    if (result.status === 200)
                    {
                        console.log(strSendData)
                        $('.autorizationLabel').text("Hello " + result.data.login + "!");
                        $('.autorizationLabel').show();
                        $('a.signin__href').addClass('disabled');
                        $('a.login__href').addClass('disabled');
                        $('a.start-game__href').removeClass('disabled');
                        ////// TO DO: в случае успеха
                        //window.location.href = '#touchDevice';
                        window.location.href = '#gamepadStart';
                        
                    } 
                    else 
                    {
                       isItShow = true;
                       $('.informationMessage_gamepad').text(result.data.message+'!'+' Please try again!');
                       $('div.allGamepad').hide();
                       $(".informationBg_gamepad").show();

                       $('body').click( function () {
                            if (isItShow) {
                                $(".informationBg_gamepad").hide();
                                $('div.allGamepad').show();
                                isItShow = false;
                            }
                       });
                       //alert(result.data.message);
                       ////// TO DO: удали!!!!!!!
                       //window.location.href = '#touchDevice';
                       $(".input__passwordGamepad").val('');
                       $(".input__loginGamepad").val('');
                    }

                },
                error:  function(xhr, str){
                     $('.content').html('Критическая ошибка'); 
                },
            });

        },

    });

    return new Gamepad();
});