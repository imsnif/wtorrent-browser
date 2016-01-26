"use strict";

import React from 'react';

import TorrentSection from './TorrentSection.react.js';
import ClientSection  from './ClientSection.react.js';

Object.values = function (obj) { return Object.keys(obj).map( function (key) { return obj[key] }) }  

export default class TorrentApp extends React.Component {
  render () {
    return (
      <div className="torrents-app">
        <TorrentSection/>
        <ClientSection/>
      </div>
    );
  }
};
