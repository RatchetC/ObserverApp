(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.controller('SubjectSelectCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$ionicHistory', '$timeout', '$scope', 'subjectsSrvc', 'subjectsForThisEvent'];

  function control($state, $ionicPopup, $ionicHistory, $timeout, $scope, subjectsSrvc, subjectsForThisEvent) {

    var vm = angular.extend(this, {
      subjects: subjectsForThisEvent,
      subjectSelected: false,
      filterSubject: undefined,
      selectedSubjectID: undefined,
      loading: false
    });

    function init() {
      // check if the there is an event saved to the application memory
      vm.currEvent = angular.fromJson(window.localStorage.currEvent);
      if (vm.currEvent === undefined) { // if not, tell the user that they have to select one and send them to the event list
        $ionicPopup.alert({
          title: 'Select Event',
          template: 'There is no event selected. Please select your event.'
        });
        $state.go('event-list');
      }
    }

    init();

    // handle registrar clicking on a subject from the list
    vm.selectSubject = function selectSubject(subject) {
      vm.subjectSelected = true;
      vm.filterSubject = subject.nickname; // set the searchbox text to the nickname to filter out everyone but the selected subject
      vm.selectedSubjectID = subject.id;
    };

    // go to observation screen and pass subject id to it via state params
    vm.makeObservation = function makeObservation() {
      $state.go('observation-entry', { subjectID: vm.selectedSubjectID } );
    };

    // confirm the user wants to change the event and go to to the event list
    vm.changeEvent = function changeEvent() {
      $ionicPopup.confirm({ // check if they are sure they want to change the event, just in case it was a . . . misclick
        title: 'Change Event Confirmation',
        template: 'Are you sure that you want to change the selected event'
      }).then( function (response) {
        var YES = true;
        if (response === YES) {
          $ionicHistory.nextViewOptions({ // stop them from going back to the subject list BECAUSE THEY WERE SURE
            disableBack: true
          });
          $state.go('event-list');
        }
      });
    };

    // needed because otherwise the only way to refresh the page is to close the app completely and open it again
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