import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import product from '../public/img/product-1.png'
export default function CarrucelPromo () {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className='wrapper-promotion mx-auto'>
          <img src={product} className='rounded-circle img-fluid img-product' />
          <p>Pepsi 2L + Papas X $35.00</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='wrapper-promotion mx-auto'>
          <img src={product} className='rounded-circle img-fluid img-product' />
          <p>Pepsi 2L + Papas X $35.00</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='wrapper-promotion mx-auto'>
          <img src={product} className='rounded-circle img-fluid img-product' />
          <p>Pepsi 2L + Papas X $35.00</p>
        </div>
      </Carousel.Item>
    </Carousel>
  )
}
