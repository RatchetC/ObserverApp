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
        allSubjects: function (subjectsSrvc) {
          return subjectsSrvc.getAllSubjects();
        }
      }
    });

    // $stateProvider.state('infinite-digest-fix', {
    //   cache: false,
    //   url: '/infinite-digest-fix',
    //   templateUrl: 'templates/subject.selection.html',
    //   controller: 'Blah as vm'
    // });

    $urlRouterProvider.otherwise('subject-selection');

  });

})();