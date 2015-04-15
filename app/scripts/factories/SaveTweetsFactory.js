'use strict';

angular.module('TweetBinsApp').factory('SaveTweetsFactory', ['$http', '$routeParams', '$window', 'ServerUrl', function($http,$routeParams, $window, ServerUrl){

  var saveTweets = [];
  var saveTweet = {};

  console.log('in saveTweetsFactory');

  var setSaveTweet = function(newSaveTweet) {
    angular.copy(newSaveTweet, saveTweet);
  };

  function getSaveTweet() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    var saveTweetId = $routeParams.saveTweetId;
     return $http.get('http://localhost:3000/save_tweets/' + saveTweetId).then(function(response) {
        //console.log(response.data);
        angular.copy(response.data, saveTweet);
      }, requestFailure);

   }

  var getSaveTweets = function() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.get(ServerUrl + '/save_tweets', config).then(function(response) {
      angular.copy(response.data, saveTweets);
    }, requestFailure);
  };

  var upsertSaveTweet = function(saveTweet) {
    var params = {
      save_tweet: JSON.parse(saveTweet)
    };

    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    if (saveTweet.id) {
      return $http.put(ServerUrl + '/save_tweets/' + saveTweet.id, params)
      .then(getSaveTweets);
    } else {
      return $http.post(ServerUrl + '/save_tweets', params)
      .then(function(response) {
        saveTweets.push(response.data);
      }, requestFailure);
    }
  };

  var deleteSaveTweet = function(saveTweet) {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.delete(ServerUrl + '/save_tweets/' + saveTweet.id)
    .then(function(response) {
      saveTweets.splice(findSaveTweetIndexById(saveTweet.id), 1);
    });
  };

  function findSaveTweetIndexById(id) {
    for (var i = 0; i < saveTweets.length; i++) {
      if (saveTweets[i].id === id) {
          return i;
      }
    }
  }

  function requestFailure(response){
    console.log('in requestFailure');
    console.log(response);
  }

  return {
    saveTweets: saveTweets,
    saveTweet: saveTweet,
    getSaveTweets: getSaveTweets,
    upsertSaveTweet: upsertSaveTweet,
    deleteSaveTweet: deleteSaveTweet,
    getSaveTweet: getSaveTweet,
    setSaveTweet: setSaveTweet
  };

}]);
