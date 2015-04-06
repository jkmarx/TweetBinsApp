(function(){
'use strict';

  angular.module('TweetBinsApp', [
      'ngAnimate',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngCookies',
      'ngTouch'
    ]);
  // .run(function($rootScope,$http,$window,$location,AuthFactory){
  //     if(AuthFactory.isAuthenticated()){
  //       var data = JSON.parse($window.localStorage.getItem('tb-user'));
  //       $http.defaults.headers.common.Authorization = 'Token token='+data.token;
  //     } else {
  //       $location.path('/login');
  //     }
  //   });

  //   $rootScope.$on('$routeChangeStart',function(event,next){
  //     if(!AuthFactory.isAuthenticated()){
  //       $location.path('/loginApp');
  //     } else {
  //       $location.path('/dashboard');
  //     }
  //   });

  angular
    .module('TweetBinsApp')
    .config(TweetBinsAppConfig)
    .controller('NavbarCtrl', NavbarCtrl);

  function TweetBinsAppConfig($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/loginApp', {
        templateUrl: 'views/login-app.html'
        // controller: 'LoginAppCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
    }

  NavbarCtrl.$inject = ['$location'];

  function NavbarCtrl($location){
    var vm = this;

    vm.isActive = function(viewLocation){
      return viewLocation === $location.path();
    };
  }

})();
