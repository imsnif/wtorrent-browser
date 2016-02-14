export function updateClient(data) {
  return { 
    type: 'UPDATE_CLIENT', 
    downloadSpeed: data.downloadSpeed,
    uploadSpeed: data.uploadSpeed
  }
}
