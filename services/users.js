import { URL_BASE, URL_BASE_LOCAL } from './config'

function signUp (dataCredentials) {
  const URL = `${URL_BASE_LOCAL}auth/login`
  const options = {
    method: 'POST',
    body: JSON.stringify(dataCredentials),
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

function getByToken (token) {
  const URL = `${URL_BASE_LOCAL}auth/me`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

export {
  signUp,
  getByToken
}
