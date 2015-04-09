'use strict';
angular.module('TweetBinsApp').controller('TweetsCtrl', TweetsCtrl);

TweetsCtrl.$inject = ['$scope', 'TweetsFactory'];

function TweetsCtrl($scope, TweetsFactory){
  var vm = this;
  console.log("in tweetsCtrl now!");
  TweetsFactory.getTweets().then(function(response){
    vm.tweets = TweetsFactory.tweets;
  });
};

