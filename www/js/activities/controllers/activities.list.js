(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityListCtrl', control);

  control.$inject = ['$state', '$ionicHistory', '$ionicPopup', 'thisEventsActivities'];

  function control($state, $ionicHistory, $ionicPopup, thisEventsActivities) {

    var vm = angular.extend(this, {
      activities: thisEventsActivities
    });

    vm.selectActivity = function selectActivity(activity) {
      $ionicPopup.confirm({
        title: 'Confirm Selection',
        template: 'Are you sure you want to change to this activity?'
      }).then( function (response) {

        var YES = true;

        if (response === YES) {
          window.localStorage.currActivity = angular.toJson(activity);
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('subject-selection');
        }

      });

    };

  }

})();