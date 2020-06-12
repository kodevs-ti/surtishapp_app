import Router from 'next/router'

import Container from '../components/Layout/container'
import Navbar from '../components/Navbar'

import profile from '../public/img/profile.svg'

export default function Menu () {
  return (
    <Container>
      <div className='d-flex flex-column menu-wrapper'>
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
        <div className='buttons-wrapper'>
          <button onClick={() => Router.push('/sale')} className='btn-menu sale'>
            <div className='icon sale-icon' />
              Vender
          </button>
          <button onClick={() => Router.push('/register')} className='btn-menu register'>
            <span className='icon scan-icon' />
              Registrar producto
          </button>
        </div>
      </div>
    </Container>
  )
}
