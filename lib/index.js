function setToken (token) {
  sessionStorage.setItem('authToken', token)
}

function getToken () {
  return sessionStorage.getItem('authToken')
}

function deleteToken () {
  sessionStorage.removeItem('authToken')
}

export { setToken, getToken, deleteToken }
