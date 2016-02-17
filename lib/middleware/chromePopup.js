import { removeTorrent } from '../actions/torrent-actions'

export function chromePopup (store) {
  return next => action => {
    switch (action.type) {
      case "REMOVE_TORRENT":
        chrome.runtime.sendMessage(action)
    }
    const result = next(action)
    return result
  }
}

export default function (cb) {
  chrome.runtime.sendMessage("getState", cb)
}
