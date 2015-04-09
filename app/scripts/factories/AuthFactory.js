'use strict';

angular
.module('TweetBinsApp')
.factory('AuthFactory', AuthFactory);

AuthFactory.$inject = ['$http','$window', 'ServerUrl'];

function AuthFactory($http, $window, ServerUrl){

  function login(credentials){
    console.log(credentials);
    console.log('In authfactory login');
    return $http.post(ServerUrl + '/login', credentials).success(function(response){
      _storeSession(response);
    });
  }

  function logout(){
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

  return{
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated,
    clearStorage: clearStorage,
  };
}
