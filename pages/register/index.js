import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Router from 'next/router'

// import BarcodePicker from '../../components/Scanner'
import Container from '../../components/layout/container'
import Navbar from '../../components/Navbar'

import barcodeIcon from '../../public/img/barcode.svg'
import notBarcode from '../../public/img/notBarcode.svg'

const BarcodePicker = dynamic(() => import('../../components/Scanner'), { ssr: false })

export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      barcode: ''
    }
    this.handleGetBarcode = this.handleGetBarcode.bind(this)
  }

  handleGetBarcode (scanResult) {
    let { barcode } = this.state
    barcode = scanResult.barcodes.reduce((string, barcode) => {
      return barcode.data
    }, '')
    this.setState({ barcode })
    Router.push({
      pathname: '/register/product',
      query: { barcode: barcode }
    })
  }

  render () {
    return (
      <Container>
        <div className='d-flex flex-column wrapper-register bg-img-intro '>
          <Navbar />
          <div className='bg-curve'>
            <BarcodePicker
              playSoundOnScan
              vibrateOnScan
              onScan={this.handleGetBarcode}
              onError={error => {
                console.error(error.message)
              }}
            />
          </div>

          <div className='card-info-scan child-intro'>
            <div className='text-center color-blue-primary'>
              <i className='fas fa-angle-down' />
            </div>
            <h3>Registrar Producto</h3>
            <div className='info-have-barcode'>
              <p className='info-title'>¿El producto que deseas registrar <span>tiene</span> un código de barras?</p>
              <div className='d-flex justify-content-around align-items-center'>
                <img src={barcodeIcon} alt='img' />
                <p className='info-description'>Entonces, apunta la cámara hacia el codigo de barras</p>
              </div>
            </div>
            <div className='info-have-notbarcode mt-4'>
              <p className='info-title'>Si el producto <span>no tiene</span> un código de barras...</p>
              <div className='d-flex justify-content-around align-items-center'>
                <img src={notBarcode} alt='img' />
                <p className='info-description'>No te Preocupes!! Continua con el registro</p>
              </div>
            </div>
            <div className='mt-4 mb-4'>
              <button className='btn-register' onClick={() => Router.push('/sale')}>
                    Continuar Registro <i className='fas fa-arrow-right ml-2' />
              </button>
            </div>
          </div>

          <p id='scandit-barcode-result' className='child-intro text-white' />
        </div>
      </Container>
    )
  }
}
