(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.controller('SubjectSelectCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$ionicHistory', '$timeout', '$scope', 'subjectsSrvc', 'subjectsForThisEvent'];

  function control($state, $ionicPopup, $ionicHistory, $timeout, $scope, subjectsSrvc, subjectsForThisEvent) {

    console.log(subjectsForThisEvent);

    var vm = angular.extend(this, {
      subjects: subjectsForThisEvent,
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

    vm.refresh = function refresh() {

      subjectsSrvc.getSubjectsForThisEvent(vm.currEvent.id).then(
        function success(response) {
          vm.subjects = response;
          $scope.$broadcast('scroll.refreshComplete');
        },
        function failure(error) {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Failed to refresh. Please checck your internet connection and try again.'
          });
        }
      );

    };

  }

})();