import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import ProductWrapper from '../../components/layout/productWrapper'
import Warning from '../../components/Warning'

import { getToken } from '../../lib'
import { updateById } from '../../services/products'

import piece from '../../public/icon/piece-one.svg'
import kilo from '../../public/icon/kilo-icon-one.svg'

const schema = Yup.object().shape({
  pricePurchasedByUnit: Yup.number().min(1, 'Requerido').positive('Invalido').required('Requerido').typeError('Invalido'),
  percentageOfProfit: Yup.number().min(1, 'Requerido').max(100, 'Invalido').positive('Invalido').required('Requerido').typeError('Invalido')
})

export default function Stock () {
  const [priceSuggestedByUnit, setPriceSuggestedByUnit] = useState(0)
  const [quantityOfProfit, setQuantityOfProfit] = useState(0)
  const router = useRouter()
  const {
    barcode,
    id,
    unitMeasureMajor
  } = router.query

  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const watchPurchases = watch()

  const onSubmit = async (dataToSend) => {
    console.log(dataToSend)
    const newData = { ...dataToSend, priceSuggestedByUnit, quantityOfProfit }
    const token = getToken()
    const response = await updateById(id, newData, token)
    const responseJSON = await response.json()
    console.log(responseJSON)
    const { success } = responseJSON
    if (success) {
      Router.push('/register/success')
    }
  }

  const priceToSum = (pricePurchasedByUnit, percentageOfProfit) => {
    const value = (parseFloat(percentageOfProfit) * parseFloat(pricePurchasedByUnit)) / 100
    return  Math.round(value)
  }

  useEffect(() => {
    setPriceSuggestedByUnit(parseFloat(watchPurchases.pricePurchasedByUnit) + priceToSum(watchPurchases.pricePurchasedByUnit, watchPurchases.percentageOfProfit))
    setQuantityOfProfit(priceToSum(watchPurchases.pricePurchasedByUnit, watchPurchases.percentageOfProfit))
  },[watchPurchases.percentageOfProfit])


  const classNamePricePurchased = errors.pricePurchasedByUnit ? 'inputErrorPricePurchasedByUnit' : null
  const classNamePercentageOfProfit = errors.percentageOfProfit ? 'inputErrorPercentageOfProfit' : null
  return (
    <ProductWrapper barcode={barcode}>
      <form className='form-product' onSubmit={handleSubmit(onSubmit)}>
        <h3 className='title-style mt-3'>Ganancias</h3>
        <hr />
        <p className='title-style-sec'>Ganancia por cada</p>
        <div>
          <div className='d-flex align-items-center justify-content-center mb-3'>
            {
              unitMeasureMajor === 'caja' ? (
                <>
                  <img src={piece} alt='img-icon' className='mr-2' />
                  <p className='title-style-meassure m-0'>Pieza</p>
                </>
              ) : (
                <>
                  <img src={kilo} alt='img-icon' className='mr-2' />
                  <p className='title-style-meassure m-0'>KG</p>
                </>
              )
            }

          </div>
          {
            unitMeasureMajor === 'caja' ? (
              <Warning content='Recuerda calcular tus ganancias por cada PIEZA' />
            ) : (
              <Warning content='Recuerda calcular tus ganancias por cada KILO' />
            )
          }
        </div>

        <div className='d-flex mt-4'>
          <div className='form-group mr-2'>
            <label className='label-style'>Precio Compra</label>
            <input
              type='number'
              name='pricePurchasedByUnit'
              className={`form-control input-style ${classNamePricePurchased}`}
              placeholder='0'
              ref={register}
            />
            <div className='text-alert-input'>
              <p>{errors.pricePurchasedByUnit?.message}</p>
            </div>
          </div>
          <div className='form-group mr-2'>
            <label className='label-style'>% de Ganancia</label>
            <input
              type='number'
              name='percentageOfProfit'
              className={`form-control input-style ${classNamePercentageOfProfit}`}
              placeholder='0'
              ref={register}
            />
            <div className='text-alert-input'>
              <p>{errors.percentageOfProfit?.message}</p>
            </div>
          </div>
          <div className='form-group'>
            <label className='label-style'>Precio Sug.</label>
            <input
              type='number'
              name='priceSuggestedByUnit'
              className='form-control input-style-read'
              placeholder='0'
              readOnly
              value={watchPurchases.pricePurchasedByUnit ? parseFloat(watchPurchases.pricePurchasedByUnit) + priceToSum(watchPurchases.pricePurchasedByUnit, watchPurchases.percentageOfProfit) : 0}
            />
          </div>
        </div>
        <div className='wrapper-profit mb-2'>
          <p>Ganancia de <span>${priceToSum(watchPurchases.pricePurchasedByUnit, watchPurchases.percentageOfProfit) ? priceToSum(watchPurchases.pricePurchasedByUnit, watchPurchases.percentageOfProfit) : null}</span></p>
          <p>por cada {unitMeasureMajor === 'caja' ? (<span>pieza</span>) : (<span>KG</span>)} </p>
        </div>
        <button type='submit' className='btn-gradient mt-2 mb-5'>
          Finalizar <i className='fas fa-arrow-right ml-2' />
        </button>
      </form>
    </ProductWrapper>
  )
}
