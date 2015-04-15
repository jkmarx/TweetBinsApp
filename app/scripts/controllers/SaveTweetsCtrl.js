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
  $scope.saveTweet = function($scope) {
    value : $scope.value;
  };

  $scope.$watch('saveTweet.value', function(){
    if($scope.saveTweet.value){
      SaveTweetsFactory.upsertSaveTweet($scope.saveTweet.value);
    }
  });

  vm.upsertCategory = function(saveTweet) {
    SaveTweetsFactory.upsertCategory(saveTweet)
    .then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.editCategory = function(saveTweet) {
    SaveTweetsFactory.setCategory(saveTweet);
  };

  vm.deleteCategory = function(saveTweet) {
    SaveTweetsFactory.deleteCategory(saveTweet);
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
    SaveTweetsFactory.setCategory({name: ''});
    vm.serverErrors = false;
  }
}

