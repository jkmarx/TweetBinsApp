'use strict';
angular.module('TweetBinsApp').controller('CategoriesCtrl', CategoriesCtrl);

CategoriesCtrl.$inject = ['CategoriesFactory'];

function CategoriesCtrl(CategoriesFactory){
  var vm = this;
  vm.category = CategoriesFactory.category;
  CategoriesFactory.getCategories().then(function(response){
    vm.categories = CategoriesFactory.categories;
  });

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

