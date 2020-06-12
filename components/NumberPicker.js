import React from 'react'

export default function NumberPicker () {
  return (
    <div className='wrapper-number-picker'>
      <i class='fas fa-angle-up' />
      <input
        type='number'
        className='input-number-picker'
        value='32'
      />
      <i class='fas fa-angle-down' />
    </div>
  )
}
