import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import ProductWrapper from '../../components/layout/productWrapper'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import boxes from '../../public/icon/boxes-icon.svg'
import bultos from '../../public/icon/bultos-icon.svg'
import pieces from '../../public/icon/pieces-icon.svg'

import { getToken } from '../../lib/'
import { getById, updateById } from '../../services/products'

const schema = Yup.object().shape({
  stockMaxByMeasureMajor: Yup.number().min(1, 'Requerido').moreThan(Yup.ref('stockMinByMeasureMajor'), 'Mayor al min').positive('Inválido').required('Requerido').typeError('Invalido'),
  stockMinByMeasureMajor: Yup.number().min(1, 'Requerido').lessThan(Yup.ref('stockMaxByMeasureMajor'), 'Menor al Max').positive('Inválido').required('Requerido').typeError('Invalido')
})

export default function MaxMin () {
  const [stockMaxByMeasureMinor, setStockMaxByMeasureMinor] = useState(0)
  const [stockMinByMeasureMinor, setStockMinByMeasureMinor] = useState(0)
  const [product, setProduct] = useState({})
  const router = useRouter()
  const {
    barcode,
    id
  } = router.query
  const { register, handleSubmit, errors, getValues, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const watchQuantitiesMaxMin = watch(['stockMaxByMeasureMajor', 'stockMinByMeasureMajor'])

  const onSubmit = async (dataToSend) => {
    const newData = { ...product, ...dataToSend }
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

  useEffect(() => {
    let valueMax = 0
    let valueMin = 0
    if (unitMeasureMajor === 'caja') {
      valueMax = (getValues('stockMaxByMeasureMajor') * quantityByMeasureMedia)
      valueMin = (getValues('stockMinByMeasureMajor') * quantityByMeasureMedia)
    } else {
      valueMax = ((getValues('stockMaxByMeasureMajor') * 1000) * quantityByMeasureMedia)
      valueMin = ((getValues('stockMinByMeasureMajor') * 1000) * quantityByMeasureMedia)
    }
    setStockMaxByMeasureMinor(valueMax)
    setStockMinByMeasureMinor(valueMin)
  }, [watchQuantitiesMaxMin])

  const classNameStockMaxMajor = errors.name ? 'inputErrorStockMaxMajor' : null
  const classNameStockMinMajor = errors.unitMeasureMajor ? 'inputErrorStockMinMajor' : null

  return (
    <ProductWrapper barcode={barcode}>
      <form className='form-product' onSubmit={handleSubmit(onSubmit)}>
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

        <div className='d-flex justify-content-center mt-4'>
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
              ref={register}
            />
            <div className='text-alert-input'>
              <p>{errors.stockMaxByMeasureMajor?.message}</p>
            </div>
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
              ref={register}
            />
            <div className='text-alert-input'>
              <p>{errors.stockMinByMeasureMajor?.message}</p>
            </div>
          </div>
        </div>

        <div className='d-flex justify-content-center mt-4'>
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
              value={watchQuantitiesMaxMin.stockMaxByMeasureMajor ? stockMaxByMeasureMinor : 0}
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
              value={watchQuantitiesMaxMin.stockMinByMeasureMajor ? stockMinByMeasureMinor : 0}
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
