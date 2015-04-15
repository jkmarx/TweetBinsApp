'use strict';
angular.module('TweetBinsApp').controller('FaveTweetsCtrl', FaveTweetsCtrl);

FaveTweetsCtrl.$inject = ['$scope','FaveTweetsFactory'];

function FaveTweetsCtrl($scope, FaveTweetsFactory){
  var vm = this;
  // vm.faveTweet = tweetsFactory.faveTweet;

  // $scope.faveTweet = vm.faveTweet;

  // vm.faveTweets = FaveTweetsFactory.faveTweets;
  // $scope.faveTweets = vm.faveTweets;

  // if (!(vm.faveTweets.length > 0)){
  //   FaveTweetsFactory.getFaveTweets().then(function(response){
  //     vm.faveTweets = FaveTweetsFactory.faveTweets;
  //   });
  // }
  $scope.faveTweet = function($scope) {
    value : $scope.value;
  };

  $scope.$watch('faveTweet.value', function(){
    // debugger;
    if($scope.faveTweet.value){
      debugger;
      console.log("get fave tweet");
    }
  });

  vm.upsertCategory = function(faveTweet) {
    FaveTweetsFactory.upsertCategory(faveTweet)
    .then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.editCategory = function(faveTweet) {
    FaveTweetsFactory.setCategory(faveTweet);
  };

  vm.deleteCategory = function(faveTweet) {
    FaveTweetsFactory.deleteCategory(faveTweet);
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
    FaveTweetsFactory.setCategory({name: ''});
    vm.serverErrors = false;
  }
}

