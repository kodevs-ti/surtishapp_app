import React, { useState } from 'react'
import { ScanSettings } from 'scandit-sdk'

import Container from '../../components/layout/container'
import Navbar from '../../components/NavbarProduct'
import BarcodePicker from '../../components/Scanner'
import ProductSale from '../../components/ProductSale'
import Carousel from '../../components/CarruselPromo.js'
import ModalTransparent from '../../components/ModalTransparent'

export default function Panel () {
  const [barcoder, setBarcode] = useState('')

  const handleGetBarcode = (scanResult) => {
    const bar = scanResult.barcodes.reduce((string, barcode) => {
      return barcode.data
    }, '')
    setBarcode(bar)
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
              <ProductSale />
              <ProductSale />
              <ProductSale />
              <ProductSale />
              <ProductSale />
              <ProductSale />
              <ProductSale />
              <ProductSale />
              <ProductSale />
              <ProductSale />
              <ProductSale />
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
          false ? null : (
            <ModalTransparent />
          )
        }
      </div>
    </Container>
  )
}
