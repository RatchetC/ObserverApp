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

      $ionicPopup.confirm({

        title: 'Confirm Selection',
        template: 'Are you sure you want to change to this event?'

      }).then(function (response) {

        var YES = true;

        if (response === YES) {

          window.localStorage.currEvent = angular.toJson(event);
          window.localStorage.currActivity = null;
          
          $ionicPopup.alert({
            title: 'Select Activity',
            template: 'There is no activity selected. Please select the activity for this device.'
          });

          $ionicHistory.nextViewOptions({
            disableBack: true
          });

          $state.go('activity-list', {
            eventID: event.id
          });

        }

      });
    };

  }

})();
