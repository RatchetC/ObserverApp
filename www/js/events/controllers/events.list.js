(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventListCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$ionicHistory', 'allEvents'];

  function control($state, $ionicPopup, $ionicHistory, allEvents) {

    var vm = angular.extend(this, {
      events: allEvents
    });

    vm.selectEvent = function selectEvent(event) {
      $ionicPopup.confirm({ // check, in case it was a . . . misclick?
        title: 'Confirm Selection',
        template: 'Are you sure you want to change to this event?'
      }).then(function (response) {
        var YES = true;
        if (response === YES) {
          window.localStorage.currEvent = angular.toJson(event); // save the selected event to the device
          window.localStorage.currActivity = null; // set the activity to null
          $ionicPopup.alert({ // tell the user that they must select an activity
            title: 'Select Activity',
            template: 'There is no activity selected. Please select the activity for this device.'
          });
          $ionicHistory.nextViewOptions({ // make sure can't go back to this screen after selecting the event
            disableBack: true
          });
          $state.go('activity-list', { eventID: event.id } ); // go to activity list
        }
      });
    };

  }

})();
