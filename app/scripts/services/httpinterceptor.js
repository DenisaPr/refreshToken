'use strict';

/**
 * @ngdoc service
 * @name refreshTokenExempleApp.httpInterceptor
 * @description
 * # httpInterceptor
 * Factory in the refreshTokenExempleApp.
 */
angular.module('refreshTokenExempleApp')
  .factory('httpInterceptor', function ($q,$rootScope,httpBuffer) {
    var requestInterceptor = {

      request: function(config) {
        return config;
      },

      responseError: function responseError(rejection) {
        if (!rejection) {
          return $q.reject(rejection);
        }
        if (401 === rejection.status ) {
          var deferred = $q.defer();
          var config   = rejection.config || {};

          //in my case
          //if we get 401 at token or logout it is alright, go on and reject the call,
          //else try refresh token
          //you can add any validation you want here, or even delete it - depends on your project
          if(!config.url.includes('/token') && !config.url.includes('/logout')){

            // save failed calls to retry them later on
            httpBuffer.append(config, deferred);

            // broad cast the need to refresh token
            $rootScope.$broadcast('refreshToken');

            return deferred.promise;
          }
        }

        return $q.reject(rejection);
      }
    };

    return requestInterceptor;
  });
