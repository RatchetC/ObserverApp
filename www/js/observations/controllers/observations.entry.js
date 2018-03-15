(function () {

  'use strict';

  var app = angular.module('Observations');

  app.controller('ObservationEntryCtrl', control);

  control.$inject = [];

  function control() {

    var vm = angular.extend(this, {
      currActivity: 'Placeholder (WIP)'
    });

  }

})();