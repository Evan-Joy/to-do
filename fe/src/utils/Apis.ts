const Apis = {
  API_HOST: String(process.env.REACT_APP_API_END_POINT),
  API_TAILER: {
    AUTH: {
      ROOT: '/auth'
    },
    TODO: {
      ROOT: '/to-do'
    }
  }
}

export default Apis;