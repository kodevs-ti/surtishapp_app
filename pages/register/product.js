import React from 'react'
import Router from 'next/router'
import ProductWrapper from '../../components/layout/productWrapper'
import Warning from '../../components/Warning'

export default function Product () {
  return (
    <ProductWrapper>
      <form className='form-product'>
        <h3 className='title-style mt-3'>Nuevo Producto</h3>
        <hr />
        <div className='form-group'>
          <label className='label-style'>Nombre del producto</label>
          <input
            type='text'
            name='name'
            className='form-control input-style'
            placeholder='Café'
          />
        </div>
        <div className='form-group'>
          <label className='label-style'>Detalle del Producto</label>
          <input
            type='text'
            name='detail'
            className='form-control input-style'
            placeholder='Café'
          />
        </div>
        <div className='form-group'>
          <label className='label-style mb-3'>Unidad de Medida</label>
          <Warning content='Recuerda seleccionar la unidad más grande en la que el producto es comprado' />
          <select
            className='form-control select-style mt-3'
            name='unitMeasureMajor'
          >
            <option>Selecciona una unidad</option>
            <option>pieza</option>
            <option>bulto</option>
            <option>caja</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='label-style'>Fecha de Expiración</label>
          <input
            type='date'
            class='form-control input-style'
          />
        </div>
        <button className='btn-gradient mt-2 mb-5' onClick={() => Router.push('/register/stock')}>
          Siguiente <i class='fas fa-arrow-right ml-2' />
        </button>
      </form>
    </ProductWrapper>
  )
}
