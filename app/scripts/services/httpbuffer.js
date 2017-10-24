'use strict';

/**
 * @ngdoc service
 * @name refreshTokenExempleApp.httpBuffer
 * @description
 * # httpBuffer
 * Factory in the refreshTokenExempleApp.
 */
angular.module('refreshTokenExempleApp')
  .factory('httpBuffer', function ($injector) {
    /**
     * This file is possible by using a really nice library from
     * https://github.com/witoldsz/angular-http-auth
     *
     * A big thank you!!!
     *
     * But not everything was working, as we needed it, using his library
     * So we tried to use what we can and do what we needed.
     * Maybe you don't need to use it like this
     */

    /** Holds all the requests, so they can be re-requested in future. */
    var buffer = [];

    /** Service initialized later because of circular dependency problem. */
    var $http;

    function retryHttpRequest(config, deferred) {
      function successCallback(response) {
        deferred.resolve(response);
      }
      function errorCallback(response) {
        deferred.reject(response);
      }
      $http = $http || $injector.get('$http');
      $http(config).then(successCallback, errorCallback);
    }

    return {
      /**
       * Appends HTTP request configuration object with deferred response attached to buffer.
       * @return {Number} The new length of the buffer.
       */
      append: function(config, deferred) {
        return buffer.push({
          config: config,
          deferred: deferred
        });
      },

      /**
       * Abandon or reject (if reason provided) all the buffered requests.
       */
      rejectAll: function(reason) {
        if (reason) {
          for (var i = 0; i < buffer.length; ++i) {
            buffer[i].deferred.reject(reason);
          }
        }
        buffer = [];
      },

      /**
       * Retries all the buffered requests clears the buffer.
       */
      retryAll: function(updater) {
        for (var i = 0; i < buffer.length; ++i) {
          var _cfg = updater(buffer[i].config);
          if (_cfg !== false)
            retryHttpRequest(_cfg, buffer[i].deferred);
        }
        buffer = [];
      }
    };
  });
