(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var reportTimer = undefined;

window.torrentCache = {};
window.clientData = {
  downloadSpeed: 0,
  uploadSpeed: 0,
  downloadThrottle: 0,
  uploadThrottle: 0
};

function createContextMenu() {
  chrome.contextMenus.create({ "title": "Download with wtorrent", "contexts": ["link"] });
  chrome.contextMenus.onClicked.addListener(sendMagnetToApp);
}

function sendMagnetToApp(info) {
  chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", { action: "add", magnetUri: info.linkUrl });
}

function reportClientState() {
  var recipient = "client";
  var action = "update";
  var data = window.clientData;
  chrome.runtime.sendMessage({ recipient: recipient, action: action, data: data });
}

function reportState() {
  Object.keys(window.torrentCache).forEach(function (torrentId) {
    chrome.runtime.sendMessage(window.torrentCache[torrentId]);
  });
  reportClientState();
  reportTimer = setTimeout(reportState, 1000);
}

function cacheAction(message) {
  if (message.recipient === "torrent") {
    window.torrentCache[message.data.infoHash] = message;
  } else if (message.recipient === "client" && message.action === "update") {
    window.clientData = message.data;
  }
}

chrome.runtime.onStartup.addListener(createContextMenu);
chrome.runtime.onStartup.addListener(reportState);

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.runtime.onInstalled.addListener(reportState);

chrome.runtime.onMessageExternal.addListener(cacheAction);

},{}]},{},[1]);
