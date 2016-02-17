"use strict";
 
import { createStore, applyMiddleware } from 'redux'
import torrentApp from './reducers'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import initChrome, { chromePopup } from './middleware/chromePopup.js'

import App from './components/App';

initChrome((initialState) => {
  const store = createStore(torrentApp, initialState, applyMiddleware(chromePopup))
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (!/index\.html$/.test(sender.url)) {
      // only dispatch incoming messages
      store.dispatch(message)
    }
  })
  render(
   <Provider store={store}>
     <App />
   </Provider>,
   document.getElementById('react-app')
  );
})

window.React = React; // export for http://fb.me/react-devtools

