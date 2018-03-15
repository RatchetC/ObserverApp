(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.controller('SubjectSelectCtrl', control);

  control.$inject = ['$state', 'subjectsSrvc', 'allSubjects'];

  function control($state, subjectsSrvc, allSubjects) {

    var vm = angular.extend(this, {
      subjects: []
    });

    // function init() {
    //   subjectsSrvc.getAllSubjects().then(
    //     function success(response) {
    //       console.log(response);
    //       vm.subjects = response;
    //     },
    //     function failure(error) {
    //       // Show popup asking them to check their internet connection?
    //       console.error(error);
    //     }
    //   );
    // }

    // init();

    console.log(allSubjects);

  }

})();