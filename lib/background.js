let reportTimer;

window.torrentCache = {}
window.clientData = {
  downloadSpeed    : 0,
  uploadSpeed      : 0,
  downloadThrottle : 0,
  uploadThrottle   : 0
}

function createContextMenu() {
  chrome.contextMenus.create({"title": "Download with wtorrent", "contexts": ["link"]})
  chrome.contextMenus.onClicked.addListener(sendMagnetToApp)
}

function sendMagnetToApp(info) {
  chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", {action: "add", magnetUri: info.linkUrl})
}

function reportClientState () {
  let recipient = "client"
  let action = "update"
  let data = window.clientData
  chrome.runtime.sendMessage({recipient, action, data})
}

function reportState() {
  Object.keys(window.torrentCache).forEach((torrentId) => {
    chrome.runtime.sendMessage(window.torrentCache[torrentId])
  })
  reportClientState()
  reportTimer = setTimeout(reportState, 1000)
}

function cacheAction (message) {
  if (message.recipient === "torrent") {
    window.torrentCache[message.data.infoHash] = message
  } else if (message.recipient === "client" && message.action === "update") {
    window.clientData = message.data
  }
}

chrome.runtime.onStartup.addListener(createContextMenu)
chrome.runtime.onStartup.addListener(reportState)

chrome.runtime.onInstalled.addListener(createContextMenu)
chrome.runtime.onInstalled.addListener(reportState)

chrome.runtime.onMessageExternal.addListener(cacheAction)
