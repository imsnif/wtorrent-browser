"use strict";

import TorrentAppDispatcher from '../dispatcher/TorrentAppDispatcher'
import {ActionTypes} from '../constants/TorrentConstants'

import torrentClient from '../utils/torrent-client'

export default {
  addTorrentMagnet: function (magnetUri) {
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.SUBMIT_TORRENT,
      magnetUri: magnetUri
    });
    torrentClient.add(magnetUri)
  },
  deleteTorrent: function (torrentId) {
    torrentClient.delete(torrentId)
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.DELETE_TORRENT,
      torrentId 
    });
  },
  update: function (torrent) {
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_TORRENT,
      torrent
    })
  },
};
