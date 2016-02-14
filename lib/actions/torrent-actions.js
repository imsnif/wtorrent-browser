export function addTorrent (magnetUri) {
  return { type: 'ADD_TORRENT', magnetUri }
}

export function updateTorrent(torrent) {
  return { type: 'UPDATE_TORRENT', data: torrent }
}

export function removeTorrent(torrent) {
  return { type: 'REMOVE_TORRENT', data: torrent }
}

export function deleteTorrent(torrent) {
  return { type: 'DELETE_TORRENT', data: torrent }
}
