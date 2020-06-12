import React from 'react'
import Router from 'next/router'
import ProductWrapper from '../../components/layout/productWrapper'
import Warning from '../../components/Warning'

export default function Stock () {
  return (
    <ProductWrapper>
      <form className='form-product'>
        <h3 className='title-style mt-3'>Ganancias</h3>
        <hr />
        <p className='title-style-sec'>Ganancia por cada</p>
        <div>
          <p className='title-style-meassure'>Pieza</p>
          <Warning content='Recuerda calcular tus ganancias por cada PIEZA' />
        </div>

        <div className='d-flex mt-4'>
          <div className='form-group mr-2'>
            <label className='label-style'>Precio Compra</label>
            <input
              type='number'
              name='name'
              className='form-control input-style'
              placeholder='0'
            />
          </div>
          <div className='form-group mr-2'>
            <label className='label-style'>% de Ganancia</label>
            <input
              type='number'
              name='detail'
              className='form-control input-style'
              placeholder='0'
            />
          </div>
          <div className='form-group'>
            <label className='label-style'>Precio Sug.</label>
            <input
              type='number'
              name='detail'
              className='form-control input-style'
              placeholder='0'
              readOnly
            />
          </div>
        </div>
        <div className='wrapper-profit mb-2'>
          <p>Ganancia de <span>$1.50</span></p>
          <p>por cada <span>pieza</span></p>
        </div>
        <button className='btn-gradient mt-2 mb-5' onClick={() => Router.push('/register/success')}>
          Finalizar <i className='fas fa-arrow-right ml-2' />
        </button>
      </form>
    </ProductWrapper>
  )
}
