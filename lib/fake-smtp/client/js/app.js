(function(angular) {

  'use strict';

  var FakeSMTP = angular.module('FakeSMTP', ['ngRoute']);

  FakeSMTP.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/emails-table.html'
        })
        .when('/email/:uuid', {
          templateUrl: 'views/email-details.html'
        })
        .otherwise('/')
      ;
    }
  ]);

  FakeSMTP.controller('EmailTableCtrl', [
    '$scope', '$http', '$location',
    function($scope, $http, $location) {

      $scope.emails = [];

      $http.get('api/emails')
        .then(function(res) {
          $scope.emails = res.data;
        })
      ;

      $scope.predicate = '';
      $scope.reverse = false;
      $scope.order = function(prop) {
        $scope.predicate = prop;
        $scope.reverse = !$scope.reverse;
      };

    }
  ]);

  FakeSMTP.controller('EmailDetailsCtrl', [
    '$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {

      $http.get('api/emails/'+$routeParams.uuid)
        .then(function(res) {
          $scope.email = res.data;
        })
      ;

    }
  ]);

  FakeSMTP.filter('pluck', function() {

    function pluck(objects, property) {
      if (!(objects && property && angular.isArray(objects))) return [];

      property = String(property);

      return objects.map(function(object) {
        // just in case
        object = Object(object);

        if (object.hasOwnProperty(property)) {
          return object[property];
        }

        return '';
      });
    }

    return function(objects, property) {
      return pluck(objects, property);
    };

  });


}(angular));