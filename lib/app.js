"use strict";
 
import React from 'react';
import ReactDOM from 'react-dom';

import TorrentApp from './components/TorrentApp.react';

window.React = React; // export for http://fb.me/react-devtools

ReactDOM.render(
 <TorrentApp />,
 document.getElementById('react-app')
);
