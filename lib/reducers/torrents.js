import parseTorrent from 'parse-torrent'

const torrent = (state, action) => {
  switch (action.type) {
    case 'ADD_TORRENT':
      const infoHash = parseTorrent(action.magnetUri.infoHash)
      return { infoHash }
    case 'UPDATE_TORRENT':
      if (state.infoHash !== action.infoHash) return state
      const status = action.data.progress === 1 ? "done" : "inProgress"
      return Object.assign({status}, action.data)
    case 'REMOVE_TORRENT':
      if (state.infoHash !== action.infoHash) return state
      return Object.assign({status: "pending"}, action.data)
    case 'DELETE_TORRENT':
      if (state.infoHash !== action.infoHash) return true
      return false
    default:
      return state
  }
}
    
const torrents = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TORRENT':
      return [
        ...state,
        torrent(undefined, action)
      ]
    case 'UPDATE_TORRENT':
      return state.map(t =>
        torrent(t, action)
      )
    case 'REMOVE_TORRENT':
      return state.map(t =>
        torrent(t, action)
      )
    case 'DELETE_TORRENT':
      return state.filter(t =>
        torrent(t, action)
      )
    default:
      return state
  }
}

export default torrents
