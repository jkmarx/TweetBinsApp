'use strict';

angular
  .module('TweetBinsApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$http', '$location', '$window', '$scope'];

function LoginCtrl($http, $location, $window, $scope){
  var vm = this;
  console.log('in loginctrl');

  vm.redirectToTwitter = function(){
    console.log('in redirectToTwitter');
    getCallbackToken();
    };

  function getCallbackToken() {
    console.log('in getCallbackToken');
    return $http.get('http://localhost:3000/callbacks').then(function(response) {
      console.log(response.data);
      redirectTwitterLogin(response.data);
    }, requestFailure);
  }

  function requestFailure(response){
    console.log('in requestFailure');
    console.log(response);
  }

  function redirectTwitterLogin(token){
    console.log(token.token);
    $window.location.href = 'https://api.twitter.com/oauth/authorize?' + token.token;

    return $http.get('http://localhost:3000/callbacks').then(function(response) {
      console.log(response.data);
      redirectTwitterLogin(response.data);
    }, requestFailure);
  }
}

