require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        phaser: "lib/phaser"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'phaser': {
            exports: 'Phaser'
        }
    }
});

define([
    'backbone',
    'router'
], function(
    Backbone,
    router
){
    Backbone.history.start();
});