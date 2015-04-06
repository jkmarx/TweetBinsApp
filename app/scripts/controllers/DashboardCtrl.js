(function(){
  'use strict';

  angular
    .module('TweetBinsApp')
    .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$http', '$location'];

    function DashboardCtrl($http, $location){
      var vm = this;
      vm.tweets = getTweets();
      console.log('in dashboardctrl');

      function getTweets() {
        console.log('in tweets ctrl');
        return $http.get('http://localhost:3000/tweets').then(function(response) {
          console.log(response.data);
        }, requestFailure);
      }

      function requestFailure(response){
        console.log('in requestFailure');
        console.log(response);
      }
    }
})();


