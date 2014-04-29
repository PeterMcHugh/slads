(function (angular, Parse) {
    'use strict';

    var module = angular.module('sladsApp');

    module.controller('MainCtrl', function ($scope) {
        var Player = Parse.Object.extend({className: 'Player', attrs: ['firstName', 'lastName']});
        var query = new Parse.Query(Player);
        query.find().then(function (results) {
            $scope.players = results;
          });

        var Match = Parse.Object.extend('Match');
        var matchQuery = new Parse.Query(Match);
        matchQuery.find().then(function (results) {
            $scope.matches = results;
          });
      });

  }(this.angular, this.Parse));
