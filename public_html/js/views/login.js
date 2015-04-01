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
        submitForm: function(){
            //render new template
        }

    });

    return new Login();
});