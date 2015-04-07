'use strict';

angular.module('TweetBinsApp').controller('NavbarCtrl', NavbarCtrl);

NavbarCtrl.$inject = ['AuthFactory','$location'];

function NavbarCtrl(AuthFactory, $location){
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
