import { URL_BASE_LOCAL } from './config'

function create (saleData, token) {
  const URL = `${URL_BASE_LOCAL}sales`
  const options = {
    method: 'POST',
    body: JSON.stringify(saleData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

export {
  create
}
