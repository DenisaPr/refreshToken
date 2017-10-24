'use strict';

/**
 * @ngdoc function
 * @name refreshTokenExempleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the refreshTokenExempleApp
 */
angular.module('refreshTokenExempleApp')
  .controller('MainCtrl', function ($scope, user) {

    $scope.loginUser = function (userData) {

      user.logIn().then(function (resp) {
        console.log('Logged In');
      }, function (error) {
        console.log('Failed to login', error.data);
      });

    }
  });
