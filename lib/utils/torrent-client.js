"use strict";

import { EventEmitter } from 'events'

import TorrentActionCreators from '../actions/TorrentActionCreators'
import ClientActionCreators from '../actions/ClientActionCreators'

function _updateTorrent(torrent) {
  TorrentActionCreators.update(torrent)
}

function _listen(torrent) {
  torrent.on("ready", _updateTorrent.bind(this, torrent))
  torrent.on("download", _updateTorrent.bind(this, torrent))
  torrent.on("update", _updateTorrent.bind(this, torrent))
  torrent.on("done", _updateTorrent.bind(this, torrent))
}

export default new class TorrentClient extends EventEmitter {
  constructor() {
    super()
    this._client = {torrents: []}
    this._client.torrents.forEach(_listen.bind(this))
  }
  add (magnetUri) {
    chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", magnetUri)
  }
  delete (infoHash) {
    this._client.remove(infoHash, () => {
      _updateTorrent.call(this, { infoHash, status: "Deleted" })
    })
  }
}
