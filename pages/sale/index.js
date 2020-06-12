import React from 'react'
import Router from 'next/router'
import Container from '../../components/layout/container'
import Navbar from '../../components/Navbar'

import profile from '../../public/img/profile.svg'

export default function Sale () {
  return (
    <Container>
      <div className='d-flex flex-column sale-wrapper'>
        <Navbar />
        <div className='bg-curve'>
          <div className='info-profile-wrapper'>
            <p className='profile-store'>Nombre Negocio</p>
            <img className='mb-2' src={profile} />
            <div>
              <p className='text profile-name'>John Doe</p>
              <p className='text profile-role'>Administrador</p>
            </div>
          </div>
        </div>
        <div className='wrapper-transparent vh-100' />
        <div className='card-info-sale child-intro'>
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
      </div>
    </Container>
  )
}
