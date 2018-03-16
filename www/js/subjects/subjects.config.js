(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('subject-selection', {
      cache: false,
      url: '/subject-selection',
      templateUrl: 'templates/subject.selection.html',
      controller: 'SubjectSelectCtrl as vm',
      resolve: {
        subjectsForThisEvent: function (subjectsSrvc) {
          if (window.localStorage.currEvent === undefined) {
            return [];
          } else {
            return subjectsSrvc.getSubjectsForThisEvent(angular.fromJson(window.localStorage.currEvent).id);
          }
        }
      }
    });

    $urlRouterProvider.otherwise('subject-selection');

  });

})();