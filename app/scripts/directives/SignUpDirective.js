'use strict';
angular.module('TweetBinsApp').directive('signUpForm',[function(){
  return {
    restrict: 'E',
    templateUrl: 'views/sign-up-form.html',
    controller: 'LoginAppCtrl',
    controllerAs: 'loginAppCtrl',
    bindToController: true,
    scope: {
      credentials: '='
    }
  };
}]);
