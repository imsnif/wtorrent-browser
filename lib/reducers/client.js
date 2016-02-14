const initialState = {
  downloadSpeed: 0,
  uploadSpeed: 0
}

const client = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CLIENT':
      return {
        downloadSpeed: action.downloadSpeed,
        uploadSpeed: action.uploadSpeed
      }
    default:
      return state
  }
}

export default client
