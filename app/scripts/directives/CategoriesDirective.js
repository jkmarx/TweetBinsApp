'use strict';

angular
  .module('TweetBinsApp')
  .directive('diCategories', diCategories);

function diCategories() {
  return {
    restrict: 'E',
    templateUrl: 'views/categories.html',
    scope: {
        jobs: '='
    },
    controller: 'CategoriesCtrl',
    controllerAs: 'categoriesCtrl',
    bindToController: true
  };
}
