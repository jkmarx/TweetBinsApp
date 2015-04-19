'use strict';
angular.module('TweetBinsApp').controller('TweetsCtrl', TweetsCtrl).filter('tweetsAddLinks', tweetsAddLinks);

TweetsCtrl.$inject = [ '$scope','TweetsFactory', 'CategoriesFactory'];

function TweetsCtrl( $scope, TweetsFactory, CategoriesFactory){
  var vm = this;
  vm.friend = TweetsFactory.friend;
  vm.categories = CategoriesFactory.categories;
  console.log('in tweetsCtrl now!');
  TweetsFactory.getTweets().then(function(response){
    vm.tweets = TweetsFactory.tweets;
  });

  vm.upsertFriend = function(friend) {
    var friendParam = {};
    friend = JSON.parse("[" + friend + "]");
    friendParam.category_id = friend[0];
    friendParam.twitterId = friend[1];
    TweetsFactory.upsertFriend(friendParam).then(function() {
      resetForm();
    }, function(response) {
      vm.serverErrors = true;
      vm.serverErrorMsg = handleErrors(response.data);
    });
  };

  vm.editFriend = function(friend) {
    TweetsFactory.setFriend(friend);
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
    TweetsFactory.setFriend({twitterId: '', category_id: ''});
    CategoriesFactory.setCategory({name:''});
    vm.serverErrors = false;
  }
  resetForm();
}

function tweetsAddLinks(){
  return function(param)
  {
    if(param && param.length > 0){
      var tweetArr;
      var tweetCopy = param;
      for(var j = 0; j < param.length; j++){
        tweetArr = param[j].text.replace(/(\r\n|\n|\r)/gm,"").split(' ');
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

