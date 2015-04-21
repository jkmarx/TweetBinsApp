'use strict';

angular
  .module('TweetBinsApp')
  .controller('UserInfoCtrl', UserInfoCtrl);

UserInfoCtrl.$inject = ['AuthFactory','$location','$scope'];

function UserInfoCtrl(AuthFactory, $location, $scope){
  console.log('in UserInfoctrl');
  var vm = this;
  vm.userInfo = AuthFactory.userInfo;

  if (!(vm.userInfo.length > 0)){
    AuthFactory.getUserInfo().then(function(response){
    vm.userInfo = AuthFactory.userInfo;
    });
  }

  var logout = function(){
    AuthFactory.logout();
  };

  vm.updateUser = function(userInfo){
    AuthFactory.upsertUser(userInfo).success(function(response){
      $location.path('/dashboard');
    }).error(function(data, status, headers, config){
      // console.log(data);
    });
  };

  vm.deleteUser = function() {
    AuthFactory.deleteUser();
    $location.path('/loginApp');
  };
}
