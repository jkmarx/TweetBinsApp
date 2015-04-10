'use strict';
angular.module('TweetBinsApp').controller('TweetsCtrl', TweetsCtrl);

TweetsCtrl.$inject = [ '$scope','TweetsFactory', 'CategoriesFactory'];

function TweetsCtrl( $scope, TweetsFactory, CategoriesFactory){
  var vm = this;
  vm.friend = TweetsFactory.friend;
  vm.categories = CategoriesFactory.categories;
  console.log('in tweetsCtrl now!');
  TweetsFactory.getTweets().then(function(response){
    vm.tweets = TweetsFactory.tweets;
  });

  vm.upsertFriend = function(friend) {
    var friendParam = {}
    friend = JSON.parse("[" + friend + "]");
    friendParam.category_id = friend[0];
    friendParam.twitterId = friend[1];
    TweetsFactory.upsertFriend(friendParam)
    .then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.editFriend = function(friend) {
    TweetsFactory.setFriend(friend);
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
    TweetsFactory.setFriend({twitterId: '', category_id: ''});
    CategoriesFactory.setCategory({name:''});
    vm.serverErrors = false;
  }
  resetForm();
}
