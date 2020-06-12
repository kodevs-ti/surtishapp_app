import React from 'react'
import Router from 'next/router'
import ProductWrapper from '../../components/layout/productWrapper'

export default function MaxMin () {
  return (
    <ProductWrapper>
      <form className='form-product'>
        <h3 className='title-style mt-3'>Stock: Máximos y Mínimos</h3>
        <hr />
        <div>
          <p className='title-style-meassure'>¿Cuántas</p>
          <p className='title-style-meassure'>Cajas</p>
          <p className='title-style-meassure'>Deben haber en tu stock...?</p>
        </div>

        <div className='d-flex mt-4'>
          <div className='form-group mr-2'>
            <label className='label-style'>Máximo</label>
            <input
              type='number'
              name='name'
              className='form-control input-style'
              placeholder='0'
            />
          </div>
          <div className='form-group mr-2'>
            <label className='label-style'>Mínimo</label>
            <input
              type='number'
              name='detail'
              className='form-control input-style'
              placeholder='0'
            />
          </div>
          <div className='form-group'>
            <label className='label-style'>Actual</label>
            <input
              type='number'
              name='detail'
              className='form-control input-style'
              placeholder='0'
              readOnly
            />
          </div>
        </div>
        <button type='submit' className='btn-gradient mt-2 mb-5' onClick={() => Router.push('/register/profit')}>
          Siguiente <i class='fas fa-arrow-right ml-2' />
        </button>
      </form>
    </ProductWrapper>
  )
}
