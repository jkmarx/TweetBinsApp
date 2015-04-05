'use strict';

/**
 * @ngdoc function
 * @name tweetBinsAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tweetBinsAppApp
 */
angular.module('TweetBinsApp')
  .controller('DashboardCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
