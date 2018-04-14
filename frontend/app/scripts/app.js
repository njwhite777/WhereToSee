'use strict';

/**
 * @ngdoc overview
 * @name wheretoseeApp
 * @description
 * # wheretoseeApp
 *
 * Main module of the application.
 */
angular
.module('wheretoseeApp', [
    'btford.socket-io',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngMaterial',
    'ui.router'
  ])
.constant('debug', true )
.constant('socketIOConfig',
    {
      'host' : 'localhost',
      // 'host' : '192.168.1.5',
      'port' : 5001,
      'proto' : 'http://',
      'namespace' : 'io',
      'artifactSocketName' : 'artifact',
      'searchSocketName' : 'search',
      'getSocketNameHelper' :
        function(){
          return this.proto + this.host + ":"+ this.port+"/"+this.namespace;
        },
      'getSocketURL' :
        function(whichSocket){
          if(whichSocket == undefined){
            return this.getSocketNameHelper();
          }
          if(whichSocket == 'search'){
            return this.getSocketNameHelper() + '/' + this.searchSocketName;
          }
          if(whichSocket == 'artifact'){
            return this.getSocketNameHelper() + '/' + this.artifactSocketName;
          }
        }
    })
.config(function($urlRouterProvider,$mdThemingProvider){

    $urlRouterProvider.when("", "/");

    $mdThemingProvider.alwaysWatchTheme(true);
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
         'default': '400', // by default use shade 400 from the pink palette for primary intentions
         'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
         'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
         'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
       })
       // If you specify less than all of the keys, it will inherit from the
       // default shades
       .accentPalette('blue', {
         'default': '100' // use shade 200 for default, and keep all other shades the same
       })
       .warnPalette('red',{
         'default': '400',
         'hue-1' : 'A400'
       })
  });
