import React, { useState } from 'react'
import Router from 'next/router'

import logo from '../public/icon/logo.svg'
import logout from '../public/icon/logout.svg'
import warning from '../public/icon/warning-session-icon.svg'

import { deleteToken } from '../lib'

export default function Navbar () {
  const [wantLogout, setWantLogout] = useState(false)

  const handleLogOut = () => {
    deleteToken()
    Router.push('/')
  }

  return (
    <div>
      <nav className='navbar'>
        <ul>
          <li onClick={() => Router.push('/menu')}>
            <img src={logo} alt='logo' />
          </li>
          <li onClick={() => setWantLogout(true)}>
            <img src={logout} alt='logout' />
          </li>
        </ul>
      </nav>
      {
        wantLogout ? (
          <div className='wrapper-success vh-100'>
            <div className='success-title'>
              <img src={warning} alt='success' className='mb-3' />
              <p>Cerrar Sesión</p>
            </div>
            <div className='success-text'>
              <p>¿Realmente desea cerrar su sesión?</p>
            </div>
            <div className='success-buttons'>
              <button className='btn-logout' onClick={handleLogOut}>Cerrar Sesión</button>
              <button className='btn-next mt-3' onClick={() => setWantLogout(false)}>Permanecer</button>
            </div>
          </div>
        ) : null
      }

    </div>
  )
}
