(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.controller('SubjectSelectCtrl', control);

  control.$inject = ['$state', '$ionicPopup', 'subjectsSrvc'];

  function control($state, $ionicPopup, subjectsSrvc) {

    var vm = angular.extend(this, {
      subjects: []
    });

    function init() {

      vm.currEvent = angular.fromJson(window.localStorage['currEvent']);
      if (vm.currEvent === undefined) {
        $ionicPopup.alert({
          title: 'Select Event',
          template: 'There is no event selected. Please select your event.'
        });
        $state.go('event-list');
      }

      subjectsSrvc.getAllSubjects().then(
        function success(response) {
          console.log(response);
          vm.subjects = response;
        },
        function failure(error) {
          // Show popup asking them to check their internet connection?
          console.error(error);
        }
      );
    }

    init();

    vm.makeObservation = function makeObservation() {

      $state.go('observation-entry');

    };

  }

})();