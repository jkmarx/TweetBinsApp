'use strict';
angular.module('TweetBinsApp').controller('CategoriesCtrl', CategoriesCtrl);

CategoriesCtrl.$inject = ['$scope','$location','CategoriesFactory','$routeParams'];

function CategoriesCtrl($scope, $location, CategoriesFactory, $routeParams){
  var vm = this;
  vm.category = CategoriesFactory.category;
  $scope.category = vm.category;

  if ($routeParams.categoryId && !(vm.category.length > 0)){
    CategoriesFactory.getCategory().then(function(response){
      vm.category = CategoriesFactory.category;
    });
  }

  vm.categories = CategoriesFactory.categories;
  $scope.categories = vm.categories;

  if (vm.categories && !(vm.categories.length > 0)){
    CategoriesFactory.getCategories().then(function(response){
      vm.categories = CategoriesFactory.categories;
    });
  }

  vm.upsertCategory = function(category) {
    CategoriesFactory.upsertCategory(category)
    .then(function() {
      CategoriesFactory.getCategories();

      if(!category.id){
       resetForm();
      }

    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.editCategory = function(category) {
    CategoriesFactory.setCategory(category);
  };

  vm.deleteCategory = function(category) {
    CategoriesFactory.deleteCategory(category);
    $location.path('/tweets');
    CategoriesFactory.getCategories();
  };

  vm.cancel = function() {
    resetForm();
  };

  function handleErrors(errObj) {
    var errString = '';
    angular.forEach(errObj, function(value, key) {
        errString += key + ': ' + value;
    });
    return errString;
  }

  function resetForm() {
    CategoriesFactory.setCategory({name: ''});
    vm.serverErrors = false;
  }
}



