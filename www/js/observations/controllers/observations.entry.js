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

      $ionicPopup.confirm({
        title: 'Confirm Saving Observation',
        template: 'Are you sure you want to save this observation?'
      }).then( function (response) {

        var YES = true;

        if (response === YES) {
          
          vm.loading = true;
          var config = {};

          activityevents.postObservations(vm.observation, config).then(

            function success(response) {

              vm.loading = false;
              
              $ionicPopup.alert({
                title: 'Success!',
                template: 'The reading has been submitted.'
              });

              $ionicHistory.goBack();
            },

            function failure(error) {
              console.error(error);
            }

          );

        }
      });

    };

  }

})();