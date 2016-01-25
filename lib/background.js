let cacheTimer;
let reportTimer;

let torrentCache = {}

function createContextMenu() {
  chrome.contextMenus.create({"title": "Download with wtorrent", "contexts": ["link"]})
  chrome.contextMenus.onClicked.addListener(sendMagnetToApp)
}

function sendMagnetToApp(info) {
  chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", {action: "add", magnetUri: info.linkUrl})
}

function cacheState() {
  chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", {action: "getState"})
  cacheTimer = setTimeout(updateState, 1000)
}

function reportState() {
  Object.keys(torrentCache).forEach((torrentId) => {
    chrome.runtime.sendMessage(torrentCache[torrentId])
  })
  reportTimer = setTimeout(reportState, 1000)
}

function cacheAction (message) {
  torrentCache[message.data.infoHash] = message
}

chrome.runtime.onStartup.addListener(createContextMenu)
chrome.runtime.onStartup.addListener(reportState)

chrome.runtime.onInstalled.addListener(createContextMenu)
chrome.runtime.onInstalled.addListener(reportState)

chrome.runtime.onMessageExternal.addListener(cacheAction)
