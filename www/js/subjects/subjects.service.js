(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.factory('subjectsSrvc', subjectsSrvc);

  subjectsSrvc.$inject = ['$q', 'activityevents'];

  function subjectsSrvc($q, activityevents) {

    var service = {};

    service.subjects = [];

    service.getAllSubjects = function getAllSubjects() {

      var promiseObj = $q.defer();

      var config = {};

      activityevents.getSubjects(config).then(
        function success(response) {
          service.syncSubjects(response.data);
          promiseObj.resolve(service.subjects);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );

      return promiseObj.promise;

    };

    service.postSubject = function postSubject(subject) {

      var promiseObj = $q.defer();

      var config = {};

      console.log(subject);

      activityevents.postSubjects(subject, config).then(
        function success(response) {
          console.log(response);
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );

      return promiseObj.promise;

    };

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

    service.addSubject = function addSubject(subject) {
      service.subjects.push(subject);
    };

    service.syncSubjects = function syncSubjects(data) {

      for (var testItemIndex in data) {
        var testitem = data[testItemIndex];
        var matchResult = service.subjects.reduce(function (matches, item) { return ((item.id === testitem.id) ? matches + 1 : matches); }, 0);
        if (matchResult === 0) {
          service.subjects.push(testitem);
        }
      }

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