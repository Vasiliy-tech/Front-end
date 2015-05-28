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
            var m_method = $('#login_form').attr('method');
            var m_action = $('#login_form').attr('action');
            var sendData = {
                login: '',
                email: '',
                password: ''
            };
            sendData.login = $('#login').val();
            sendData.email = $('#email').val();
            sendData.password = $('#password').val();
            var strSendData = JSON.stringify(sendData);

            $.ajax({
                type: m_method,
                url: m_action,
                contentType:'json', 
                data: strSendData,
                //contentType: 'application/json; charset=utf-8',
                //converters:{"text json":jQuery.parseJSON},
                dataType:'json',
                //processData: false,
                success: function(result, code){
                    console.log(result);
                    if (result.status === 200)
                    {
                        $('.autorizationLabel').text("Hello " + result.data.login + "!");
                        $('.autorizationLabel').show();
                        $('a.signin__href').addClass('disabled');
                        $('a.login__href').addClass('disabled');
                        $('a.start-game__href').removeClass('disabled');
                        ////// TO DO: в случае успеха
                        window.location.href = '#touchDevice';
                        
                    } 
                    else 
                    {

                       alert(result.data.message);
                       ////// TO DO: удали!!!!!!!
                       window.location.href = '#touchDevice';
                       $("#email").val('');
                       $("input:password").val('');
                       $("#login").val('');
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