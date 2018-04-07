(function () {

  'use strict';

  var app = angular.module('Observations');

  app.controller('ObservationEntryCtrl', control);

  control.$inject = ['$stateParams', '$ionicPopup', '$ionicHistory', 'activityevents'];

  function control($stateParams, $ionicPopup, $ionicHistory, activityevents) {

    var vm = angular.extend(this, {
      currActivity: angular.fromJson(window.localStorage.currActivity),
      observation: {
        activity: '',
        event: '',
        id: new Date().getTime().toString(),
        subject: $stateParams.subjectID,
        timestamp_s_unix_epoch_utc: Date.now(),
        value: undefined
      }
    });

    vm.saveObservation = function saveObservation() {
      
      vm.observation.event = angular.fromJson(window.localStorage.currEvent).id;
      vm.observation.activity = vm.currActivity.id;

      // check the input value is between the minimum and maximum legal values (specified when the activity was made in the event creator app)
      if (vm.observation.value < vm.currActivity.minLegalValue || vm.observation.value > vm.currActivity.maxLegalValue) {
        $ionicPopup.alert({
          title: 'Invalid Input',
          template: 'You must input a value between the minimum and maximum legal values'
        });
        return;
      }

      $ionicPopup.confirm({ // confirm, just in case it was a . . . misclick
        title: 'Confirm Saving Observation',
        template: 'Are you sure you want to save this observation?'
      }).then( function (response) {
        var YES = true;
        if (response === YES) {
          vm.loading = true; // show spinner
          var config = {};
          activityevents.postObservations(vm.observation, config).then(
            function success(response) {
              vm.loading = false; // hide spinner
              $ionicPopup.alert({ // success popup
                title: 'Success!',
                template: 'The observation was saved to the database successfully.'
              });
              $ionicHistory.goBack(); // return to the subject list
            },
            function failure(error) {
              console.error(error);
              $ionicPopup.alert({ // failure popup
                title: 'Failure!',
                template: 'Failed to save observation to the database. Please check your internet connection and try again.'
              });
            }
          );
        }
      });
      
    };

  }

})();