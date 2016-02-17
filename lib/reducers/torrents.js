import parseTorrent from 'parse-torrent'

const torrentMetadata = (torrent) => {
  return {
    infoHash: torrent.infoHash,
    downloaded: torrent.downloaded,
    uploaded: torrent.uploaded,
    downloadSpeed: torrent.downloadSpeed,
    uploadSpeed: torrent.uploadSpeed,
    progress: torrent.progress,
    name: torrent.name
  }
}
const torrent = (state, action) => {
  let torrent, infoHash, name, status
  switch (action.type) {
    case 'ADD_TORRENT':
      torrent  = parseTorrent(action.magnetUri)
      infoHash = torrent.infoHash
      name     = torrent.name
      status   = "pending"
      return { infoHash, name, status }
    case 'UPDATE_TORRENT':
      if (state.infoHash !== action.data.infoHash) return state
      status = action.data.progress !== undefined ?
        action.data.progress === 1 ? 
          "done" : 
          "inProgress" :
        "pending"
      return Object.assign({status}, torrentMetadata(action.data))
    case 'REMOVE_TORRENT':
      if (state.infoHash !== action.data) return state
      return Object.assign({status: "pending"}, state)
    case 'DELETE_TORRENT':
      if (state.infoHash !== action.data) return true
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
