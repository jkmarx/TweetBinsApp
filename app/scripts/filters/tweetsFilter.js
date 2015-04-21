'use strict';

// Filters out any friends who does not belong in a category
angular.module('TweetBinsApp').filter('tweetsFilter',[function(param, scope){
return function(param, scope){
  var filteredTweets = [];
  var categoryFriendsId = [];

  getCategoryFriendsList(scope, categoryFriendsId);

  if(param){
    for(var i = 0; i < param.length; i++){
      var friendId = param[i].userId.toString();
      var foundIndex = categoryFriendsId.indexOf(friendId);
      if (foundIndex > -1){
        filteredTweets.push(param[i]);
      }
    }
  }
  return filteredTweets;
};
}]);


var getCategoryFriendsList = function(scope, categoryFriendsId){
  if(scope.category.friends){
    var categoryFriends = scope.category.friends;
    for (var j = 0; j < categoryFriends.length; j++){
      categoryFriendsId.push(categoryFriends[j].twitterId);
    }
  }
};
