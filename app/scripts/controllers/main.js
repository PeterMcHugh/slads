(function (angular, Parse) {
    'use strict';

    var module = angular.module('sladsApp');

    module.controller('MainCtrl', function ($scope, $location) {

        $scope.currentUser = Parse.User.current();

        if (Parse.User.current() === null) {
          $location.path('/login');
        } else {
          var Player = Parse.Object.extend({className: 'Player', attrs: ['firstName', 'lastName']});
          var query = new Parse.Query(Player);
          query.find().then(function (results) {
            $scope.players = results;
          });

          var Match = Parse.Object.extend({className: 'Match', attrs: ['winner', 'loser']});
          var matchQuery = new Parse.Query(Match);
          matchQuery.include('winner', 'loser');
          matchQuery.find().then(function (results) {
            $scope.matches = results;
          });
        }

        $scope.logout = function () {
          Parse.User.logOut();
          $location.path('/login');
        };
      });

  }(this.angular, this.Parse));
