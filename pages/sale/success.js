import React from 'react'
import Router, { useRouter } from 'next/router'

import Container from '../../components/layout/container'
import Navbar from '../../components/NavbarProduct'
import Carousel from '../../components/CarruselPromo.js'

import surtishappIcon from '../../public/icon/surtishapp-icon.svg'
import changeIcon from '../../public/icon/switch-mony-icon.svg'

export default function SuccessSale () {
  const router = useRouter()
  const {
    moneyReceived,
    moneyReturn,
    priceTotal
  } = router.query
  return (
    <Container>
      <div className='d-flex flex-column wrapper-panel vh-100'>
        <Navbar />
        <div className='header-product-register bg-curve'>
          <div className='barcode-section'>
            <div className='scanner'>
              {/* <BarcodePicker
                playSoundOnScan
                vibrateOnScan
                onScan={handleGetBarcode}
                onError={error => {
                  console.error(error.message)
                }}
              /> */}
            </div>
          </div>
        </div>
        <main className='mt-2'>

          <Carousel />

          <div className='list-products mt-3'>
            <ul className='list-group list-group-flush scroll'>

              <div className='d-flex h-100 justify-content-center align-items-center bg-gray'>
                <p>Aún no hay Productos en la lista</p>
              </div>

            </ul>
            <hr className='color-line' />
            <div className='info-sale-pay'>
              <p className='info-total-products'>Total: <span>2</span></p>
              <p className='info-total-to-pay '>$65.00</p>
              <button className='btn-pay'>Cobrar</button>
            </div>
          </div>
        </main>

        <div className='wrapper-transparent vh-100' />
        <div className='card-info child-intro'>
          <div className='text-center color-blue-primary'>
            <i className='fas fa-angle-down' />
          </div>
          <div className='resume-pay'>
            <div>
              <img src={surtishappIcon} />
            </div>
            <div className='resume-client-info'>
              <div className='d-flex justify-content-between w-75 mt-2'>
                <div className='resume-client-label'>
                  <p>Recibido</p>
                  <p>Total</p>
                </div>
                <div className='resume-client-value'>
                  <p>$ {moneyReceived}</p>
                  <p>$ {priceTotal}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <hr />
            <div className='d-flex align-items-center justify-content-between w-75'>
              <img src={changeIcon} />
              <p className='m-0 change-final-sale'>$ {parseFloat(moneyReturn).toFixed(2)}</p>
            </div>
            <button className='btn-finish mt-5' onClick={() => Router.push('/menu')}>
                    Ok
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}
