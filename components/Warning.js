import React from 'react'

import warning from '../public/icon/warning-icon.svg'

export default function Warning ({ content }) {
  return (
    <div className='wrapper-warning'>
      <img src={warning} alt='warning-icon' />
      <div className='warning-content'>
        <p>{content}</p>
      </div>
    </div>
  )
}
