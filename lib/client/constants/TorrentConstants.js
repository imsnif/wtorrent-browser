"use strict";

import keyMirror from 'keymirror';

module.exports = {
  ActionTypes: keyMirror({
    SUBMIT_TORRENT: null,
    ADD_TORRENT: null,
    UPDATE_CLIENT_THROTTLE: null,
    DELETE_TORRENT: null,
    UPDATE_TORRENT: null,
    UPDATE_CLIENT: null
  })
};
