import React from 'react'

import NumberPicker from './NumberPicker.js'

export default function ProductSale () {
  return (
    <li className='list-group-item'>
      <div className='item-product'>
        <div className='d-flex align-items-center'>
          <img src='https://i.picsum.photos/id/1/200/300.jpg' className='rounded-circle img-fluid img-product' />
          <div className='detail-product ml-3'>
            <p className='product-name'>Azúcar</p>
            <p className='product-price-meassure'><span>$19.00</span> / 1 kg</p>
          </div>
        </div>
        <NumberPicker />
      </div>
    </li>
  )
}
