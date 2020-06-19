import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'

import Container from '../../components/layout/container'
import Navbar from '../../components/NavbarProduct'
import ProductSale from '../../components/ProductSale'
import Carousel from '../../components/CarruselPromo.js'

import surtishappIcon from '../../public/icon/surtishapp-icon.svg'

import { getToken } from '../../lib'
import { getByBarcode } from '../../services/products'
import { create } from '../../services/sales'

const BarcodePicker = dynamic(() => import('../../components/Scanner'), { ssr: false })

export default function Panel () {
  const [products, setProducts] = useState([])
  const [scannedProduct, setScannedProduct] = useState(null)
  const [productsToPresent, setProductsToPresent] = useState([])
  const [priceTotal, setPriceTotal] = useState(0)
  const [isPay, setIsPay] = useState(false)
  const [moneyReceived, setMoneyReceived] = useState(0)
  const [moneyReturn, setMoneyReturn] = useState(0)
  const [classNameMoneyReceived, setClassNameMoneyReceived] = useState(null)

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
        setScannedProduct(product)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if (scannedProduct) setProducts([...products, scannedProduct]) // previnir que no agregue la primera vez que se ejecuta
  }, [scannedProduct])

  useEffect(() => {
    if (products !== 0) {
      const productsUniq = products.reduce((hash, product) => {
        const { name } = product
        const count = hash[name]
          ? hash[name] + 1
          : 1

        return {
          ...hash,
          [name]: count
        }
      }, {})

      const order = Object.entries(productsUniq).map(([key, count]) => {
        const itemData = products.find(product => product.name === key)
        return {
          name: key,
          quantityProduct: count,
          priceTotal: count * itemData.priceSuggestedByUnit,
          ...itemData
        }
      })

      const total = order.reduce((suma, order) => suma + order.priceTotal, 0)

      setProductsToPresent(order)
      setPriceTotal(total)

      renderProducts()
    }
  }, [products])

  //
  useEffect(() => {
    const classNameMoneyRece = moneyReceived < priceTotal ? 'inputErrorMoneyReceived' : null
    setClassNameMoneyReceived(classNameMoneyRece)
    setMoneyReturn(moneyReceived - priceTotal)
  }, [moneyReceived])

  const renderProducts = () => {
    return productsToPresent.map((product) => (<ProductSale key={product._id} product={product} />))
  }

  const handleChargePay = () => {
    if (productsToPresent.length !== 0) {
      setIsPay(!isPay)
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    console.log(name, value)
    setMoneyReceived(parseInt(value))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const token = getToken()
      const dataSend = { products: [...products], moneyReceived, moneyReturn, saleTotal: priceTotal }
      const response = await create(dataSend, token)
      const responseJSON = await response.json()
      console.log(responseJSON)
      const { success, data } = responseJSON
      if (success) {
        Router.push({
          pathname: '/sale/success',
          query: {
            moneyReceived,
            moneyReturn,
            priceTotal
          }
        })
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <Container>
      <div className='d-flex flex-column wrapper-panel vh-100'>
        <Navbar />
        <div className='header-product-register bg-curve'>
          <div className='barcode-section'>
            <div className='scanner'>
              <BarcodePicker
                playSoundOnScan
                vibrateOnScan
                onScan={handleGetBarcode}
                onError={error => {
                  console.error(error.message)
                }}
              />
            </div>
          </div>
        </div>
        <main className='mt-2'>

          <Carousel />

          <div className='list-products mt-3'>
            <ul className='list-group list-group-flush scroll'>
              {
                products.length !== 0 ? (
                  renderProducts()
                ) : (
                  <div className='d-flex h-100 justify-content-center align-items-center bg-gray'>
                    <p>Aún no hay Productos en la lista</p>
                  </div>
                )
              }
            </ul>
            <hr className='color-line' />
            <div className='info-sale-pay'>
              <p className='info-total-products'>Total: <span>{productsToPresent.length}</span></p>
              <p className='info-total-to-pay '>${priceTotal}</p>
              <button className='btn-pay' onClick={handleChargePay}>Cobrar</button>
            </div>
          </div>
        </main>
        {/* <ModalPay isPay={isPay} /> */}
        {
          isPay ? (
            <>
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
                    <span>Venta General</span>
                    <div className='d-flex justify-content-between w-75 mt-2'>
                      <div className='resume-client-label'>
                        <p>Total</p>
                      </div>
                      <div className='resume-client-value'>
                        <p>${priceTotal}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <form className='form-pay mt-2' onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label className='label-style'>Efectivo</label>
                    <div className='icon-inside-input'>
                      <span className='icon-money' />
                      <input
                        type='number'
                        name='moneyReceived'
                        className={`form-control input-style ${classNameMoneyReceived}`}
                        placeholder='100'
                        onChange={handleChange}
                        value={moneyReceived}
                      />
                    </div>
                    {
                      classNameMoneyReceived ? (
                        <div className='text-alert-input'>
                          <p>Saldo insuficiente</p>
                        </div>
                      ) : null
                    }
                  </div>
                  <button type='submit' className='btn-pay'>
                    Finalizar Venta
                  </button>
                  <button onClick={() => setIsPay(!isPay)} className='btn-pay-sale mt-3'>
                    Seguir Vendiendo
                  </button>
                </form>
              </div>
            </>
          ) : null
        }
      </div>
    </Container>
  )
}
