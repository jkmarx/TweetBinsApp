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
    var category_friends = scope.category.friends
    var category_friendIds = [];

    for (var j = 0; j < category_friends.length; j++){
      category_friendIds.push(category_friends[j].twitterId)
    }
    for(var i = 0; i < param.length; i++){
      var friendId = param[i].userId;
      var foundIndex = category_friendIds.indexOf(friendId)
      if (foundIndex > -1 || friendId === 816653){
        filteredTweets.push(param[i]);
      };
    }
    return filteredTweets;
  };
};
