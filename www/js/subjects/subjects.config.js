(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('subject-selection', {
      cache: false,
      url: '/subject-selection',
      templateUrl: 'templates/subject.selection.html',
      controller: 'SubjectSelectCtrl as vm'
    });

    $urlRouterProvider.otherwise('subject-selection');

  });

})();