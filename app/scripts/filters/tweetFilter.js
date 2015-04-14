// 'use strict';

// App.addLinks = function(text){
//   var textAr = text.split(' ');
//   for (var i = 0; i < textAr.length; i++){
//     if (textAr[i].slice(0,7) === 'http://' || textAr[i].slice(0,8) === 'https://'){
//       textAr[i] = '<a href=' + textAr[i] + ' target="_blank">' + textAr[i] + '</a>';
//     } else if (textAr[i].slice(0,1) === '@'){
//       textAr[i] = '<a href="https://twitter.com/' + textAr[i] + '" target="_blank">' + textAr[i] + '</a>';
//     } else if (textAr[i].slice(0,1) === '#'){
//       textAr[i] = "<a href='https://twitter.com/hashtag/" + textAr[i].replace(/[#]/g, '') + "?src=hash' target='_blank'>" + textAr[i] + "</a>";
//     }
//   }
//   return textAr.join(' ');
// };
