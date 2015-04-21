// 'use strict';

// angular.module('TweetBinsApp').filter('tweetsAddLinks',[function(param){

//   return function(param)
//   {
//     if(param && param.length > 0){
//       var tweetArr;
//       var tweetCopy = param;
//       for(var j = 0; j < param.length; j++){
//         tweetArr = param[j].text.replace(/(\r\n|\n|\r)/gm,"").split(' ');
//         for (var i = 0; i < tweetArr.length; i++){
//           if (tweetArr[i].slice(0,7) === 'http://' || tweetArr[i].slice(0,8) === 'https://'){
//             tweetArr[i] = '<a href=' + tweetArr[i] + ' target="_blank">' + tweetArr[i] + '</a>';
//           } else if (tweetArr[i].slice(0,1) === '@'){
//             tweetArr[i] = '<a href="https://twitter.com/' + tweetArr[i].slice(1,tweetArr[i].length-1) + '" target="_blank">' + tweetArr[i] + '</a>';
//           } else if (tweetArr[i].slice(0,1) === '#'){
//             tweetArr[i] = "<a href='https://twitter.com/hashtag/" + tweetArr[i].replace(/[#]/g, '') + "?src=hash' target='_blank'>" + tweetArr[i] + "</a>";
//           }
//         }

//       tweetCopy[j].text = tweetArr.join(' ');
//       }
//       return tweetCopy;
//     }
//   };
// }]);

'use strict';

angular.module('TweetBinsApp').filter('tweetsAddLinks',[function(param){

  return function(param)
  {
    if(param && param.length > 0){
      var tweetEncoded = encodeObjectText(param);

      return tweetEncoded;
    }
  };

}]);

var strToArr = function(str){
  return(str.text.replace(/(\r\n|\n|\r)/gm,"").split(' '));
};

var encodeLinkHTML = function(str){
  return('<a href=' + str + ' target="_blank">' + str + '</a>');
};

var encodeFriendHTML = function(str){
  return('<a href="https://twitter.com/' + str.slice(1,str.length-1) + '" target="_blank">' + str + '</a>');
};

var encodeHashtagHTML = function(str){
  return("<a href='https://twitter.com/hashtag/" + str.replace(/[#]/g, '') + "?src=hash' target='_blank'>" + str + "</a>");
};


var encodeText = function(textArr){
  if (textArr.slice(0,7) === 'http://' || textArr.slice(0,8) === 'https://'){
    textArr = encodeLinkHTML(textArr);
  } else if (textArr.slice(0,1) === '@'){
    textArr = encodeFriendHTML(textArr);
  } else if (textArr.slice(0,1) === '#'){
    textArr = encodeHashtagHTML(textArr);
  }
  return textArr;
};

var encodeTextArr = function(textArr){
  for (var i = 0; i < textArr.length; i++){
      textArr[i] = encodeText(textArr[i]);
    }
  return(textArr);
};

var encodeObjectText = function(param){
  var tweetArr;
  var paramUpdate = param;

  for(var j = 0; j < param.length; j++){
    tweetArr = strToArr(param[j]);
    tweetArr = encodeTextArr(tweetArr);
    paramUpdate[j].text = tweetArr.join(' ');
  }
  return(paramUpdate);
};
