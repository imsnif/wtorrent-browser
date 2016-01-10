import WebTorrent from 'webtorrent'

let torrentClient = new WebTorrent({maxConns: 10})

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: "mainwin",
    innerBounds: {
      width: 680,
      height: 480
    }
  }, function(appWindow) {
    appWindow.contentWindow.torrentClient = torrentClient
  });
})
