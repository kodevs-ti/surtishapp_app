import React from 'react'
import Router from 'next/router'

export default function ModalTransparent () {
  return (
    <>
      <div className='wrapper-transparent vh-100' />
      <div className='card-info child-intro'>
        <div className='text-center color-blue-primary'>
          <i className='fas fa-angle-down' />
        </div>
        <h4 className='title-principal mb-4 mt-2'>Tipo de venta</h4>
        <h4 className='title-secondary'>Cliente</h4>
        <form className='form-sale'>
          <div className='form-group'>
            <label className='label-style'>Código de Cliente</label>
            <div className='icon-inside-input'>
              <span className='icon-code' />
              <input
                type='text'
                name='name'
                className='form-control input-style'
                placeholder='039ddd2'
              />
            </div>
          </div>
          <button type='submit' className='btn-sale'>
                    Vender <i className='fas fa-arrow-right ml-2' />
          </button>
        </form>
        <div className='mt-4'>
          <label className='label-style'>General</label>
          <button onClick={() => Router.push('/sale/panel')} type='submit' className='btn-sale-general'>
                    Vender <i className='fas fa-arrow-right ml-2' />
          </button>
        </div>
      </div>
    </>
  )
}
