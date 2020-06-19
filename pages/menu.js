import react, { useState, useEffect } from 'react'
import Router from 'next/router'

import Container from '../components/layout/container'
import Navbar from '../components/Navbar'

import profile from '../public/img/profile.svg'

import { getByToken } from '../services/users'
import { getToken } from '../lib'

export default function Menu () {
  const [userCurrent, setUserCurrent] = useState({
    store: { name: '' },
    role: '',
    firstName: '',
    lastName: ''
  })

  const fetchData = async () => {
    const token = getToken()
    const response = await getByToken(token)
    const responseJSON = await response.json()
    const { success, data } = responseJSON
    if (success) {
      setUserCurrent(data.user)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const { store: { name: storeName }, role, firstName, lastName } = userCurrent
  return (
    <Container>
      <div className='d-flex flex-column menu-wrapper'>
        <Navbar />
        <div className='bg-curve'>
          <div className='info-profile-wrapper'>
            <p className='profile-store'>{storeName}</p>
            <img className='mb-2' src={profile} />
            <div>
              <p className='text profile-name'>{`${firstName} ${lastName}`}</p>
              <p className='text profile-role'>{role === 'administrator' ? 'Administrador' : 'Vendedor'}</p>
            </div>
          </div>
        </div>
        <div className='buttons-wrapper'>
          <button onClick={() => Router.push('/sale')} className='btn-menu sale'>
            <div className='icon sale-icon' />
              Vender
          </button>
          {
            role === 'seller' ? null : (
              <button onClick={() => Router.push('/register')} className='btn-menu register'>
                <span className='icon scan-icon' />
              Registrar producto
              </button>
            )
          }

          <button onClick={() => Router.push('/menu')} className='btn-menu register'>
            <span className='icon devolution-icon' />
              Devoluciones
          </button>
        </div>
      </div>
    </Container>
  )
}
