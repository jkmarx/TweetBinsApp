'use strict';

angular
.module('TweetBinsApp')
.controller('CategoryCtrl', CategoryCtrl)
.filter('tweetsFilter',tweetsFilter);

CategoryCtrl.$inject = ['$scope','CategoriesFactory'];

function CategoryCtrl($scope, CategoriesFactory){
  var vm = this;
  CategoriesFactory.getCategory().then(function(response){
    vm.category = CategoriesFactory.category;
    $scope.category = vm.category;
   // console.log(vm.job);
  });
}

function tweetsFilter(){
  return function(param, scope){
    var filteredTweets = [];
    var categoryFriends = scope.category.friends;
    var categoryFriendsId = [];

    for (var j = 0; j < categoryFriends.length; j++){
      categoryFriendsId.push(categoryFriends[j].twitterId);
    }
    for(var i = 0; i < param.length; i++){
      var friendId = param[i].userId.toString();
      var foundIndex = categoryFriendsId.indexOf(friendId);
      if (foundIndex > -1){
        filteredTweets.push(param[i]);
      }
    }
    return filteredTweets;
  };
}
