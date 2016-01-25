(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var cacheTimer = undefined;
var reportTimer = undefined;

var torrentCache = {};

function createContextMenu() {
  chrome.contextMenus.create({ "title": "Download with wtorrent", "contexts": ["link"] });
  chrome.contextMenus.onClicked.addListener(sendMagnetToApp);
}

function sendMagnetToApp(info) {
  chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", { action: "add", magnetUri: info.linkUrl });
}

function cacheState() {
  chrome.runtime.sendMessage("feghgiehmgcleidejgphkbiplfelpfih", { action: "getState" });
  cacheTimer = setTimeout(updateState, 1000);
}

function reportState() {
  Object.keys(torrentCache).forEach(function (torrentId) {
    chrome.runtime.sendMessage(torrentCache[torrentId]);
  });
  reportTimer = setTimeout(reportState, 1000);
}

function cacheAction(message) {
  torrentCache[message.data.infoHash] = message;
}

chrome.runtime.onStartup.addListener(createContextMenu);
chrome.runtime.onStartup.addListener(reportState);

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.runtime.onInstalled.addListener(reportState);

chrome.runtime.onMessageExternal.addListener(cacheAction);

},{}]},{},[1]);
