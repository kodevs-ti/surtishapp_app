import React from 'react'
import Router from 'next/router'
import ProductWrapper from '../../components/layout/productWrapper'
import Warning from '../../components/Warning'

export default function Stock () {
  return (
    <ProductWrapper>
      <form className='form-product'>
        <h3 className='title-style mt-3'>En Stock</h3>
        <hr />
        <p className='title-style-sec'>Stock Actual por cada</p>
        <div>
          <p className='title-style-meassure'>Caja</p>
          <Warning content='Recuerda ingresar en la cantidad, el numero de CAJAS en que el producto es comprado' />
        </div>

        <div className='d-flex mt-4'>
          <div className='form-group mr-2'>
            <label className='label-style'>Cantidad</label>
            <input
              type='number'
              name='name'
              className='form-control input-style'
              placeholder='0'
            />
          </div>
          <div className='form-group mr-2'>
            <label className='label-style'>Pieza/Caja</label>
            <input
              type='number'
              name='detail'
              className='form-control input-style'
              placeholder='0'
            />
          </div>
          <div className='form-group'>
            <label className='label-style'>Pzs totales</label>
            <input
              type='number'
              name='detail'
              className='form-control input-style'
              placeholder='0'
              readOnly
            />
          </div>
        </div>
        <button className='btn-gradient mt-2 mb-5'>
          Siguiente <i className='fas fa-arrow-right ml-2' />
        </button>
      </form>
    </ProductWrapper>
  )
}
