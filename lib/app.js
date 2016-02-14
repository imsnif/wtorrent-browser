"use strict";
 
import { createStore, applyMiddleware } from 'redux'
import torrentApp from './reducers'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import App from './components/App';

chrome.runtime.sendMessage("getState", (initialState) => {
  console.log("got initial state:", initialState)
  const store = createStore(torrentApp, initialState)
  render(
   <Provider store={store}>
     <App />
   </Provider>,
   document.getElementById('react-app')
  );
})

window.React = React; // export for http://fb.me/react-devtools

