function createContextMenu() {
  chrome.contextMenus.create({"title": "Download with wtorrent", "contexts": ["link"]})
  chrome.contextMenus.onClicked.addListener(sendMagnetToApp)
}

function sendMagnetToApp(info) {
  chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", info.linkUrl)
}

chrome.runtime.onStartup.addListener(createContextMenu)
chrome.runtime.onInstalled.addListener(createContextMenu)
