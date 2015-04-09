'use strict';

angular
  .module('TweetBinsApp')
  .directive('diTweets', diTweets);

function diTweets() {
  return {
    restrict: 'E',
    templateUrl: 'views/tweets.html',
    scope: {
        tweets: '=',
        category: '='
    },
    controller: 'TweetsCtrl',
    controllerAs: 'tweetsCtrl',
    bindToController: true
  };
}
