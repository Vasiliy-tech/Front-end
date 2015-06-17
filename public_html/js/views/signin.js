define([
    'backbone',
    'tmpl/signin'
], function(
    Backbone,
    tmpl
){

    var isItShow;
    var Signin = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'signin menu',
        events: { 
                  "input input": "chekLogin",
                  "submit form": "submitForm"                  
        },
        initialize: function () {
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

            var password = $(this.el).find(".password-signin").val();
            var password_pattern = /[\W]/;
            var isItCorrectlyPassword = password_pattern.test(password);

            var myLogin = $(this.el).find(".login-signin").val()
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
        submitForm: function(e) {
            e.preventDefault();
            $(this.el).find('input[type=submit]').prop('disabled', true);
            var m_method = $('.signin_form').attr('method');
            var m_action = $('.signin_form').attr('action');
            var sendData = {
                login: '',
                password: ''
            };
            sendData.login = $('.login-signin').val();
            sendData.password = $('.password-signin').val();
            var strSendData = JSON.stringify(sendData);

            $.ajax({
                type: m_method,
                url: m_action,
                contentType:'json', 
                data: strSendData,
                dataType:'json',
                success: function(result, code){
                    isItShow = true;
                    console.log(result);
                    if (result.status === 200)
                    {
                        $('.autorizationLabel').text("Hello " + result.data.login + "!");
                        $('a.signin__href').addClass('disabled');
                        $('a.login__href').addClass('disabled');
                        $('a.start-game__href').removeClass('disabled');
                        window.location.href = '#'
                    } 
                    else 
                    {
                       $('.informationMessage_signin').text(result.data.message+'!'+' Please try again!');
                       $('div.allSignin').hide();
                       $(".informationBg_signin").show();

                       $('body').click(function () {
                            if ( isItShow ) {
                                $(".informationBg_signin").hide();
                                $('div.allSignin').show();
                                isItShow = false; 
                            }
                        }); 

                       $(".password-signin").val('');
                       $(".login-signin").val('');
                             
                    }
                },
                error:  function(xhr, str){
                     $('.content').html('Критическая ошибка'); 
                },
            });
        },

    });

    return new Signin();
});
