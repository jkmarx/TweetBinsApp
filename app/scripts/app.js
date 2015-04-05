(function(){
'use strict';

angular
  .module('TweetBinsApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngCookies',
    'ngTouch'
  ]);

  angular
    .module('TweetBinsApp')
    .config(TweetBinsAppConfig)
    .controller('NavbarCtrl', navbarCtrl);

  function TweetBinsAppConfig($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
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

    navbarCtrl.$inject = ['$location'];

  function navbarCtrl($location){
    var vm = this;

    vm.isActive = function(viewLocation){
      return viewLocation === $location.path();
    };
  }


})();
