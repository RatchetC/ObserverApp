(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.controller('SubjectSelectCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$ionicHistory', 'subjectsSrvc'];

  function control($state, $ionicPopup, $ionicHistory, subjectsSrvc) {

    
    var vm = angular.extend(this, {
      subjects: [],
      subjectSelected: false,
      filterSubject: undefined,
      selectedSubjectID: undefined
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

      var selectedEvent = angular.fromJson(window.localStorage.currEvent);
      // TODO: Get only the subjects that belong to the event. Must also sync the subjects as in a real event, they will be being added to the database continously.

      subjectsSrvc.getAllSubjects().then(
        function success(response) {
          vm.subjects = response;
        },
        function failure(error) {
          // Show popup asking them to check their internet connection?
          console.error(error);
        }
      );
    }

    init();

    vm.selectSubject = function selectSubject(subject) {
      vm.subjectSelected = true;
      vm.filterSubject = subject.nickname;
      vm.selectedSubjectID = subject.id;
    };

    vm.makeObservation = function makeObservation() {
      $state.go('observation-entry', { subjectID: vm.selectedSubjectID } );
    };

    vm.changeEvent = function changeEvent() {
      $ionicPopup.confirm({
        title: 'Change Event Confirmation',
        template: 'Are you sure that you want to change the selected event'
      }).then( function (response) {

        var YES = true;

        if (response === YES) {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('event-list');
        }

      });
    };

  }

})();