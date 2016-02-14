import { combineReducers } from 'redux'
import torrents from './torrents'
import client from './client'

const torrentApp = combineReducers({
  torrents,
  client
})

export default torrentApp
