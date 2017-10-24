'use strict';

/**
 * @ngdoc service
 * @name refreshTokenExempleApp.user
 * @description
 * # user
 * Service in the refreshTokenExempleApp.
 */
angular.module('refreshTokenExempleApp')
  .service('user', function ($q, OAuth, $http, $rootScope) {
    var mainUrl             = 'someBaseUrl';
    var isAlreadyInProgress = false;
    var refreshedToken      = '';


    $rootScope.$on('refreshToken', function () {

      if(!isAlreadyInProgress) {
        // set to TRUE so you will not make the call again and invalidate with the next call the received token.
        isAlreadyInProgress = true;

        OAuth.getRefreshToken().then(function (resp) {
          //if we are here => we got a new access token and we can continue

          //save new token
          refreshedToken = resp.data.access_token;

          //a function that changes headers to each call with the new access token
          var updater = function (config) {
            config.headers.Authorization = 'Bearer ' + refreshedToken;
            return config;
          };

          // set it to false so if from this point you get a 401 you can refresh your token again
          isAlreadyInProgress = false;

          //try to make all 401-status calls again
          httpBuffer.retryAll(updater);

        }).catch(function (error) {
          //if we are here => your refresh token expired and you can't refresh it, you have to login again

          // set it to false so if from this point you get a 401 you can refresh your token again
          isAlreadyInProgress = false;
          // reject the calls because you are no longer logged
          httpBuffer.rejectAll();
          //you log out
          logOut();
        });
      }
    });


    /**
     * LogIn function
     * @param userData eg.: {username: 'exemple@domain.com', password: 'exemplepass'}
     * @returns {*}
     */
    function logIn(userData) {
      return $q(function(resolve, reject) {
        var getToken = OAuth.getAccessToken(userData);

        getToken.then(function(resp){
          $http.get(mainUrl + "/me").then(function(data){
            resolve(data);
          }).catch(function (err) {
            reject(err);
          });
        }).catch(function (err) {
          reject(err);
        });
      });
    }

    /**
     * Log Out function
     * @returns {promise}
     */
    function logOut() {
      var logout = OAuth.revokeToken(null,customHeader);

      logout.then(clearAll, clearAll);

      $location.path('/login');
      return logout;
    }

    /**
     * clear all storage in my case
     */
    function clearAll(resp) {
     // Do something if have to
    }

    return {
      logIn:  logIn,
      logOut: logOut
    }
  });
