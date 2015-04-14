'use strict';
angular.module('TweetBinsApp').controller('FriendCtrl', FriendCtrl);

FriendCtrl.$inject = ['FriendFactory','CategoriesFactory'];

function FriendCtrl( FriendFactory,CategoriesFactory){
  var vm = this;
  vm.friend = FriendFactory.friend;
  vm.categories = CategoriesFactory.categories;

  vm.upsertFriend = function(friend) {
    var friendParam = {};
    friendParam.category_id = friend[0];
    friendParam.twitterId = friend[1];
    FriendFactory.upsertFriend(friendParam)
    .then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.editFriend = function(friend) {
    FriendFactory.setFriend(friend);
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

