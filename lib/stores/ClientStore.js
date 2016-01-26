"use strict";

import TorrentAppDispatcher  from '../dispatcher/TorrentAppDispatcher';
import { ActionTypes }       from '../constants/TorrentConstants';
import ClientActionCreators  from '../actions/ClientActionCreators';
import { EventEmitter }      from 'events';

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

function setInitialState() {
  let bg = chrome.extension.getBackgroundPage()
  _clientData = bg.clientData
  this.emitChange()
}

function createAction (message) {
  if (!message.recipient === "client") return
  if (ClientActionCreators[message.action]) {
    ClientActionCreators[message.action](message.data)
  }
}

export default new class ClientStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = TorrentAppDispatcher.register(_handleAction.bind(this))
    setInitialState.call(this)
    chrome.runtime.onMessage.addListener(createAction)
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
