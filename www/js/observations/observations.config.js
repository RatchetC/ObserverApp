(function () {

  'use strict';

  var app = angular.module('Observations');

  app.config( function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('observation-entry', {
      cache: false,
      url: '/observation-entry/:subjectID',
      templateUrl: 'templates/observation.entry.html',
      controller: 'ObservationEntryCtrl as vm'
    });

    $urlRouterProvider.otherwise('subject-selection');

  });

})();