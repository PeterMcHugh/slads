(function (angular, Parse) {
    'use strict';

    var module = angular.module('sladsApp');

    module.controller('LadderCtrl', function ($scope, parseService, $modal) {
              
        $scope.players = [];
      
        $scope.matches = [];

        var Player = Parse.Object.extend({className: 'Player', attrs: ['firstName', 'lastName']});
      
        var queryForPlayers = function () {
          var query = new Parse.Query(Player);
          query.find().then(function (results) {
            $scope.players = results;
          });
        };
      
        queryForPlayers();

        var Match = Parse.Object.extend({className: 'Match', attrs: ['winner', 'loser']});
      
        var queryForMatches = function () {
          var matchQuery = new Parse.Query(Match);
          matchQuery.include('winner', 'loser');
          matchQuery.find().then(function (results) {
            $scope.matches = results;
          });
        };
      
        queryForMatches();
      
        var playerName = function (player) {
          return player.getFirstName() + ' ' + player.getLastName();
        };
      
        var updateLadder = function () {
          $scope.ladder = [];
          var ladder = $scope.players.map(function(player){
            var elem = {name: playerName(player)};
            
            elem.wins = $scope.matches.reduce(function(wins, match) {
              if(match.getWinner().id === player.id){
                return wins+1;
              }
              return wins;
            }, 0);
            
            elem.for = $scope.matches.reduce(function(wins, match) {
              if(match.getWinner().id === player.id){
                return wins + match.get('winner_goals');
              }
              if(match.getLoser().id === player.id){
                return wins + match.get('loser_goals');
              }
              return wins;
            }, 0);
            
            elem.losses = $scope.matches.reduce(function(losses, match) {
              if(match.getLoser().id === player.id){
                return losses+1;
              }
              return losses;
            }, 0);
            
            elem.against = $scope.matches.reduce(function(losses, match) {
              if(match.getLoser().id === player.id){
                return losses + match.get('winner_goals');
              }
              if(match.getWinner().id === player.id){
                return losses + match.get('loser_goals');
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
      
        $scope.openMatchModal = function (match) {

          var modalScope = $scope.$new();
          modalScope.title = 'Match';
          
          var values = $scope.players.map(function(player){
            return {name: player.getFirstName() + ' ' + player.getLastName(), id: player.id};
          });
            
          var winnerId = match ? match.getWinner().id : undefined;
          var loserId = match ? match.getLoser().id : undefined;
          
          var winnerGoals = match ? match.get('winner_goals') : 0;
          var loserGoals = match ? match.get('loser_goals') : 0;
                      
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
            var m = match || new Match();
            m.set('winner_goals', fields[1].value);
            m.set('loser_goals', fields[3].value);
            
            var winner = new Player();
            winner.id = fields[0].value;
            m.set('winner', winner);
            
            var loser = new Player();
            loser.id = fields[2].value;
            m.set('loser', loser);
                  
            m.save(null, {
              success: function (){
                queryForMatches();
                d.hide();
              }
            });
          };
        };
      
        $scope.openPlayerModal = function (player) {

          var modalScope = $scope.$new();
          modalScope.title = 'Player';
          
          var firstName = player ? player.getFirstName() : undefined;
          var lastName = player ? player.getLastName() : undefined;
                      
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
            var m = player || new Player();
            m.set('firstName', fields[0].value);
            m.set('lastName', fields[1].value);
                          
            m.save(null, {
              success: function (){
                queryForPlayers();
                queryForMatches();
                d.hide();
              }
            });
          };
        };

    });

  }(this.angular, this.Parse));
