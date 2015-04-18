'use strict';

angular.module('TweetBinsApp').config(['$routeProvider',
  function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/loginApp', {
      templateUrl: 'views/login-app.html'
      // controller: 'LoginAppCtrl'
    })
    .when('/userAccount', {
      templateUrl: 'views/user-account.html',
      controller: 'UserInfoCtrl'
    })
    .when('/tweets', {
      templateUrl: 'views/tweets.html',
      controller: 'TweetsCtrl'
    })
    .when('/main', {
      templateUrl: 'views/tweets.html',
    })
    .when('/categories/:categoryId', {
      templateUrl: 'views/category.html',
      controller: 'CategoryCtrl'
    })
    .when('/saveTweets', {
      templateUrl: 'views/save-tweets.html',
      controller: 'SaveTweetsCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/loginApp'
    });
  }
]);
