import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductWrapper from '../../components/layout/productWrapper'
import Warning from '../../components/Warning'

import { getToken } from '../../lib/index'
import { create } from '../../services/products'

import iconPiece from '../../public/icon/piece-icon.svg'
import iconBulto from '../../public/icon/bulto-icon.svg'
import iconBoxStock from '../../public/icon/box-icon.svg'

const schema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  unitMeasureMajor: Yup.string().required('Requerido').min(1, 'Invalido'),
  quantityByMeasureMajor: Yup.number('invalido').min(1, 'Requerido').positive('Invalido').required('Requerido').typeError('Invalido'),
  quantityByMeasureMedia: Yup.number('invalido').min(1, 'Requerido').positive('Invalido').required('Requerido').typeError('Invalido'),
})

export default function Product () {
  const [errorMessage, setError] = useState('')
  const router = useRouter()
  const { barcode } = router.query
  const { register, handleSubmit, errors, getValues, watch } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const watchSelectMeasure = watch('unitMeasureMajor')
  const watchQuantities = watch(['quantityByMeasureMajor', 'quantityByMeasureMedia', 'quantityByMeasureMinor'])
  
  const onSubmit = async (dataToSend) => {
    setError('')
    const token = getToken()
    const response = await create(dataToSend, token)
    const responseJSON = await response.json()
    const { success, data } = responseJSON
    if (success) {
      Router.push({
        pathname: '/register/maxmin',
        query: {
          barcode,
          id: data.product._id
        }
      })
      return
    }
    setError('Ya existe esté código de Barras')
  }

  const classNameName = errors.name ? 'inputErrorName' : null
  const classNameMeasure = errors.unitMeasureMajor ? 'inputErrorMeasure' : null
  const classNameDateExpiry = errors.dateOfExpiry ? 'inputErrorDateExpiry' : null
  const classNameQuantityMajor = errors.quantityByMeasureMajor ? 'inputErrorQuantityMajor' : null
  const classNameQuantityMedia = errors.quantityByMeasureMedia ? 'inputErrorQuantityMedia' : null

  return (
    <ProductWrapper barcode={barcode}>
      <form className='form-product' onSubmit={handleSubmit(onSubmit)}>
        <h3 className='title-style mt-3'>Nuevo Producto</h3>
        <hr />
        <div className='form-group'>
          <label className='label-style'>Nombre del producto</label>
          <input
            type='text'
            name='name'
            className={`form-control input-style ${classNameName}`}
            placeholder='Café'
            ref={register}
          />
          <div className='text-alert-input'>
            <p>{errors.name?.message}</p>
          </div>
        </div>
        <div className='form-group'>
          <label className='label-style'>Detalle del Producto</label>
          <input
            type='text'
            name='detail'
            className='form-control input-style'
            placeholder='Café'
            ref={register}
          />
        </div>
        <div className='form-group'>
          <label className='label-style'>Fecha de Expiración</label>
          <input
            type='date'
            className={`form-control input-style ${classNameDateExpiry}`}
            name='dateOfExpiry'
            ref={register}
          />
        </div>
        <div className='form-group'>
          <label className='label-style mb-3'>Unidad de Medida</label>
          <Warning content='Recuerda seleccionar la unidad más grande en la que el producto es comprado' />
          <select
            className={`form-control select-style mt-3 ${classNameMeasure}`}
            name='unitMeasureMajor'
            ref={register}
          >
            <option value=''>Selecciona una unidad</option>
            <option value='pieza' className='piece'>Pieza</option>
            <option value='bulto' className='bulto'>Bulto</option>
            <option value='caja' className='box'> Caja/Paquete</option>
          </select>
          <div className='text-alert-input'>
            <p>{errors.unitMeasureMajor?.message}</p>
          </div>
        </div>
        <p className='title-style-sec'>Stock Actual por cada</p>
        <div>
          {
            watchSelectMeasure === 'pieza' ? (
              <>
                <p className='title-style-meassure'> <img src={iconPiece} alt='igm' /> Pieza</p>
                <Warning content='Recuerda ingresar en la cantidad, el numero de PIEZAS en que el producto es comprado' />
              </>
            ) : watchSelectMeasure === 'bulto' ? (
              <>
                <p className='title-style-meassure'> <img src={iconBulto} alt='igm' /> Bulto</p>
                <Warning content='Recuerda ingresar en la cantidad, el numero de BULTOS en que el producto es comprado' />
              </>
            ) : watchSelectMeasure === 'caja' ? (
              <>
                <p className='title-style-meassure'> <img src={iconBoxStock} alt='igm' /> Caja</p>
                <Warning content='Recuerda ingresar en la cantidad, el numero de CAJAS en que el producto es comprado' />
              </>
            ) : null
          }
        </div>
        <div className='d-flex mt-4'>
          <div className='form-group mr-2'>
            {
             watchSelectMeasure === 'pieza' ? (
                <label className='label-style'>Cantidad de Piezas </label>
              ) : watchSelectMeasure === 'bulto' ? (
                <label className='label-style'>Cantidad de Bultos </label>
              ) : watchSelectMeasure === 'caja' ? (
                <label className='label-style'>Cant. de Cajas </label>
              ) : null
            }
            <input
              type='number'
              name='quantityByMeasureMajor'
              className={`form-control input-style ${classNameQuantityMajor}`}
              placeholder='0'
              ref={register}
            />
            <div className='text-alert-input'>
              <p>{errors.quantityByMeasureMajor?.message}</p>
            </div>
          </div>
          <div className='form-group mr-2'>
            {
              watchSelectMeasure === 'pieza' ? (
                <label className='label-style'>Kilogramos por Pieza</label>
              ) : watchSelectMeasure === 'bulto' ? (
                <label className='label-style'>Kilogramos por Bulto</label>
              ) : watchSelectMeasure === 'caja' ? (
                <label className='label-style'>Piezas por Caja</label>
              ) : null
            }
            <input
              type='number'
              name='quantityByMeasureMedia'
              className={`form-control input-style ${classNameQuantityMedia}`}
              placeholder='0'
              ref={register}
            />
            <div className='text-alert-input'>
              <p>{errors.quantityByMeasureMedia?.message}</p>
            </div>
          </div>
          <div className='form-group'>
            {
              watchSelectMeasure === 'pieza' ? (
                <label className='label-style'>Gramos totales</label>
              ) : watchSelectMeasure === 'bulto' ? (
                <label className='label-style'>Gramos totales</label>
              ) : watchSelectMeasure === 'caja' ? (
                <label className='label-style'>Piezas totales</label>
              ) : null
            }
            {
              watchSelectMeasure === 'caja' ? (
                <input
                  type='number'
                  name='quantityByMeasureMinor'
                  className='form-control input-style'
                  placeholder='0'
                  readOnly
                  ref={register}
                  value={watchQuantities.quantityByMeasureMedia ? getValues('quantityByMeasureMajor') * getValues('quantityByMeasureMedia'): 0}
                />
              ) : (
                <input
                  type='number'
                  name='quantityByMeasureMinor'
                  className='form-control input-style-read'
                  placeholder='0'
                  readOnly
                  ref={register}
                  value={watchQuantities.quantityByMeasureMedia ? (getValues('quantityByMeasureMajor') * 1000) * getValues('quantityByMeasureMedia') : 0}
                />
              )
            }
          </div>
        </div>
        {
          errorMessage && (
            <>
            <div className='text-alert mb-4'>
              <div>
                <span className='icon-error' />
                <p>{errorMessage}</p>
              </div>
            </div>
            <button onClick={() => Router.back()} className='btn-gradient mt-2 mb-5'>
              <i className='fas fa-arrow-left mr-2' /> Escanear Otro
            </button>
            </>
          )
        }
        <button type='submit' className='btn-gradient mt-2 mb-5'>
          Siguiente <i className='fas fa-arrow-right ml-2' />
        </button>
      </form>
    </ProductWrapper>
  )
}
