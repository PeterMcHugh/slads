(function (angular) {
  'use strict';

  var API = 'https://api.parse.com/1';

  var app = angular.module('sladsApp', ['ngSanitize', 'ngRoute', 'ngResource', 'ngCookies', 'mgcrea.ngStrap'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {templateUrl: 'views/login.html', controller: 'LoginCtrl'})
    .when('/main', {templateUrl: 'views/main.html', controller: 'MainCtrl'})
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
      User: $resource(API + '/users/:id', {id: '@objectId'}),
      Player: $resource(API + '/classes/Player/:id', {id: '@objectId'}, {
        update: {method: 'PUT'}
      }),
      Match: $resource(API + '/classes/Match/:id', {id: '@objectId', include: 'winner,loser'}, {
        update: {method: 'PUT'}
      }),
      Order: $resource(API + '/classes/Order/:id', {id: '@objectId'})
    };
  });

  app.factory('parseService', function ($http, $cookies, $location) {
    return {
      login: function (username, password) {
        var result = $http({url: API + '/login', method: 'GET', params: {username: username, password: password}});
        result.success(function (user){
          $http.defaults.headers.common['X-Parse-Session-Token'] = user.sessionToken;
          $cookies.sessionToken = user.sessionToken;
        });
        return result;
      },
      logout: function () {
        delete $http.defaults.headers.common['X-Parse-Session-Token'];
        delete $cookies.sessionToken;
        $location.path('/');
      },
      currentUser : function () {
        if($cookies.sessionToken) {
          return $http.get(API + '/users/me');
        }
        return undefined;
      }
    };
  });

  //Redirect to the login page if not authenticated
  app.run(function ($rootScope, $location, $cookies,  parseService) {
    $rootScope.$on('$routeChangeStart', function (event) {
      if (!parseService.currentUser()) {
        event.preventDefault();
        $location.path('/');
      }
    });
  });



}(this.angular));