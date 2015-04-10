'use strict';

angular.module('TweetBinsApp').factory('TweetsFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){

  var friend = {};
  var tweets = [];
  console.log('in tweetsFactory');

  var getTweets = function() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.get(ServerUrl + '/tweets', config).then(function(response) {
      // console.log(response.data);
      angular.copy(response.data,tweets);
    }, requestFailure);
  };

  function requestFailure(response){
    // console.log('in requestFailure');
    console.log(response);
  }

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
      return $http.put(ServerUrl + '/friends/' + friend.id, params)
      .then(getFriend);
    } else {
      return $http.post(ServerUrl + '/friends', params)
      .then(function(response) {
        friend.push(response.data);
      }, requestFailure);
    }
  };

  return {
    tweets: tweets,
    getTweets: getTweets,
    friend: friend,
    getFriend: getFriend,
    upsertFriend: upsertFriend,
    setFriend: setFriend
  };

}]);
