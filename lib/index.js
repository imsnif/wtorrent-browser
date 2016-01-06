var WebTorrent = require("webtorrent")

chrome.app.window.create('index.html', {
  id: "mainwin",
  innerBounds: {
    width: 680,
    height: 480
  }
});

window.torrentClient = new WebTorrent() // TODO: find a better solution

// module.exports = new WebTorrent()
