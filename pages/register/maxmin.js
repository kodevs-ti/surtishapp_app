import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import ProductWrapper from '../../components/layout/productWrapper'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import boxes from '../../public/icon/boxes-icon.svg'
import bultos from '../../public/icon/bultos-icon.svg'
import pieces from '../../public/icon/pieces-icon.svg'

import { getToken } from '../../lib/'
import { getById, updateById } from '../../services/products'

export default function MaxMin () {
  const [stockMaxByMeasureMinor, setStockMaxByMeasureMinor] = useState(0)
  const [stockMinByMeasureMinor, setStockMinByMeasureMinor] = useState(0)
  const [product, setProduct] = useState({})
  const router = useRouter()
  const {
    barcode,
    id
  } = router.query

  const fetchData = async () => {
    const token = getToken()
    const response = await getById(id, token)
    const responseJSON = await response.json()
    const { success, data } = responseJSON
    if (success) {
      setProduct(data.product)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const { currentQuantityByMeasureMinor, unitMeasureMajor, quantityByMeasureMajor, quantityByMeasureMedia } = product

  const formik = useFormik({
    initialValues: {
      stockMaxByMeasureMajor: 0,
      stockMinByMeasureMajor: 0
    },
    validationSchema: Yup.object({
      stockMaxByMeasureMajor: Yup.number().min(1, 'Requerido').moreThan(Yup.ref('stockMinByMeasureMajor'), 'Inválido').positive('Inválido').required('Requerido'),
      stockMinByMeasureMajor: Yup.number().min(1, 'Requerido').lessThan(Yup.ref('stockMaxByMeasureMajor'), 'Inválido').positive('Inválido').required('Requerido')
    }),
    onSubmit: async values => {
      const newData = { ...product, ...values }
      console.log(newData)
      const token = getToken()
      const response = await updateById(id, newData, token)
      const responseJSON = await response.json()
      const { success, data } = responseJSON
      if (success) {
        Router.push({
          pathname: '/register/profit',
          query: {
            barcode,
            id: data.product._id,
            unitMeasureMajor
          }
        })
      }
    }
  })

  useEffect(() => {
    let valueMax = 0
    let valueMin = 0
    if (unitMeasureMajor === 'caja') {
      valueMax = (formik.values.stockMaxByMeasureMajor * quantityByMeasureMedia)
      valueMin = (formik.values.stockMinByMeasureMajor * quantityByMeasureMedia)
    } else {
      valueMax = ((formik.values.stockMaxByMeasureMajor * 1000) * quantityByMeasureMedia)
      valueMin = ((formik.values.stockMinByMeasureMajor * 1000) * quantityByMeasureMedia)
    }
    setStockMaxByMeasureMinor(valueMax)
    setStockMinByMeasureMinor(valueMin)
  }, [formik.values.stockMinByMeasureMajor])

  const classNameStockMaxMajor = formik.touched.stockMaxByMeasureMajor && formik.errors.name ? 'inputErrorStockMaxMajor' : null
  const classNameStockMinMajor = formik.touched.unitMeasureMajor && formik.errors.unitMeasureMajor ? 'inputErrorStockMinMajor' : null

  return (
    <ProductWrapper barcode={barcode}>
      <form className='form-product' onSubmit={formik.handleSubmit}>
        <h3 className='title-style mt-3'>Stock: Máximos y Mínimos</h3>
        <hr />

        <div className='d-flex flex-column align-items-center w-100 mb-3'>
          <p className='m-0'>Stock Actual:</p>
          {
            unitMeasureMajor === 'pieza' ? (
              <p className='m-0'>{quantityByMeasureMajor} pieza(s) = {currentQuantityByMeasureMinor} gramos totales</p>
            ) : unitMeasureMajor === 'bulto' ? (
              <p className='m-0'>{quantityByMeasureMajor} bulto(s) = {currentQuantityByMeasureMinor} gramos totales </p>
            ) : unitMeasureMajor === 'caja' ? (
              <p className='m-0'>{quantityByMeasureMajor} caja(s) = {currentQuantityByMeasureMinor} piezas totales</p>
            ) : null
          }
        </div>

        <div>
          <p className='title-style-meassure'>¿Cuántas</p>
          {
            unitMeasureMajor === 'pieza' ? (
              <p className='title-style-meassure'><img src={pieces} />  Piezas</p>
            ) : unitMeasureMajor === 'bulto' ? (
              <p className='title-style-meassure'><img src={bultos} />  Bultos</p>
            ) : unitMeasureMajor === 'caja' ? (
              <p className='title-style-meassure'><img src={boxes} />  Cajas</p>
            ) : null
          }
          <p className='title-style-meassure'>Deben haber en tu stock...?</p>
        </div>

        <div className='d-flex mt-4'>
          <div className='form-group mr-2'>
            {
              unitMeasureMajor === 'pieza' ? (
                <label className='label-style'>Máximo en Piezas</label>
              ) : unitMeasureMajor === 'bulto' ? (
                <label className='label-style'>Máximo en Bultos</label>
              ) : unitMeasureMajor === 'caja' ? (
                <label className='label-style'>Máximo en Cajas</label>
              ) : null
            }
            <input
              type='number'
              name='stockMaxByMeasureMajor'
              className={`form-control input-style ${classNameStockMaxMajor}`}
              placeholder='0'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stockMaxByMeasureMajor}
            />
            {
              formik.touched.stockMaxByMeasureMajor && formik.errors.stockMaxByMeasureMajor ? (
                <div className='text-alert-input'>
                  <p>{formik.errors.stockMaxByMeasureMajor}</p>
                </div>
              ) : null
            }
          </div>
          <div className='form-group mr-2'>
            {
              unitMeasureMajor === 'pieza' ? (
                <label className='label-style'>Minimo en Piezas</label>
              ) : unitMeasureMajor === 'bulto' ? (
                <label className='label-style'>Minimo en Bultos</label>
              ) : unitMeasureMajor === 'caja' ? (
                <label className='label-style'>Minimo en Cajas</label>
              ) : null
            }
            <input
              type='number'
              name='stockMinByMeasureMajor'
              className={`form-control input-style ${classNameStockMinMajor}`}
              placeholder='0'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stockMinByMeasureMajor}
            />
            {
              formik.touched.stockMinByMeasureMajor && formik.errors.stockMinByMeasureMajor ? (
                <div className='text-alert-input'>
                  <p>{formik.errors.stockMinByMeasureMajor}</p>
                </div>
              ) : null
            }
          </div>
        </div>

        <div className='d-flex mt-4'>
          <div className='form-group mr-2'>
            {
              unitMeasureMajor === 'pieza' ? (
                <label className='label-style'>Equi. Max en Gramos</label>
              ) : unitMeasureMajor === 'bulto' ? (
                <label className='label-style'>Equi. Max en Gramos</label>
              ) : unitMeasureMajor === 'caja' ? (
                <label className='label-style'>Equi. Max en Piezas</label>
              ) : null
            }
            <input
              type='number'
              className='form-control input-style-read'
              placeholder='0'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={stockMaxByMeasureMinor}
            />

          </div>
          <div className='form-group mr-2'>
            {
              unitMeasureMajor === 'pieza' ? (
                <label className='label-style'>Equi. Min en Gramos</label>
              ) : unitMeasureMajor === 'bulto' ? (
                <label className='label-style'>Equi. Min en Gramos</label>
              ) : unitMeasureMajor === 'caja' ? (
                <label className='label-style'>Equi. Min en Piezas</label>
              ) : null
            }
            <input
              type='number'
              className='form-control input-style-read'
              placeholder='0'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={stockMinByMeasureMinor}
            />

          </div>
        </div>
        <button type='submit' className='btn-gradient mt-2 mb-5'>
          Siguiente <i className='fas fa-arrow-right ml-2' />
        </button>
      </form>
    </ProductWrapper>
  )
}
