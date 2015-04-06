'use strict';

/**
 * @ngdoc function
 * @name tweetBinsAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tweetBinsAppApp
 */
angular
  .module('TweetBinsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
