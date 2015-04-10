'use strict';

angular.module('TweetBinsApp').factory('FriendFactory', ['$http', '$routeParams', '$window', 'ServerUrl', function($http,$routeParams, $window, ServerUrl){
  var friend = {};

  console.log('in friendFactory');

  var setFriend = function(newFriend) {
    angular.copy(newFriend, friend);
  };

  function getFriend() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    var friendId = $routeParams.friendId;
     return $http.get('http://localhost:3000/firends/' + friendId).then(function(response) {
        //console.log(response.data);
        angular.copy(response.data, friend);
      }, requestFailure);

   }

  var getFriend = function() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.get(ServerUrl + '/friends', config).then(function(response) {
      console.log(response.data);
      angular.copy(response.data, friend);
    }, requestFailure);
  };

  var upsertFriend = function(friend) {
    var params = {
      friend: friend
    };
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    if (friend.id) {
      return $http.put(ServerUrl + '/friends/' + friend.id, params)
      .then(getFriend);
    } else {
      return $http.post(ServerUrl + '/friends', params)
      .then(function(response) {
        friends.push(response.data);
      }, requestFailure);
    }
  };

  function findFriendIndexById(id) {
    for (var i = 0; i < friends.length; i++) {
      if (friends[i].id === id) {
          return i;
      }
    }
  }

  function requestFailure(response){
    console.log('in requestFailure');
    console.log(response);
  }

  return {
    friend: friend,
    getFriend: getFriend,
    upsertFriend: upsertFriend,
    setFriend: setFriend
  };

}]);
