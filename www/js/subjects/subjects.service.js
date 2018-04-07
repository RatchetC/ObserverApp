(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.factory('subjectsSrvc', subjectsSrvc);

  subjectsSrvc.$inject = ['$q', 'activityevents'];

  function subjectsSrvc($q, activityevents) {

    var service = {};

    service.getSubject = function getSubject(subjectID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getSubjectsSubjectid(subjectID, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.getSubjectsForThisEvent = function getSubjectsForThisEvent(eventID) {
      var promiseObj = $q.defer();
      var config = { params: { event: eventID } };
      activityevents.getEventSubjectMappings(config).then(
        function success(response) {
          var subjectPromises = [];
          var mappingsArray = response.data;
          for (var i = 0; i < mappingsArray.length; i++) {
            subjectPromises.push(service.getSubject(mappingsArray[i].subject));
          }
          promiseObj.resolve($q.all(subjectPromises));
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    return service;

  }

})();