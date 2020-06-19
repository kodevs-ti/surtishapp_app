import React, { useState, useEffect } from 'react'

export default function NumberPicker ({ initialValue }) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleDecrementValue = () => {
    if (value === 1) {
      setValue(1)
      return
    }
    setValue(value - 1)
  }

  const handleIncreaseValue = () => {
    setValue(value + 1)
  }

  return (
    <div className='wrapper-number-picker'>
      <i className='fas fa-angle-up' onClick={handleIncreaseValue} />
      <input
        type='number'
        className='input-number-picker'
        value={value}
      />
      <i className='fas fa-angle-down' onClick={handleDecrementValue} />
    </div>
  )
}
