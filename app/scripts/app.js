(function (angular) {
  'use strict';

  var API = 'https://api.parse.com/1';

  var app = angular.module('sladsApp', ['ngSanitize', 'ngRoute', 'ngResource', 'ngCookies', 'mgcrea.ngStrap'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {templateUrl: 'views/login.html', controller: 'LoginCtrl', resolve: {
      //Show login page only when user is not logged in, otherwise redirect before rendering
      auth: function($q, parseService, $location) {
        var isAuth = $q.defer();
        parseService.currentUser(function () {
          isAuth.reject();
          $location.path('/main');
        }, isAuth.resolve);
        return isAuth.promise;
      }
    }})
    .when('/main', {templateUrl: 'views/main.html', controller: 'MainCtrl', resolve: {
      //Show main page only when user is logged in, otherwise redirect before rendering
      auth: function($q, parseService, $location) {
        var isAuth = $q.defer();
        parseService.currentUser(isAuth.resolve, function () {
          isAuth.reject();
          $location.path('/');
        });
        return isAuth.promise;
      }
    }})
    .when('/modal', {templateUrl: 'views/modal.html'})
    .otherwise({redirectTo: '/'});
  });

  app.directive('hideFullscreen', function ($window) {
    return {
      link: function (scope, element) {
        angular.element($window).bind('resize', function() {
          if (($window.fullScreen) || ($window.innerWidth === $window.screen.width && $window.innerHeight === $window.screen.height)) {
            element.addClass('ng-hide');
          } else {
            element.removeClass('ng-hide');
          }
        });
      }
    };
  });

  app.run(function ($http, $cookies) {
    $http.defaults.headers.common['X-Parse-Application-Id'] = 'wHOusfpG1kv1wus81ORw8FNwW7V7NP3qXQMfSYdP';
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'JWa79j0JWDFRk14OoWRuRH68Nutf83sA5FdxG4MP';
    $http.defaults.headers.common['X-Parse-Session-Token'] = $cookies.sessionToken;
    $http.defaults.transformResponse.push(function (data){
      if(angular.isObject(data) && data.results){
        return data.results;
      }
      return data;
    });
  });

  app.factory('model', function ($http, $resource) {
    return {
      User: $resource(API + '/users/:id', {id: '@objectId'}, {
        me: {method: 'GET', url: API + '/users/me'}
      }),
      Player: $resource(API + '/classes/Player/:id', {id: '@objectId'}, {
        update: {method: 'PUT'}
      }),
      Match: $resource(API + '/classes/Match/:id', {id: '@objectId', include: 'winner,loser'}, {
        update: {method: 'PUT'}
      }),
      Order: $resource(API + '/classes/Order/:id', {id: '@objectId'})
    };
  });

  app.factory('parseService', function ($http, $cookies, model) {
    return {
      login: function (username, password) {
        var result = $http({url: API + '/login', method: 'GET', params: {username: username, password: password}});
        result.success(function (user) {
          $http.defaults.headers.common['X-Parse-Session-Token'] = user.sessionToken;
          $cookies.sessionToken = user.sessionToken;
        });
        return result;
      },
      logout: function () {
        delete $http.defaults.headers.common['X-Parse-Session-Token'];
        delete $cookies.sessionToken;
      },
      currentUser : function (success, error) {
        return model.User.me({}, success, error);
      }
    };
  });

}(this.angular));