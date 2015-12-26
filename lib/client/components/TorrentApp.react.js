"use strict";

import React from 'react';

import MagnetSection from './MagnetSection.react.js';
import ClientSection from './ClientSection.react.js';
import TorrentSection from './TorrentSection.react.js';

Object.values = function (obj) { return Object.keys(obj).map( function (key) { return obj[key] }) }  

export default class TorrentApp extends React.Component {
  render () {
    return (
      <div className="torrents-app container">
        <MagnetSection/>
        <ClientSection/>
        <TorrentSection/>
      </div>
    );
  }
};
