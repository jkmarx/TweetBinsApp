'use strict';
angular.module('TweetBinsApp').directive('loginAppForm',[function(){
  return {
    restrict: 'E',
    templateUrl: 'views/login-app-form.html',
    controller: 'LoginAppCtrl',
    controllerAs: 'loginAppCtrl',
    bindToController: true,
    scope: {
      credentials: '='
    }
  };
}])
