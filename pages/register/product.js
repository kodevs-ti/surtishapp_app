import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ProductWrapper from '../../components/layout/productWrapper'
import Warning from '../../components/Warning'

import { getToken } from '../../lib/index'
import { create } from '../../services/products'

import iconPiece from '../../public/icon/piece-icon.svg'
import iconBulto from '../../public/icon/bulto-icon.svg'
import iconBoxStock from '../../public/icon/box-icon.svg'

export default function Product () {
  const [errorMessage, setError] = useState('')
  const router = useRouter()
  const { barcode } = router.query

  const formik = useFormik({
    initialValues: {
      barcode,
      name: '',
      detail: '',
      dateOfExpiry: '',
      unitMeasureMajor: '',
      quantityByMeasureMajor: 0,
      quantityByMeasureMedia: 0
    },
    validationSchema: Yup.object({
      barcode: Yup.string().required('Requerido'),
      name: Yup.string().required('Requerido'),
      unitMeasureMajor: Yup.string().required('Requerido'),
      quantityByMeasureMajor: Yup.number().min(1, 'Requerido').positive('Invalido').required('Requerido'),
      quantityByMeasureMedia: Yup.number().min(1, 'Requerido').positive('Invalido').required('Requerido'),
      dateOfExpiry: Yup.date().required('Requerido')
    }),
    onSubmit: async values => {
      setError('')
      const token = getToken()
      const response = await create(values, token)
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
  })

  const classNameName = formik.touched.name && formik.errors.name ? 'inputErrorName' : null
  const classNameMeasure = formik.touched.unitMeasureMajor && formik.errors.unitMeasureMajor ? 'inputErrorMeasure' : null
  const classNameDateExpiry = formik.touched.dateOfExpiry && formik.errors.dateOfExpiry ? 'inputErrorDateExpiry' : null
  const classNameQuantityMajor = formik.touched.quantityByMeasureMajor && formik.errors.quantityByMeasureMajor ? 'inputErrorQuantityMajor' : null
  const classNameQuantityMedia = formik.touched.quantityByMeasureMedia && formik.errors.quantityByMeasureMedia ? 'inputErrorQuantityMedia' : null

  return (
    <ProductWrapper barcode={barcode}>
      <form className='form-product' onSubmit={formik.handleSubmit}>
        <h3 className='title-style mt-3'>Nuevo Producto</h3>
        <hr />
        <div className='form-group'>
          <label className='label-style'>Nombre del producto</label>
          <input
            type='text'
            name='name'
            className={`form-control input-style ${classNameName}`}
            placeholder='Café'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.name && formik.errors.name ? (
              <div className='text-alert-input'>
                <p>{formik.errors.name}</p>
              </div>
            ) : null
          }
        </div>
        <div className='form-group'>
          <label className='label-style'>Detalle del Producto</label>
          <input
            type='text'
            name='detail'
            className='form-control input-style'
            placeholder='Café'
            value={formik.values.detail}
            onChange={formik.handleChange}
          />
        </div>
        <div className='form-group'>
          <label className='label-style'>Fecha de Expiración</label>
          <input
            type='date'
            className={`form-control input-style ${classNameDateExpiry}`}
            name='dateOfExpiry'
            value={formik.values.dateOfExpiry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.dateOfExpiry && formik.errors.dateOfExpiry ? (
              <div className='text-alert-input'>
                <p>{formik.errors.dateOfExpiry}</p>
              </div>
            ) : null
          }
        </div>
        <div className='form-group'>
          <label className='label-style mb-3'>Unidad de Medida</label>
          <Warning content='Recuerda seleccionar la unidad más grande en la que el producto es comprado' />
          <select
            className={`form-control select-style mt-3 ${classNameMeasure}`}
            name='unitMeasureMajor'
            value={formik.values.unitMeasureMajor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option>Selecciona una unidad</option>
            <option value='pieza' className='piece'>Pieza</option>
            <option value='bulto' className='bulto'>Bulto</option>
            <option value='caja' className='box'> Caja/Paquete</option>
          </select>
          {
            formik.touched.unitMeasureMajor && formik.errors.unitMeasureMajor ? (
              <div className='text-alert-input'>
                <p>{formik.errors.unitMeasureMajor}</p>
              </div>
            ) : null
          }
        </div>
        <p className='title-style-sec'>Stock Actual por cada</p>
        <div>
          {
            formik.values.unitMeasureMajor === 'pieza' ? (
              <>
                <p className='title-style-meassure'> <img src={iconPiece} alt='igm' /> Pieza</p>
                <Warning content='Recuerda ingresar en la cantidad, el numero de PIEZAS en que el producto es comprado' />
              </>
            ) : formik.values.unitMeasureMajor === 'bulto' ? (
              <>
                <p className='title-style-meassure'> <img src={iconBulto} alt='igm' /> Bulto</p>
                <Warning content='Recuerda ingresar en la cantidad, el numero de BULTOS en que el producto es comprado' />
              </>
            ) : formik.values.unitMeasureMajor === 'caja' ? (
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
              formik.values.unitMeasureMajor === 'pieza' ? (
                <label className='label-style'>Cantidad de Piezas </label>
              ) : formik.values.unitMeasureMajor === 'bulto' ? (
                <label className='label-style'>Cantidad de Bultos </label>
              ) : formik.values.unitMeasureMajor === 'caja' ? (
                <label className='label-style'>Cant. de Cajas </label>
              ) : null
            }
            <input
              type='number'
              name='quantityByMeasureMajor'
              className={`form-control input-style ${classNameQuantityMajor}`}
              placeholder='0'
              value={formik.values.quantityByMeasureMajor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {
              formik.touched.quantityByMeasureMajor && formik.errors.quantityByMeasureMajor ? (
                <div className='text-alert-input'>
                  <p>{formik.errors.quantityByMeasureMajor}</p>
                </div>
              ) : null
            }
          </div>
          <div className='form-group mr-2'>
            {
              formik.values.unitMeasureMajor === 'pieza' ? (
                <label className='label-style'>Kilogramos por Pieza</label>
              ) : formik.values.unitMeasureMajor === 'bulto' ? (
                <label className='label-style'>Kilogramos por Bulto</label>
              ) : formik.values.unitMeasureMajor === 'caja' ? (
                <label className='label-style'>Piezas por Caja</label>
              ) : null
            }
            <input
              type='number'
              name='quantityByMeasureMedia'
              className={`form-control input-style ${classNameQuantityMedia}`}
              placeholder='0'
              value={formik.values.quantityByMeasureMedia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {
              formik.touched.quantityByMeasureMedia && formik.errors.quantityByMeasureMedia ? (
                <div className='text-alert-input'>
                  <p>{formik.errors.quantityByMeasureMedia}</p>
                </div>
              ) : null
            }
          </div>
          <div className='form-group'>
            {
              formik.values.unitMeasureMajor === 'pieza' ? (
                <label className='label-style'>Gramos totales</label>
              ) : formik.values.unitMeasureMajor === 'bulto' ? (
                <label className='label-style'>Gramos totales</label>
              ) : formik.values.unitMeasureMajor === 'caja' ? (
                <label className='label-style'>Piezas totales</label>
              ) : null
            }
            {
              formik.values.unitMeasureMajor === 'caja' ? (
                <input
                  type='number'
                  name='quantityByMeasureMinor'
                  className='form-control input-style'
                  placeholder='0'
                  readOnly
                  onChange={formik.handleChange}
                  value={formik.values.quantityByMeasureMajor * formik.values.quantityByMeasureMedia}
                />
              ) : (
                <input
                  type='number'
                  name='quantityByMeasureMinor'
                  className='form-control input-style-read'
                  placeholder='0'
                  readOnly
                  onChange={formik.handleChange}
                  value={(formik.values.quantityByMeasureMajor * 1000) * formik.values.quantityByMeasureMedia}
                />
              )
            }

          </div>
        </div>
        {
          errorMessage ? (
            <div className='text-alert mb-4'>
              <div>
                <span className='icon-error' />
                <p>{errorMessage}</p>
              </div>
            </div>
          ) : null
        }
        {
          errorMessage ? (
            <button onClick={() => Router.back()} className='btn-gradient mt-2 mb-5'>
              <i className='fas fa-arrow-left mr-2' /> Escanear Otro
            </button>
          ) : (
            <button type='submit' className='btn-gradient mt-2 mb-5'>
              Siguiente <i className='fas fa-arrow-right ml-2' />
            </button>
          )
        }

      </form>
    </ProductWrapper>
  )
}
