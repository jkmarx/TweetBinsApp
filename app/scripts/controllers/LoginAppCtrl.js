'use strict';

angular
  .module('TweetBinsApp')
  .controller('LoginAppCtrl', LoginAppCtrl);

LoginAppCtrl.$inject = ['AuthFactory','$location','$scope'];

function LoginAppCtrl(AuthFactory, $location, $scope){
  console.log('in loginAppctrl');
  var vm = this;
  vm.credentials = {};

  vm.login = function(credentials){
    console.log('in applogin function');
    AuthFactory.login(credentials).then(function(response){
      // console.log(response);
      vm.credentials = {};
      $location.path('/login');
    });
  };

  var logout = function(){
    AuthFactory.logout();
    // return $http.get(ServerUrl + '/logout').success(function(response){
    //   $window.localStorage.removeItem('ga-user');
    //   console.log(response);
    // });
  };

  vm.register = function(credentials){
    AuthFactory.postNewUser(credentials).success(function(response){
      $location.path('/login');
    }).error(function(data, status, headers, config){
      console.log(data);
    });
  };
}
