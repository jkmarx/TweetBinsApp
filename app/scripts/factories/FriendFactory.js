'use strict';

angular.module('TweetBinsApp').factory('FriendFactory', ['$http', '$routeParams', '$window', 'ServerUrl', function($http,$routeParams, $window, ServerUrl){
  var friend = {};

  console.log('in friendFactory');

  var setFriend = function(newFriend) {
    angular.copy(newFriend, friend);
  };

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
      return $http.put(ServerUrl + '/friends/' + friend.id, params, config)
      .then(getFriend);
    } else {
      return $http.post(ServerUrl + '/friends', params, config)
      .then(function(response) {
        friend.push(response.data);
      }, requestFailure);
    }
  };

  function findFriendIndexById(id) {
    for (var i = 0; i < friend.length; i++) {
      if (friend[i].id === id) {
          return i;
      }
    }
  }

    var deleteFriend = function(friendId) {
      var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.delete(ServerUrl + '/friends/' + friendId, config)
    .then(function(response) {
      console.log(response);
    });
  };

  function requestFailure(response){
    console.log('in requestFailure');
    console.log(response);
  }

  return {
    friend: friend,
    getFriend: getFriend,
    upsertFriend: upsertFriend,
    setFriend: setFriend,
    deleteFriend: deleteFriend
  };

}]);
