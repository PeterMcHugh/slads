(function (angular) {
  'use strict';

  var module = angular.module('sladsApp');

  module.controller('LadderCtrl', function ($scope, $modal, model) {

    var queryForPlayers = function () {
      $scope.players = model.Player.query();
    };

    queryForPlayers();

    var queryForMatches = function () {
      $scope.matches = model.Match.query();
    };

    queryForMatches();

    var playerName = function (player) {
      return player.firstName + ' ' + player.lastName;
    };

    $scope.matchData = function (match) {
      return playerName(match.winner) + ' ' + match.winnerGoals + '-' + match.loserGoals + ' ' + playerName(match.loser);
    };

    $scope.ladder = [];

    var updateLadder = function () {
      var ladder = $scope.players.map(function(player){
        var elem = {name: playerName(player)};

        elem.wins = $scope.matches.reduce(function(wins, match) {
          if(match.winner.objectId === player.objectId){
            return wins + 1;
          }
          return wins;
        }, 0);

        elem.for = $scope.matches.reduce(function(wins, match) {
          if(match.winner.objectId === player.objectId){
            return wins + match.winnerGoals;
          }
          if(match.loser.objectId === player.objectId){
            return wins + match.loserGoals;
          }
          return wins;
        }, 0);

        elem.losses = $scope.matches.reduce(function(losses, match) {
          if(match.loser.objectId === player.objectId){
            return losses + 1;
          }
          return losses;
        }, 0);

        elem.against = $scope.matches.reduce(function(losses, match) {
          if(match.loser.objectId === player.objectId){
            return losses + match.winnerGoals;
          }
          if(match.winner.objectId === player.objectId){
            return losses + match.loserGoals;
          }
          return losses;
        }, 0);

        elem.gd = elem.for - elem.against;
        elem.played = elem.wins + elem.losses;
        elem.wp = Math.round((elem.wins / elem.played) * 10000)/100;
        return elem;
      });
      ladder.sort(function(a, b) { return b.wp - a.wp;});
      $scope.ladder = ladder;
    };

    $scope.$watchCollection('matches', updateLadder);
    $scope.$watchCollection('players', updateLadder);

    $scope.playerName = playerName;

    var error = function (scope) {
      return function (response) {
        scope.error = response.data.error;
      };
    };

    $scope.openMatchModal = function (match) {

      var modalScope = $scope.$new();
      modalScope.title = 'Match';

      var values = $scope.players.map(function(player){
        return {name: player.firstName + ' ' + player.lastName, id: player.objectId};
      });

      var winnerId = match ? match.winner.objectId : undefined;
      var loserId = match ? match.loser.objectId : undefined;

      var winnerGoals = match ? match.winnerGoals : 0;
      var loserGoals = match ? match.loserGoals : 0;

      var fields = [
        {label: 'Winner', type: 'select', values: values, value: winnerId},
        {label: 'Points', type: 'number', value: winnerGoals},
        {label: 'Loser', type: 'select', values: values, value: loserId},
        {label: 'Points', type: 'number', value: loserGoals}
      ];

      modalScope.fields = fields;

      var d = $modal({
        template: 'views/modal.html',
        scope: modalScope
      });

      modalScope.save = function (fields) {
        var m = match || new model.Match();

        m.winnerGoals = fields[1].value;
        m.loserGoals = fields[3].value;

        m.winner = {__type: 'Pointer', className: 'Player', objectId: fields[0].value};
        m.loser = {__type: 'Pointer', className: 'Player', objectId: fields[2].value};

        var success = function (){
          queryForMatches();
          d.hide();
        };

        if(m.objectId) {
          m.$update(success, error(modalScope));
        } else {
          m.$save(success, error(modalScope));
        }

      };
    };

    $scope.openPlayerModal = function (player) {

      var modalScope = $scope.$new();
      modalScope.title = 'Player';

      var firstName = player ? player.firstName : undefined;
      var lastName = player ? player.lastName : undefined;

      var fields = [
        {label: 'First name', type: 'text', value: firstName, placeholder: 'First name'},
        {label: 'Last name', type: 'text', value: lastName, placeholder: 'Last name'}
      ];

      modalScope.fields = fields;

      var d = $modal({
        template: 'views/modal.html',
        scope: modalScope
      });

      modalScope.save = function (fields) {
        var m = player || new model.Player();
        m.firstName = fields[0].value;
        m.lastName = fields[1].value;

        var success = function (){
          queryForPlayers();
          queryForMatches();
          d.hide();
        };

        if(m.objectId){
          m.$update(success, error(modalScope));
        } else {
          m.$save(success, error(modalScope));
        }

      };
    };

  });

}(this.angular));
