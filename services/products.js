import { URL_BASE } from './config'

function create (productoData, token) {
  const URL = `${URL_BASE}products`
  const options = {
    method: 'POST',
    body: JSON.stringify(productoData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

function getById (id, token) {
  const URL = `${URL_BASE}products/${id}`
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

function updateById (id, newData, token) {
  const URL = `${URL_BASE}products/${id}`
  const options = {
    method: 'PATCH',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

function getByBarcode (barcode, token) {
  const URL = `${URL_BASE}products/${barcode}/barcode`
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
  create,
  getById,
  updateById,
  getByBarcode
}
