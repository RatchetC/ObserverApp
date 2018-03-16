(function () {

  'use strict';

  var app = angular.module('Activities');

  app.config( function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('activity-list', {
      cache: false,
      url: '/activity-list/:eventID',
      templateUrl: 'templates/activity.list.html',
      controller: 'ActivityListCtrl as vm',
      resolve: {
        thisEventsActivities: function (activitiesSrvc, $stateParams) {
          return activitiesSrvc.getActivitiesForThisEvent($stateParams.eventID);
        }
      }
    });

  });

})();