'use strict';

/**
 * @ngdoc overview
 * @name refreshTokenExempleApp
 * @description
 * # refreshTokenExempleApp
 *
 * Main module of the application.
 */
angular
  .module('refreshTokenExempleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-oauth2'
  ])
  .config(function ($routeProvider, $httpProvider, OAuthProvider, OAuthTokenProvider ) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

    OAuthProvider.configure({
      baseUrl: 'someBaseUrl.com',
      clientId: 'yourClientId',
      clientSecret: 'IfYouHaveASecret', // optional
      grantPath: '/grant/path/token',
      revokePath: '/logout'
    });

    OAuthTokenProvider.configure({
      name: 'token',
      options: {
        secure: false
      }
    });

    $httpProvider.interceptors.push('httpInterceptor');
  });
