export function addTorrent (magnetUri) {
  return { type: 'ADD_TORRENT', magnetUri }
}

export function updateTorrent(torrent) {
  return { type: 'UPDATE_TORRENT', data: torrent }
}

export function removeTorrent(torrentId) {
  return { type: 'REMOVE_TORRENT', data: torrentId }
}

export function deleteTorrent(torrentId) {
  return { type: 'DELETE_TORRENT', data: torrentId }
}
