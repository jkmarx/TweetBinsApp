'use strict';

angular.module('TweetBinsApp').directive('gaNavbar',[function(){
  return{
    restrict: 'E',
    templateUrl: 'views/navbar.html',
    controller: 'NavbarCtrl',
    controllerAs: 'NavbarCtrl',
    bindToController: true,
    scope: {},
    link: function($scope, element, attrs){
      //mainpulate dom hre
    }
  };
}])
