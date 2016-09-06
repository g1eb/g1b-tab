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
