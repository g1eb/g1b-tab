'use strict';

var tab = {

  htmlColorCodes: [
    'indianred', 'lightcoral', 'salmon', 'darksalmon', 'lightsalmon', 'crimson', 'red', 'firebrick', 'darkred',
    'pink', 'lightpink', 'hotpink', 'deeppink', 'mediumvioletred', 'palevioletred',
    'lightsalmon', 'coral', 'tomato', 'orangered', 'darkorange', 'orange',
    'gold', 'yellow', 'lightyellow', 'lemonchiffon', 'lightgoldenrodyellow', 'papayawhip', 'moccasin', 'peachpuff', 'palegoldenrod', 'khaki', 'darkkhaki',
    'lavender', 'thistle', 'plum', 'violet', 'orchid', 'fuchsia', 'magenta', 'mediumorchid', 'mediumpurple', 'rebeccapurple', 'blueviolet', 'darkviolet',
    'darkorchid', 'darkmagenta', 'purple', 'indigo', 'slateblue', 'darkslateblue', 'mediumslateblue',
    'greenyellow', 'chartreuse', 'lawngreen', 'lime', 'limegreen', 'palegreen', 'lightgreen', 'mediumspringgreen', 'springgreen', 'mediumseagreen',
    'seagreen', 'forestgreen', 'green', 'darkgreen', 'yellowgreen', 'olivedrab', 'olive', 'darkolivegreen',
    'mediumaquamarine', 'darkseagreen', 'lightseagreen', 'darkcyan', 'teal',
    'aqua', 'cyan', 'lightcyan', 'paleturquoise', 'aquamarine', 'turquoise', 'mediumturquoise', 'darkturquoise', 'cadetblue',
    'steelblue', 'lightsteelblue', 'powderblue', 'lightblue', 'skyblue', 'lightskyblue', 'deepskyblue', 'dodgerblue', 'cornflowerblue',
    'mediumslateblue', 'royalblue', 'blue', 'mediumblue', 'darkblue', 'navy', 'midnightblue',
    'cornsilk', 'blanchedalmond', 'bisque', 'navajowhite', 'wheat', 'burlywood', 'tan', 'rosybrown', 'sandybrown',
    'goldenrod', 'darkgoldenrod', 'peru', 'chocolate', 'saddlebrown', 'sienna', 'brown', 'maroon',
    'white', 'snow', 'honeydew', 'mintcream', 'azure', 'aliceblue', 'ghostwhite', 'whitesmoke', 'seashell',
    'beige', 'oldlace', 'floralwhite', 'ivory', 'antiquewhite', 'linen', 'lavenderblush', 'mistyrose',
    'gainsboro', 'lightgray', 'silver', 'darkgray', 'gray', 'dimgray', 'lightslategray', 'slategray', 'darkslategray', 'black',
  ],

  backgroundColor: window.localStorage.getItem('backgroundColor'),

  backgroundColorInterval: 60000,

  init: function () {

    if ( tab.backgroundColor ) {
      tab.setBackgroundColor(tab.backgroundColor);
    } else {
      tab.setBackgroundColor(tab.htmlColorCodes[Math.floor(Math.random() * tab.htmlColorCodes.length)]);
      window.setInterval(function () {
        tab.setBackgroundColor(tab.htmlColorCodes[Math.floor(Math.random() * tab.htmlColorCodes.length)]);
      }, tab.backgroundColorInterval);
    }

    tab.setOmniboxListeners();
  },

  setBackgroundColor: function (color) {
    document.body.style.backgroundColor = color;
  },

  setOmniboxListeners: function () {
    chrome.omnibox.onInputChanged.addListener(function (q) {
      var el = document.createElement('span');
      document.body.appendChild(el);
      var updateElement = function(q) {
        var offset = Math.floor(Math.random() * 50);
        var duration = Math.floor(Math.random() * 10);
        var size = 15 + 10 - duration;
        el.innerHTML = '<span style="right:'+offset+'vw; font-size: '+size+'px; animation-duration:'+duration+'s">'+q.slice(-1)+'</span>';
        setTimeout(function () {
          updateElement(q);
        }, duration * 1000);
      };
      updateElement(q);
    });

    chrome.omnibox.onInputEntered.addListener(function (q) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: 'https://google.com/search?q='+q});
      });
    });
  },

};

document.addEventListener('DOMContentLoaded', tab.init);
