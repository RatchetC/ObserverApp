(function () {

  'use strict';

  var app = angular.module('ObserverApp', [
    'ionic',
    'restlet.sdk',
    'Subjects',
    'Observations',
    'Events',
    'Activities'
  ]);

  app.run(function ($ionicPlatform, activityevents) {
    
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
    
    activityevents.configureHTTP_BASICAuthentication('a4ccb4f9-f183-4505-b178-cca604d6c678', '4e39077a-383c-407c-a538-dd2c7cda3dfc');
    
  });

}());
