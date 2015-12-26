"use strict";

import { EventEmitter } from 'events'
import WebTorrent from 'webtorrent'

import TorrentActionCreators from '../actions/TorrentActionCreators'
import ClientActionCreators from '../actions/ClientActionCreators'

function _updateClient() {
  let state = {
    downloadSpeed: this._client.downloadSpeed(),
    uploadSpeed: this._client.uploadSpeed(),
    downloadThrottle: this._client.downloadThrottle || "N/A",
    uploadThrottle: this._client.uploadThrottle || "N/A"
  }
  ClientActionCreators.update(state)
}

function _updateTorrent(torrent) {
  TorrentActionCreators.update(torrent)
}

export default new class TorrentClient extends EventEmitter {
  constructor() {
    super()
    this._client = new WebTorrent() // TODO: config
    this._reportTimer = setInterval(_updateClient.bind(this),1000)
  }
  add (magnetUri) {
    this._client.add(magnetUri, (torrent) => {
      torrent.on("ready", _updateTorrent.bind(this, torrent))
      torrent.on("download", _updateTorrent.bind(this, torrent))
      torrent.on("update", _updateTorrent.bind(this, torrent))
      torrent.on("done", _updateTorrent.bind(this, torrent))
    })
  }
  delete (infoHash) {
    this._client.remove(infoHash, () => {
      _updateTorrent.call(this, { infoHash, status: "Deleted" })
    })
  }
}
