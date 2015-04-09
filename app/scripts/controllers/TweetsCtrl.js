'use strict';
angular.module('TweetBinsApp').controller('TweetsCtrl', TweetsCtrl);

TweetsCtrl.$inject = ['TweetsFactory'];

function TweetsCtrl(TweetsFactory){
  var vm = this;
  TweetsFactory.getTweets().then(function(response){
  vm.tweets = TweetsFactory.tweets;
  });
}
