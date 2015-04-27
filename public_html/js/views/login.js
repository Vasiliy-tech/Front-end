define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){
    var Login = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'login menu',
        events: { 
                  "input input": "chekLogin",
                  "submit form": "submitForm"                  
        },
        initialize: function () {
            // this.listenTo(this.collection, "change", this.render);
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

            var mail = $(this.el).find("#email").val()
            var mail_pattern = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i; 
            var isItCorrectlyMail =mail_pattern.test(mail);

            var password = $(this.el).find("input:password").val();
            var password_pattern = /[\W]/;
            var isItCorrectlyPassword = password_pattern.test(password);

            var myLogin = $(this.el).find("#login").val()
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
            var m_method = $('#login_form').attr('method');
            var m_action = $('#login_form').attr('action');
            //var m_data=$('#test_form').serialize();
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
                        $('.autorizationLabel').show();
                        $('a.signin__href').addClass('disabled__href');
                        $('a.login__href').addClass('disabled__href');
                        $('a.start-game__href').removeClass('disabled__href');
                        //$('a.exit__href').removeClass('disabled__href');
                        window.location.href = '#'
                    } 
                    else 
                    {
                       alert("This user name or password already exists!")
                       $("#email").val('');
                       $("input:password").val('');
                       $("#login").val('');               
                    }
                },
                error:  function(xhr, str){
                     $('.content').html('Критическая ошибка'); 
                },
            });
        }

    });

    return new Login();
});