import React, { useState } from 'react'
import Router from 'next/router'

import surtishappIcon from '../../public/icon/surtishapp-icon.svg'

export default function ModalPay ({ isPay }) {
  const [isShow, setShow] = useState(isPay)
  return (
    isShow ? (
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
              <div className='resume-client-label'>
                <p>Cliente</p>
                <p>Código</p>
                <p>Total</p>
              </div>
              <div className='resume-client-value'>
                <p>General</p>
                <p>12423</p>
                <p>$55.50</p>
              </div>
            </div>
          </div>
          <form className='form-pay mt-2'>
            <div className='form-group'>
              <label className='label-style'>Efectivo</label>
              <div className='icon-inside-input'>
                <span className='icon-money' />
                <input
                  type='num'
                  name='name'
                  className='form-control input-style'
                  placeholder='100'
                />
              </div>
            </div>
            <button type='submit' className='btn-pay'>
                    Finalizar Venta
            </button>
            <button onClick={() => setShow(!isShow)} className='btn-pay-sale mt-3'>
                    Seguir Vendiendo
            </button>
          </form>
        </div>
      </>
    ) : null
  )
}
