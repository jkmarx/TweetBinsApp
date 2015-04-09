'use strict';

angular.module('TweetBinsApp').controller('NavbarCtrl', NavbarCtrl);

NavbarCtrl.$inject = ['AuthFactory','$location','$scope'];

function NavbarCtrl(AuthFactory, $location, $scope){
  var vm = this;

  vm.isLoggedin = function(){
    return AuthFactory.isAuthenticated();
  };

  vm.logout = function(){
    AuthFactory.logout().then(function(){
      $location.path('/');
    });
  };

  vm.isActive = function(viewLocation){
    return viewLocation === $location.path();
  };

}
