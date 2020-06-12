import React from 'react'

import logo from '../public/icon/logo.svg'
import search from '../public/icon/search-icon.svg'

export default function Navbar () {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <img src={logo} alt='logo' />
        </li>
        <li>
          <img src={search} alt='logout' />
        </li>
      </ul>
    </nav>
  )
}
