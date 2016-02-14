import { createStore, applyMiddleware } from 'redux'
import torrentApp from './reducers'
import initChrome, { chromeExtension } from './middleWare/chromeExtension'

const store = createStore(torrentAp, applyMiddleware(chromeExtension))
initChrome(store)
