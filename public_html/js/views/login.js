define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){
    var isItShow;
    var Login = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'login menu',
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
            if(localStorage["signup"] === undefined)
                localStorage["signup"]=JSON.stringify(sendData);

        },
        render: function () {
            this.$el.html(this.template(this.attributes));
            return this;
        },
        show: function () {
            this.trigger('show',this);
            console.log(localStorage);
            var currentData = this.getJSON("signup");
            console.log(currentData);    
            $(".input.login").val(currentData.login);
            $(".email").val(currentData.email);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },
        chekLogin: function () {

            var mail = $(this.el).find(".email").val()
            var mail_pattern = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i; 
            var isItCorrectlyMail =mail_pattern.test(mail);

            var password = $(this.el).find(".password").val();
            var password_pattern = /[\W]/;
            var isItCorrectlyPassword = password_pattern.test(password);

            var myLogin = $(this.el).find(".input.login").val()
            //alert(myLogin);
            var myLogin_pattern = /[\W]/; 
            var isItCorrectlyLogin = myLogin_pattern.test(myLogin);


            if (!isItCorrectlyPassword && isItCorrectlyMail && !isItCorrectlyLogin 
                && myLogin != "" && password != "" && mail != "") {
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

            if (isItCorrectlyMail | mail === "") {
                $(this.el).find(".label__email").css({'color' : "#FFF"});
            }
            else {
                $(this.el).find(".label__email").css({'color' : "#FF0000"});
            }
        },
        submitForm: function(e){
            e.preventDefault();
            $(this.el).find('input[type=submit]').prop('disabled', true);
            var m_method = $('.login_form').attr('method');
            var m_action = $('.login_form').attr('action');
        
            var sendData = {
                login: '',
                email: '',
                password: ''
            };
            sendData.login = $(".input.login").val();

            sendData.email = $(".email").val();
            sendData.password = $(".password").val();
    
            var strSendData = JSON.stringify(sendData);
            console.log("TADA");
            console.log(strSendData);
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
                        $('.autorizationLabel').text("Hello " + result.data.login + "!");
                        $('.autorizationLabel').show();
                        $('a.signin__href').addClass('disabled');
                        $('a.login__href').addClass('disabled');
                        $('a.start-game__href').removeClass('disabled');
                        window.location.href = '#'
                        localStorage.clear();
                    } 
                    else 
                    {
                       isItShow = true;
                       $('.informationMessage_login').text(result.data.message+'!'+' Please try again!');
                       $('div.allLogin').hide();
                       $(".informationBg_login").show();

                       $('body').click( function () {
                            if (isItShow) {
                                $(".informationBg_login").hide();
                                $('div.allLogin').show();
                                isItShow = false;
                            }
                       });

                       $(".email").val('');
                       $("input:password").val('');
                       $(".login").val('');              
                    }
                },
                error:  function(xhr, str){
                     $('.content').html('Критическая ошибка'); 
                },
            });
        },
        setJSON: function(key, value){
            localStorage[key]=JSON.stringify(value);
            console.log(localStorage);
        },
        getJSON: function(key){
            var value = localStorage[key];
            return value ? JSON.parse(value) : null;
        },
        saveData: function(e){
            var sendData = {
                login:'',
                email:''
            }
            sendData.login=$(".input.login").val();
            sendData.email=$(".email").val();
            this.setJSON("signup",sendData);
        }

    });

    return new Login();
});
