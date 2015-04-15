'use strict';

angular.module('TweetBinsApp').factory('FaveTweetsFactory', ['$http', '$routeParams', '$window', 'ServerUrl', function($http,$routeParams, $window, ServerUrl){

  var faveTweets = [];
  var faveTweet = {};

  console.log('in faveTweetsFactory');

  var setFaveTweet = function(newFaveTweet) {
    angular.copy(newFaveTweet, faveTweet);
  };

  function getFaveTweet() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    var faveTweetId = $routeParams.faveTweetId;
     return $http.get('http://localhost:3000/fave_tweets/' + faveTweetId).then(function(response) {
        //console.log(response.data);
        angular.copy(response.data, faveTweet);
      }, requestFailure);

   }

  var getFaveTweets = function() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.get(ServerUrl + '/fave_tweets', config).then(function(response) {
      // console.log(response.data);
      angular.copy(response.data, faveTweets);
    }, requestFailure);
  };

  var upsertFaveTweet = function(faveTweet) {
    var params = {
      faveTweet: faveTweet
    };
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    if (faveTweet.id) {
      return $http.put(ServerUrl + '/fave_tweets/' + faveTweet.id, params)
      .then(getFaveTweets);
    } else {
      return $http.post(ServerUrl + '/fave_tweets', params)
      .then(function(response) {
        faveTweets.push(response.data);
      }, requestFailure);
    }
  };

  var deleteFaveTweet = function(faveTweet) {
      var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.delete(ServerUrl + '/fave_tweets/' + faveTweet.id)
    .then(function(response) {
      faveTweets.splice(findFaveTweetIndexById(faveTweet.id), 1);
    });
  };

  function findFaveTweetIndexById(id) {
    for (var i = 0; i < faveTweets.length; i++) {
      if (faveTweets[i].id === id) {
          return i;
      }
    }
  }

  function requestFailure(response){
    console.log('in requestFailure');
    console.log(response);
  }

  return {
    faveTweets: faveTweets,
    faveTweet: faveTweet,
    getFaveTweets: getFaveTweets,
    upsertFaveTweet: upsertFaveTweet,
    deleteFaveTweet: deleteFaveTweet,
    getFaveTweet: getFaveTweet,
    setFaveTweet: setFaveTweet
  };

}]);
