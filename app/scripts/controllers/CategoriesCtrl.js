'use strict';
angular.module('TweetBinsApp').controller('CategoriesCtrl', CategoriesCtrl);

CategoriesCtrl.$inject = ['$scope','CategoriesFactory'];

function CategoriesCtrl($scope, CategoriesFactory){
  var vm = this;
  vm.category = CategoriesFactory.category;
  $scope.category = vm.category

  vm.categories = CategoriesFactory.categories;
  $scope.categories = vm.categories;

  if (!(vm.categories.length > 0)){
    CategoriesFactory.getCategories().then(function(response){
      vm.categories = CategoriesFactory.categories;
    });
  };

  vm.upsertCategory = function(category) {
    CategoriesFactory.upsertCategory(category)
    .then(function() {
      resetForm();
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
  resetForm();
}

