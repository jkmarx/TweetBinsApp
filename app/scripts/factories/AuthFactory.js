'use strict';

angular
.module('TweetBinsApp')
.factory('AuthFactory', AuthFactory);

AuthFactory.$inject = ['$http','$window', 'ServerUrl'];

function AuthFactory($http, $window, ServerUrl){
  var userInfo = {};

  function login(credentials){
    console.log(credentials);
    console.log('In authfactory login');
    return $http.post(ServerUrl + '/login', credentials).success(function(response){
      _storeSession(response);
    });
  }

  function getUserInfo() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    var userEmail = JSON.parse($window.localStorage.getItem('tb-user'))["email"];
     return $http.get(ServerUrl + '/users').then(function(response) {
        console.log(response.data);
        angular.copy(response.data, userInfo);
      }, requestFailure);

   }

  function logout(){
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
      return $http.get(ServerUrl + '/logout').success(function(response){
        $window.localStorage.removeItem('tb-user');
      });
  }

  function isAuthenticated(){
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    if(data) return !!data.token;
    return false;
  }

  var clearStorage = function(){};

  var _storeSession = function(data){
    //unique names to localstorage keys
    $window.localStorage.setItem('tb-user', JSON.stringify(data));

    $http.defaults.headers.common.Authorization = 'Token token=' + data.token;
  };

  var upsertUser = function(user){
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    var params = {
      user: user
    };
    return $http.post(ServerUrl + '/users/update', params).success(function(response){
      _storeSession(response);

    }).error(function(data, status, headers, config){
      console.log(data);
    });
  };

  var registerUser = function(user){
    var params = {
      user: user
    };
    return $http.post(ServerUrl + '/users', params).success(function(response){
      _storeSession(response);

    }).error(function(data, status, headers, config){
      console.log(data);
    });
  };

    function requestFailure(response){
    console.log('in requestFailure');
    console.log(response);
  }

  var deleteUser = function(user) {
      var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.delete(ServerUrl + '/users' )
    .then(function(response) {
      console.log(response);
    });
  };

  return{
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated,
    clearStorage: clearStorage,
    upsertUser: upsertUser,
    getUserInfo: getUserInfo,
    userInfo: userInfo,
    registerUser: registerUser,
    deleteUser: deleteUser
  };
}
