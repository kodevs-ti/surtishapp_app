import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import ProductWrapper from '../../components/layout/productWrapper'
import Warning from '../../components/Warning'

import { getToken } from '../../lib'
import { updateById } from '../../services/products'

import piece from '../../public/icon/piece-one.svg'
import kilo from '../../public/icon/kilo-icon-one.svg'

export default function Stock () {
  const [priceSuggestedByUnit, setPriceSuggestedByUnit] = useState(0)
  const router = useRouter()
  const {
    barcode,
    id,
    unitMeasureMajor
  } = router.query

  const formik = useFormik({
    initialValues: {
      pricePurchasedByUnit: 0,
      percentageOfProfit: 0
    },
    validationSchema: Yup.object({
      pricePurchasedByUnit: Yup.number().min(1, 'Requerido').positive('Invalido').required('Requerido'),
      percentageOfProfit: Yup.number().min(1, 'Requerido').max(100).positive('Invalido').required('Requerido')
    }),
    onSubmit: async values => {
      console.log(values)
      const newData = { ...values, priceSuggestedByUnit }
      const token = getToken()
      const response = await updateById(id, newData, token)
      const responseJSON = await response.json()
      console.log(responseJSON)
      const { success } = responseJSON
      if (success) {
        Router.push('/register/success')
      }
    }
  })

  const priceToSum = (pricePurchasedByUnit, percentageOfProfit) => {
    const value = (percentageOfProfit * pricePurchasedByUnit) / 100
    return value
  }

  useEffect(() => {
    setPriceSuggestedByUnit(formik.values.pricePurchasedByUnit + priceToSum(formik.values.pricePurchasedByUnit, formik.values.percentageOfProfit))
  },
  [formik.values.percentageOfProfit])

  return (
    <ProductWrapper barcode={barcode}>
      <form className='form-product' onSubmit={formik.handleSubmit}>
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
              className='form-control input-style'
              placeholder='0'
              value={formik.values.pricePurchasedByUnit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className='form-group mr-2'>
            <label className='label-style'>% de Ganancia</label>
            <input
              type='number'
              name='percentageOfProfit'
              className='form-control input-style'
              placeholder='0'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.percentageOfProfit}
            />
          </div>
          <div className='form-group'>
            <label className='label-style'>Precio Sug.</label>
            <input
              type='number'
              name='priceSuggestedByUnit'
              className='form-control input-style-read'
              placeholder='0'
              readOnly
              value={formik.values.pricePurchasedByUnit + priceToSum(formik.values.pricePurchasedByUnit, formik.values.percentageOfProfit)}
            />
          </div>
        </div>
        <div className='wrapper-profit mb-2'>
          <p>Ganancia de <span>${priceToSum(formik.values.pricePurchasedByUnit, formik.values.percentageOfProfit)}</span></p>
          <p>por cada {unitMeasureMajor === 'caja' ? (<span>pieza</span>) : (<span>KG</span>)} </p>
        </div>
        <button className='btn-gradient mt-2 mb-5'>
          Finalizar <i className='fas fa-arrow-right ml-2' />
        </button>
      </form>
    </ProductWrapper>
  )
}
