"use strict";

import TorrentAppDispatcher from '../dispatcher/TorrentAppDispatcher';
import {ActionTypes} from '../constants/TorrentConstants';

import torrentClient from '../utils/torrent-client'

export default {
  updateThrottleUpload: function (value) {
    if (value !== "undefined") {
      torrentClient.updateThrottleUpload(value)
    }
  },
  updateThrottleDownload: function (value) {
    if (value !== "undefined") {
      torrentClient.updateThrottleDownload(value)
    }
  },
  update: function(data) {
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_CLIENT,
      data 
    })
  }
};
