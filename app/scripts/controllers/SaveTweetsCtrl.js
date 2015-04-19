'use strict';
angular.module('TweetBinsApp').controller('SaveTweetsCtrl', SaveTweetsCtrl);

SaveTweetsCtrl.$inject = ['$scope','SaveTweetsFactory'];

function SaveTweetsCtrl($scope, SaveTweetsFactory){
  var vm = this;
  // vm.saveTweet = tweetsFactory.saveTweet;

  // $scope.saveTweet = vm.saveTweet;

  vm.saveTweets = SaveTweetsFactory.saveTweets;
  // $scope.saveTweets = vm.saveTweets;

  if (!(vm.saveTweets.length > 0)){
    SaveTweetsFactory.getSaveTweets().then(function(response){
      vm.saveTweets = SaveTweetsFactory.saveTweets;
    });
  }

  vm.upsertSaveTweet = function(saveTweet) {
    SaveTweetsFactory.upsertSaveTweet(saveTweet)
    .then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.editSaveTweet = function(saveTweet) {
    SaveTweetsFactory.setSaveTweet(saveTweet);
  };

  vm.deleteSaveTweet = function(saveTweet) {
    SaveTweetsFactory.deleteSaveTweet(saveTweet);
  };


  vm.cancel = function() {
    resetForm();
  };

  function handleErrors(errObj) {
    var errString = '';
    angular.forEach(errObj, function(value, key) {
        errString += key + ': ' + value;
    });
    return errString;
  }

  function resetForm() {
    vm.serverErrors = false;
  }
}

