(function () {

  'use strict';

  var app = angular.module('Activities');

  app.factory('activitiesSrvc', activitiesSrvc);

  activitiesSrvc.$inject = ['$q', 'activityevents'];

  function activitiesSrvc($q, activityevents) {
    
    var service = {};

    service.getActivity = function getActivity(activityID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getActivitiesActivityid(activityID, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.getActivitiesForThisEvent = function getActivitiesForThisEvent(eventID) {
      var resolvePromise = $q.defer();
      var config = { params: { event: eventID } };
      activityevents.getEventActivityMappings(config).then(
        function success(response) {
          var promises = [];
          var mappingsArray = response.data;
          for (var i = 0; i < mappingsArray.length; i++) {
            promises.push(service.getActivity(mappingsArray[i].activity));
          }
          resolvePromise.resolve($q.all(promises));
        },
        function failure(error) {
          resolvePromise.reject(error);
        }
      );
      return resolvePromise.promise;
    };

    return service;

  }

})();