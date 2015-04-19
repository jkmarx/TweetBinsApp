'use strict';
angular.module('TweetBinsApp').controller('CategoriesCtrl', CategoriesCtrl).filter('tweetsFilter',tweetsFilter).filter('tweetsAddLinks',tweetsAddLinks);

CategoriesCtrl.$inject = ['$scope','$location','CategoriesFactory'];

function CategoriesCtrl($scope, $location, CategoriesFactory){
  var vm = this;
  vm.category = CategoriesFactory.category;
  $scope.category = vm.category;

  if (vm.category && !(vm.category.length > 0)){
    CategoriesFactory.getCategory().then(function(response){
      vm.category = CategoriesFactory.category;
      // $scope.category = vm.category;
   // console.log(vm.job);
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
      };

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

function tweetsFilter(){
return function(param, scope){
  var filteredTweets = [];
  var categoryFriendsId = [];

  if(scope.category){
    var categoryFriends = scope.category.friends;
    for (var j = 0; j < categoryFriends.length; j++){
      categoryFriendsId.push(categoryFriends[j].twitterId);
    }
  }

  if(param){
    for(var i = 0; i < param.length; i++){
      var friendId = param[i].userId.toString();
      var foundIndex = categoryFriendsId.indexOf(friendId);
      if (foundIndex > -1){
        filteredTweets.push(param[i]);
      }
    }
  }
  return filteredTweets;
};
}

function tweetsAddLinks(){
  return function(param)
  {
    if(param && param.length > 0){
      var tweetArr;
      var tweetCopy = param;
      for(var j = 0; j < param.length; j++){
        tweetArr = param[j].text.split(' ');
        for (var i = 0; i < tweetArr.length; i++){
          if (tweetArr[i].slice(0,7) === 'http://' || tweetArr[i].slice(0,8) === 'https://'){
            tweetArr[i] = '<a href=' + tweetArr[i] + ' target="_blank">' + tweetArr[i] + '</a>';
          } else if (tweetArr[i].slice(0,1) === '@'){
            tweetArr[i] = '<a href="https://twitter.com/' + tweetArr[i].slice(1,tweetArr[i].length-1) + '" target="_blank">' + tweetArr[i] + '</a>';
          } else if (tweetArr[i].slice(0,1) === '#'){
            tweetArr[i] = "<a href='https://twitter.com/hashtag/" + tweetArr[i].replace(/[#]/g, '') + "?src=hash' target='_blank'>" + tweetArr[i] + "</a>";
          }
        }

      tweetCopy[j].text = tweetArr.join(' ');
      }
      return tweetCopy;
    }
  };
}


