import parseTorrent from 'parse-torrent'

const torrentMetadata = (data) => {
  const torrent = typeof data === "string" ? parseTorrent(data) : data
  return {
    infoHash      : torrent.infoHash,
    downloaded    : torrent.downloaded     || 0,
    uploaded      : torrent.uploaded       || 0,
    downloadSpeed : torrent.downloadSpeed  || 0,
    uploadSpeed   : torrent.uploadSpeed    || 0,
    progress      : torrent.progress,       
    name          : torrent.name
  }
}

const torrent = (state, action) => {
  let status
  switch (action.type) {
    case 'ADD_TORRENT':
      return Object.assign({status: "pending"}, torrentMetadata(action.magnetUri))
    case 'UPDATE_TORRENT':
      if (state.infoHash !== action.data.infoHash) return state
      status = action.data.progress === undefined ? "pending" :
        action.data.progress === 1 ? "done" : "inProgress"
      return Object.assign({status}, torrentMetadata(action.data))
    case 'REMOVE_TORRENT':
      if (state.infoHash !== action.data.infoHash) return state
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
