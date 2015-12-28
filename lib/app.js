"use strict";

 import WebTorrent from 'webtorrent'
 
 let client = new WebTorrent()
 
 client.add('magnet: ...', //TODO: ADD
   function(torrent) {
     console.log("ready!")
     torrent.on("download", function() {
        console.log("p:", torrent.progress)
      })
     console.log("torrent is;", torrent)
 })

import React from 'react';
import ReactDOM from 'react-dom';

import TorrentApp from './components/TorrentApp.react';

window.React = React; // export for http://fb.me/react-devtools

ReactDOM.render(
  <TorrentApp />,
  document.getElementById('react-app')
);
