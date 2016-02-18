require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({3:[function(require,module,exports){
'use strict';

var _redux = require('redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _chromeExtension = require('./middleware/chromeExtension');

var _chromeExtension2 = _interopRequireDefault(_chromeExtension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_chromeExtension.chromeExtension));
(0, _chromeExtension2.default)(store);

},{"./middleware/chromeExtension":13,"./reducers":16,"redux":474}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chromeExtension = chromeExtension;

exports.default = function (store) {
  chrome.contextMenus.create({ "title": "Downlaod with wtorrent", "contexts": ["link"] });
  chrome.contextMenus.onClicked.addListener(function (info) {
    store.dispatch((0, _torrentActions.addTorrent)(info.linkUrl));
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message === "getState") return sendResponse(store.getState());
    store.dispatch(message);
  });
  chrome.runtime.onMessageExternal.addListener(function (message, sender) {
    if (sender.id === "feghgiehmgcleidejgphkbiplfelpfih") {
      store.dispatch(message);
      chrome.runtime.sendMessage(message);
    }
  });
};

var _torrentActions = require("../actions/torrent-actions");

function chromeExtension(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case "ADD_TORRENT":
        case "REMOVE_TORRENT":
          chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", action);
      }
      var result = next(action);
      return result;
    };
  };
}

},{"../actions/torrent-actions":1}]},{},[3]);
