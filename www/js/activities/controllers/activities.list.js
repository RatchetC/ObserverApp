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
      $ionicPopup.confirm({ // confirm, just in case it was a . . . misclick?
        title: 'Confirm Selection',
        template: 'Are you sure you want to change to this activity?'
      }).then( function (response) {
        var YES = true;
        if (response === YES) {
          window.localStorage.currActivity = angular.toJson(activity); // save the activity to the device
          $ionicHistory.nextViewOptions({ // make sure they can't go back to this screen from the registration screen
            disableBack: true
          });
          $state.go('subject-selection'); // go to registration screen
        }
      });

    };

  }

})();