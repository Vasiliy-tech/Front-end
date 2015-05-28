define([
    'backbone',
    'tmpl/touchDevice'
], function(
    Backbone,
    tmpl
){
    var TouchDevice = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'touchDevice',
        events: { 
                  "touchstart .circle__up" : "touchUp",
                  "touchstart .circle__down" : "touchDown",
                  "touchstart .circle__left" : "touchLeft",
                  "touchstart .circle__right" : "touchRight",
                  "touchstart .circle__fire" : "touchFire",
                  "input input": "chekLogin",
                  "submit form": "submitForm"                  
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
            console.log(event);
        },
        touchRight: function (event) {
            //console.log('up');
            alert("R!");
        },
        touchDown: function (event) {
            //console.log('up');
            alert("D!");
        },
        touchLeft: function (event) {
            //console.log('up');
            alert("L!");
        },
        touchFire: function (event) {
            //console.log('up');
            alert("Fi!");
        },
        submitForm: function(e){
            e.preventDefault();
            $(this.el).find('input[type=submit]').prop('disabled', true);
            var m_method = $('#signin_form').attr('method');
            var m_action = $('#signin_form').attr('action');
            var sendData = {
                login: '',
                password: ''
            };
            sendData.login = $('#login-signin').val();
            sendData.password = $('#password-signin').val();
            var strSendData = JSON.stringify(sendData);

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
                        $('a.signin__href').addClass('disabled');
                        $('a.login__href').addClass('disabled');
                        $('a.start-game__href').removeClass('disabled');
                        window.location.href = '#'
                    } 
                    else 
                    {
                       alert(result.data.message);
                       $("#password-signin").val('');
                       $("#login-signin").val('');               
                    }
                },
                error:  function(xhr, str){
                     $('.content').html('Критическая ошибка'); 
                },
            });
        }

    });
    return new TouchDevice();
});