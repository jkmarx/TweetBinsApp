'use strict';

angular.module('TweetBinsApp').factory('CategoriesFactory', ['$http', '$routeParams', '$window', 'ServerUrl', function($http,$routeParams, $window, ServerUrl){

  var categories = [];
  var category = {};

  console.log('in categoriesFactory');

  var setCategory = function(newCategory) {
    angular.copy(newCategory, category);
  };

  function getCategory() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    var categoryId = $routeParams.categoryId;
     return $http.get('http://localhost:3000/categories/' + categoryId).then(function(response) {
        //console.log(response.data);
        angular.copy(response.data, category);
      }, requestFailure);

   }

  var getCategories = function() {
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.get(ServerUrl + '/categories', config).then(function(response) {
      console.log(response.data);
      angular.copy(response.data, categories);
    }, requestFailure);
  };

  var upsertCategory = function(category) {
    var params = {
      category: category
    };
    var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    if (category.id) {
      return $http.put(ServerUrl + '/categories/' + category.id, params)
      .then(getCategories);
    } else {
      return $http.post(ServerUrl + '/categories', params)
      .then(function(response) {
        categories.push(response.data);
      }, requestFailure);
    }
  };

  var deleteCategory = function(category) {
      var data = JSON.parse($window.localStorage.getItem('tb-user'));
    var config = {
      headers: {
        'AUTHORIZATION': 'Token token=' + data.token
      }
    };
    return $http.delete(ServerUrl + '/categories/' + category.id)
    .then(function(response) {
      categories.splice(findCategoryIndexById(category.id), 1);
    });
  };

  function findCategoryIndexById(id) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
          return i;
      }
    }
  }

  function requestFailure(response){
    console.log('in requestFailure');
    console.log(response);
  }

  return {
    categories: categories,
    category: category,
    getCategories: getCategories,
    upsertCategory: upsertCategory,
    deleteCategory: deleteCategory,
    getCategory: getCategory,
    setCategory: setCategory
  };

}]);
