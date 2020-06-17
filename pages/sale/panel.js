import React, { useState, useEffect } from 'react'
import { ScanSettings } from 'scandit-sdk'

import Container from '../../components/layout/container'
import Navbar from '../../components/NavbarProduct'
import BarcodePicker from '../../components/Scanner'
import ProductSale from '../../components/ProductSale'
import Carousel from '../../components/CarruselPromo.js'
import ModalTransparent from '../../components/ModalTransparent'

import { getToken } from '../../lib'
import { getByBarcode } from '../../services/products'

export default function Panel () {
  const [products, setproducts] = useState([])
  const [scanedProduct, setScanedProduct] = useState(null)

  const getAProductByBarcode = async (bar) => {
    const token = getToken()
    const response = await getByBarcode(bar, token)
    const responseJSON = await response.json()
    const { data: { product } } = responseJSON
    return product
  }

  const handleGetBarcode = (scanResult) => {
    const bar = scanResult.barcodes.reduce((string, barcode) => {
      return barcode.data
    }, '')
    getAProductByBarcode(bar)
      .then((product) => {
        setScanedProduct(product)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    console.log('UseEffect')
    if (scanedProduct) setproducts([...products, scanedProduct]) // previnir que no agregue la primera vez que se ejecuta
  }, [scanedProduct])

  const renderProducts = () => {
    const newArray = [...new Map(products.map(obj => [JSON.stringify(obj), obj])).values()]
    console.log(newArray)
    return newArray.map((product) => (<ProductSale key={product._id} product={product} />))
  }

  return (
    <Container>
      <div className='d-flex flex-column wrapper-panel vh-100'>
        <Navbar />
        <div className='header-product-register bg-curve'>
          <div className='barcode-section'>
            <BarcodePicker
              playSoundOnScan
              vibrateOnScan
              scanSettings={
                new ScanSettings({
                  enabledSymbologies: ['qr', 'ean8', 'ean13', 'upca', 'upce', 'code128', 'code39', 'code93', 'itf'],
                  codeDuplicateFilter: 1000
                })
              }
              onScan={handleGetBarcode}
              onError={error => {
                console.error(error.message)
              }}
            />
          </div>
        </div>
        <main className='mt-2'>

          <Carousel />

          <div className='list-products mt-3'>
            <ul className='list-group list-group-flush scroll'>
              {
                products ? (
                  renderProducts()
                ) : (
                  <p>No hay Products</p>
                )
              }
            </ul>
            <hr className='color-line' />
            <div className='info-sale-pay'>
              <p className='info-total-products'>Total: <span>5</span></p>
              <p className='info-total-to-pay '>$55.50</p>
              <button className='btn-pay'>Cobrar</button>
            </div>
          </div>
        </main>
        {
          true ? null : (
            <ModalTransparent />
          )
        }
      </div>
    </Container>
  )
}
