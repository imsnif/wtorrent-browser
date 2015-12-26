"use strict";

import TorrentAppDispatcher  from '../dispatcher/TorrentAppDispatcher';
import { ActionTypes }       from '../constants/TorrentConstants';
import ClientActionCreators  from '../actions/ClientActionCreators';
import { EventEmitter }      from 'events';
import assign                from 'object-assign';

let CHANGE_EVENT = 'change';

let _clientData = {
  downloadSpeed    : 0,
  uploadSpeed      : 0,
  downloadThrottle : 0,
  uploadThrottle   : 0
};

function _handleAction (action) {
  switch(action.type) {
    case ActionTypes.UPDATE_CLIENT:
      if (action.data) {
        _clientData = action.data;
        this.emitChange();
      }
    default:
      // do nothing
  }
};

export default new class ClientStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = TorrentAppDispatcher.register(_handleAction.bind(this))
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
  getData (id) {
    return _clientData;
  }
};
