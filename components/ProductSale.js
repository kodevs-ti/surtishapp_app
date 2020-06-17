import React, { useState } from 'react'

import NumberPicker from './NumberPicker.js'
import removeIcon from '../public/icon/remove-icon.svg'

export default function ProductSale ({ product }) {
  const { _id, image, name, detail, priceSuggestedByUnit, unitMeasureMajor } = product
  const [isPressed, setIsPressed] = useState(false)
  let nameClassPicker = ''
  let nameClassIcon = 'd-none'
  const handleClickProduct = () => {
    console.log('clicked product')
    setIsPressed(!isPressed)
    if (isPressed) {
      nameClassPicker = ''
      nameClassIcon = 'd-none'
      return
    }
    nameClassPicker = 'd-none'
    nameClassIcon = ''
  }

  return (
    <li className='list-group-item' onClick={handleClickProduct}>
      <div className='item-product'>
        <div className='d-flex align-items-center'>
          {
            image ? (
              <img src={image} className='rounded-circle img-fluid img-product' />
            ) : (
              <i className='fas fa-eye-slash rounded-circle img-fluid img-product' />
            )
          }
          <div className='detail-product ml-3'>
            <p className='product-name'>{`${name} ${detail}`}</p>
            {
              unitMeasureMajor === 'caja' ? (
                <p className='product-price-meassure'><span>${priceSuggestedByUnit}</span> / 1 pz</p>
              ) : (
                <p className='product-price-meassure'><span>${priceSuggestedByUnit}</span> / 1 kg</p>
              )
            }

          </div>
        </div>
        <div className={nameClassPicker}>
          <div className='d-flex align-items-center'>
            <NumberPicker /> {unitMeasureMajor === 'caja' ? null : (<span>gr</span>)}
          </div>
        </div>
        <img src={removeIcon} className={nameClassIcon} />
      </div>
    </li>
  )
}
