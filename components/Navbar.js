import React from 'react'

import logo from '../public/icon/logo.svg'
import logout from '../public/icon/logout.svg'

export default function Navbar () {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <img src={logo} alt='logo' />
        </li>
        <li>
          <img src={logout} alt='logout' />
        </li>
      </ul>
    </nav>
  )
}
