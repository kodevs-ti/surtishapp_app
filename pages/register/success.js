import React from 'react'
import Router from 'next/router'
import ProductWrapper from '../../components/layout/productWrapper'
import success from '../../public/icon/success-icon.svg'

export default function Success () {
  return (
    <ProductWrapper>
      <div className='wrapper-success vh-100'>
        <div className='success-title'>
          <img src={success} alt='success' className='mb-3' />
          <p>¡Producto Registrado!</p>
        </div>
        <div className='success-text'>
          <p>El registro ha finalizado ¿Desea registrar un nuevo producto?</p>
        </div>
        <div className='success-buttons'>
          <button className='btn-new' onClick={() => Router.push('/register')}>Registrar Nuevo</button>
          <button className='btn-next mt-3' onClick={() => Router.push('/menu')}>Ir al Menú</button>
        </div>
      </div>
    </ProductWrapper>
  )
}
