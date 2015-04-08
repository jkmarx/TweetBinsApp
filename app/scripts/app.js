'use strict';

angular.module('TweetBinsApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngCookies',
    'ngTouch'
]).run(function($rootScope,$http,$window,$location,AuthFactory, TweetsFactory){
  if(AuthFactory.isAuthenticated()){
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    $http.defaults.headers.common.Authorization = 'Token token='+data.token;
  } else {
    $location.path('/loginApp');
  }

  $rootScope.$on('$routeChangeStart',function(event,next){
    if(!AuthFactory.isAuthenticated()){
      $location.path('/loginApp');
    } else {
      $location.path('/tweets');
    }
  });
});



