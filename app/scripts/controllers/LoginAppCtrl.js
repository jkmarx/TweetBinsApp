(function(){
  'use strict';

  angular
    .module('TweetBinsApp')
    .controller('LoginAppCtrl', LoginAppCtrl);

  LoginAppCtrl.$inject = ['AuthFactory','$location'];

  function LoginAppCtrl(AuthFactory,$location){
    console.log('in loginAppctrl');
    var vm = this;

    vm.login = function(credentials){
      console.log('in applogin function');
      AuthFactory.login(credentials).then(function(response){
        console.log(response);
        vm.credentials = {};
        $location.path('/');
      });
    };
  }

})();
