"use strict";

import TorrentAppDispatcher  from '../dispatcher/TorrentAppDispatcher'
import {ActionTypes }        from '../constants/TorrentConstants'
import TorrentActionCreators from '../actions/TorrentActionCreators'
import { EventEmitter }      from 'events'
import assign                from 'object-assign'
import parseTorrent          from 'parse-torrent'

let CHANGE_EVENT = 'change';

let _torrents = {};

function _handleAction (action) {
  switch(action.type) {
    case ActionTypes.SUBMIT_TORRENT:
      if (action.magnetUri) {
        let torrentData = parseTorrent(action.magnetUri)
        if (!_torrents[torrentData.infoHash]) { // TODO: add indication to the user
          _torrents[torrentData.infoHash] = { 
            status: "pending", 
            name: torrentData.dn || "???",
            infoHash: torrentData.infoHash
          }
          this.emitChange()
        }
      }
      break;
    case ActionTypes.DELETE_TORRENT:
      _torrents[action.torrentId].status = "pending"
      this.emitChange()
      break;
    case ActionTypes.UPDATE_TORRENT:
      let torrent = action.torrent
      if (torrent) {
        if (torrent.status && torrent.status === "Deleted") {
          delete _torrents[torrent.infoHash];
        } else {
          _torrents[torrent.infoHash] = torrent;
        }
      }
    default:
      // do nothing
  }
}

function _periodicUpdate() {
  this.emitChange()
  this.timer = setTimeout(_periodicUpdate.bind(this), 1000)
}

export default new class TorrentStore extends EventEmitter {
  constructor() {
    super()
    this.dispatchToken = TorrentAppDispatcher.register(_handleAction.bind(this))
    _periodicUpdate.call(this)
  }
  emitChange () {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  get (id) {
    return _torrents[id];
  }
  getAll () {
    return _torrents;
  }
};
