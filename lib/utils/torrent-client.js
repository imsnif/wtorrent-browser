"use strict";

import { EventEmitter } from 'events'

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
  this._reportTimer = setTimeout(_updateClient.bind(this),1000)
}

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
    this._client = window.torrentClient
    _updateClient.call(this)
    this._client.torrents.forEach(_listen.bind(this))
  }
  add (magnetUri) {
    this._client.add(magnetUri, _listen.bind(this))
  }
  delete (infoHash) {
    this._client.remove(infoHash, () => {
      _updateTorrent.call(this, { infoHash, status: "Deleted" })
    })
  }
}
