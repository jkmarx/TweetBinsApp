'use strict';
angular.module('TweetBinsApp').controller('TweetsCtrl', TweetsCtrl);

TweetsCtrl.$inject = ['TweetsFactory'];

function TweetsCtrl(TweetsFactory){
  var vm = this;
  TweetsFactory.getTweets();
  vm.tweets = TweetsFactory.tweets;
};
