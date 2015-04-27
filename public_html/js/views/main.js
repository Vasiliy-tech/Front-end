define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var Main = Backbone.View.extend({
        template: tmpl,
        tagName: 'div',
        className: 'menu',
        events: { 
                  "click .js-exit": "exitLogin",                 
        },
        initialize: function () {
            $('.autorizationLabel').hide();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        show: function () {
            this.trigger('show',this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },
        exitLogin: function () {
            //alert('1');
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
                    } 
                    else 
                    {
                       alert("You are not autorization, maybe!")              
                    }
                },
                error:  function(xhr, str){
                     $('.content').html('Критическая ошибка'); 
                },
            });
        }

    });
    
    return new Main();
});