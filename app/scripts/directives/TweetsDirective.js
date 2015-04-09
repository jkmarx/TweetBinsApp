'use strict';

angular
  .module('TweetBinsApp')
  .directive('diTweets', diTweets);

function diTweets() {
  return {
    restrict: 'E',
    templateUrl: 'views/tweets.html',
    scope: {
        jobs: '='
    },
    controller: 'TweetsCtrl',
    controllerAs: 'tweetsCtrl',
    bindToController: true
  };
}
