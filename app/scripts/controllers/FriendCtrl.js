'use strict';
angular.module('TweetBinsApp').controller('FriendCtrl', FriendCtrl);

FriendCtrl.$inject = ['FriendFactory','CategoriesFactory', '$route'];

function FriendCtrl( FriendFactory,CategoriesFactory, $route){
  var vm = this;
  vm.friend = FriendFactory.friend;
  vm.categories = CategoriesFactory.categories;

  vm.upsertFriend = function(friend) {
    var friendParam = vm.setFriendParam(friend);

    FriendFactory.upsertFriend(friendParam)
    .then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.setFriendParam = function(friend){
    var friendParam = {};
    friendParam.category_id = friend[0];
    friendParam.twitterId = friend[1];
    return friendParam;
  };

  vm.editFriend = function(friend) {
    FriendFactory.setFriend(friend);
  };

  vm.deleteFriend = function(friendId) {
    FriendFactory.deleteFriend(friendId);
    $route.reload();
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
    FriendFactory.setFriend({twitterId: '', category_id: ''});
    vm.serverErrors = false;
  }
  resetForm();
}

