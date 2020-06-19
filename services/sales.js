import { URL_BASE } from './config'

function create (saleData, token) {
  const URL = `${URL_BASE}sales`
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
