'use strict';

angular
.module('TweetBinsApp')
.controller('CategoryCtrl', CategoryCtrl);

CategoryCtrl.$inject = ['CategoriesFactory'];

function CategoryCtrl(CategoriesFactory){
  var vm = this;
  debugger;
  CategoriesFactory.getCategory().then(function(response){
    vm.category = CategoriesFactory.category;
    debugger;
   // console.log(vm.job);
  });
}
