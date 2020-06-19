import React, { useState } from 'react'

import NumberPicker from './NumberPicker.js'
import removeIcon from '../public/icon/remove-icon.svg'

export default function ProductSale ({ product }) {
  const { image, name, detail, priceSuggestedByUnit, unitMeasureMajor, priceTotal, quantityProduct } = product

  return (
    <li className='list-group-item'>
      <div className='item-product'>
        <div className='d-flex align-items-center'>
          {
            image ? (
              <img src={image} className='rounded-circle img-fluid img-product' />
            ) : (
              <i className='fas fa-eye-slash rounded-circle img-fluid img-product d-flex align-items-center justify-content-center' />
            )
          }
          <div className='detail-product'>
            <p className='product-name'>{name} <br /> {detail}</p>
            {
              unitMeasureMajor === 'caja' ? (
                <p className='product-price-meassure'><span>${priceSuggestedByUnit}</span> / 1 pz</p>
              ) : (
                <p className='product-price-meassure'><span>${priceSuggestedByUnit}</span> / 1 kg</p>
              )
            }
          </div>
        </div>
        <div className='d-flex align-items-center'>
          <NumberPicker initialValue={quantityProduct} /> {unitMeasureMajor === 'caja' ? null : (<span>gr</span>)}
        </div>
        <span className='price-total-product'><span className='multi-icon'>&#x2613;</span>  &#x2060; &#x2060; ${priceTotal}</span>
        <img src={removeIcon} className='size-img' />
      </div>
    </li>
  )
}
