import { createStore, applyMiddleware } from 'redux'
import torrentApp from './reducers'
import initChrome, { chromeExtension } from './middleware/chromeExtension'

const store = createStore(torrentApp, applyMiddleware(chromeExtension))
initChrome(store)
