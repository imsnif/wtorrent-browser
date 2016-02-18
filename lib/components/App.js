"use strict";

import { Component } from 'react';

import TorrentSection from '../containers/TorrentSection.js';
import ClientSection  from '../containers/ClientSection.js';

Object.values = function (obj) { return Object.keys(obj).map( function (key) { return obj[key] }) }  

export default class TorrentApp extends Component {
  render () {
    return (
      <div className="torrents-app">
        <TorrentSection/>
        <ClientSection/>
      </div>
    );
  }
};
