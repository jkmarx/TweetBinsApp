'use strict';
angular.module('TweetBinsApp').controller('FriendCtrl', FriendCtrl);

FriendCtrl.$inject = ['$scope','FriendFactory'];

function FriendCtrl($scope, FriendFactory){
  var vm = this;
  vm.friend = FriendFactory.friend;
  $scope.friend = vm.friend

  vm.upsertFriend = function(friend) {
    FriendFactory.upsertFriend(friend)
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
    vm.serverErrors = false;
  }
  resetForm();
}

