import { addTorrent } from '../actions/torrent-actions'

export function chromeExtension (store) {
  return next => action => {
    switch (action.type) {
      case "ADD_TORRENT":
      case "REMOVE_TORRENT":
        chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", action)
    }
    const result = next(action)
    return result
  }
}

export default function (store) {
  chrome.contextMenus.create({"title": "Downlaod with wtorrent", "contexts": ["link"]})
  chrome.contextMenus.onClicked.addListener((info) => {
    store.dispatch(addTorrent(info.linkUrl))
  })

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getState") return sendResponse(store.getState())
    store.dispatch(message)
  })
  chrome.runtime.onMessageExternal.addListener((message, sender) => {
    if (sender.id === "feghgiehmgcleidejgphkbiplfelpfih") {
      store.dispatch(message)
      chrome.runtime.sendMessage(message)
    }
  })
}
