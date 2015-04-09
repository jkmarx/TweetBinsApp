'use strict';

angular.module('TweetBinsApp').factory('TweetsFactory', ['$http', '$window', 'ServerUrl', function($http, $window, ServerUrl){

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
      console.log(response.data);
      angular.copy(response.data,tweets);
    }, requestFailure);
  };

  function requestFailure(response){
    console.log('in requestFailure');
    console.log(response);
  }

  return {
    tweets: tweets,
    getTweets: getTweets
  };

}]);
