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

  backgroundColor: window.localStorage.getItem('g1b.newTab.backgroundColor'),

  backgroundColorInterval: window.localStorage.getItem('g1b.newTab.backgroundColorInterval'),

  backgroundColorIntervalId: undefined,

  brandingImage: window.localStorage.getItem('g1b.newTab.brandingImage'),

  init: function () {
    tab.setBackgroundColor(tab.backgroundColor);
    tab.setBrandingImage(tab.brandingImage);
    tab.setOmniboxListeners();
    tab.setClickListeners();
  },

  setBackgroundColor: function (color) {
    window.clearInterval(tab.backgroundColorIntervalId);
    if ( color ) {
      document.body.style.backgroundColor = color;
    } else {
      document.body.style.backgroundColor = tab.htmlColorCodes[Math.floor(Math.random() * tab.htmlColorCodes.length)];
      tab.backgroundColorIntervalId = window.setInterval(function () {
        document.body.style.backgroundColor = tab.htmlColorCodes[Math.floor(Math.random() * tab.htmlColorCodes.length)];
      }, tab.backgroundColorInterval * 60000);
    }
  },

  setBrandingImage: function (image) {
    var el = document.getElementById('branding');
    if ( image ) {
      el.src = image;
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  },

  setClickListeners: function () {
    var timeoutId;
    document.body.addEventListener('mousedown', function (e) {
      if ( e.button === 0 ) {
        timeoutId = window.setTimeout(function () {
          document.getElementById('brandingImage').value = tab.brandingImage;
          document.getElementById('backgroundColor').value = tab.backgroundColor;
          document.getElementById('backgroundColorInterval').value = tab.backgroundColorInterval;
          document.getElementById('settings').style.display = 'flex';
        }, 500);
      }
    });
    document.body.addEventListener('mouseup', function () {
      window.clearTimeout(timeoutId);
    });
    document.body.addEventListener('keyup', function (e) {
      if ( e.keyCode === 27 ) {
        document.getElementById('settings').style.display = 'none';
      }
    });
    document.getElementById('backgroundColor').addEventListener('input', function () {
      if ( !document.getElementById('backgroundColor').value ) {
        document.getElementById('backgroundColorIntervalWrapper').style.display = 'flex';
      } else {
        document.getElementById('backgroundColorIntervalWrapper').style.display = 'none';
      }
    });
    document.getElementById('btn--close').addEventListener('click', function () {
      document.getElementById('settings').style.display = 'none';
    });
    document.getElementById('btn--save').addEventListener('click', function () {
      tab.updateSettings(
        document.getElementById('brandingImage').value,
        document.getElementById('backgroundColor').value,
        document.getElementById('backgroundColorInterval').value
      );
      document.getElementById('settings').style.display = 'none';
    });
  },

  updateSettings: function (image, color, interval) {
    if ( tab.backgroundColorInterval !== interval ) {
      interval = (!interval) ? 1 : interval;
      tab.backgroundColorInterval = interval;
      window.localStorage.setItem('g1b.newTab.backgroundColorInterval', interval);
    }
    if ( tab.backgroundColor !== color ) {
      tab.backgroundColor = color;
      window.localStorage.setItem('g1b.newTab.backgroundColor', color);
      tab.setBackgroundColor(color);
    }
    if ( tab.brandingImage !== image ) {
      tab.brandingImage = image;
      window.localStorage.setItem('g1b.newTab.brandingImage', image);
      tab.setBrandingImage(image);
    }
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
