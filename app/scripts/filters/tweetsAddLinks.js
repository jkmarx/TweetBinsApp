'use strict';

angular.module('TweetBinsApp').filter('tweetsAddLinks',[function(param){

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
}]);
