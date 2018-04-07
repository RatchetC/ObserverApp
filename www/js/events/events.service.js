(function () {

  'use strict';

  var app = angular.module('Events');

  app.factory('eventsSrvc', eventsSrvc);

  eventsSrvc.$inject = ['$q', 'activityevents'];

  function eventsSrvc($q, activityevents) {

    var service = {};

    service.events = [];

    service.getAllEvents = function getAllEvents() {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getEvents(config).then(
        function success(response) {
          service.syncEvents(response.data);
          promiseObj.resolve(service.events);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.syncEvents = function syncEvents(data) {
      for (var testItemIndex in data) {
        var testitem = data[testItemIndex];
        var matchResult = service.events.reduce(function (matches, item) { return ((item.id === testitem.id) ? matches + 1 : matches); }, 0);
        if (matchResult === 0) {
          service.events.push(testitem);
        } else { }
      }
    };

    return service;

  }

})();