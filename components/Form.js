import React, { useState } from 'react'
import Router from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import BeatLoader from 'react-spinners/BeatLoader'
import { signUp } from '../services/users'
import { setToken } from '../lib'

export default function Form () {
  const [errorMessage, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email No Valido').required('Campo Obligatorio'),
      password: Yup.string().required('Campo Obligatorio')
    }),
    onSubmit: async value => {
      setError('')
      setIsLoading(true)
      const response = await signUp(value)
      const responseJSON = await response.json()
      const { success, data } = responseJSON
      setIsLoading(false)
      if (success) {
        setToken(data.token)
        Router.push('/menu')
        return
      }
      setError('Credenciales Invalidas')
    }
  })

  const classNameEmail = formik.touched.email && formik.errors.email ? 'inputErrorEmail' : null
  const classNamePassword = formik.touched.password && formik.errors.password ? 'inputErrorPassword' : null
  return (
    <>
      <form className='form-login' onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label className='label-style'>Email</label>
          <div className='icon-inside-input'>
            <span className='icon icon-user' />
            <input
              type='text'
              name='email'
              className={`form-control inputStyle ${classNameEmail}`}
              placeholder='john@ejemplo.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {
            formik.touched.email && formik.errors.email ? (
              <div className='text-alert-input'>
                <p>{formik.errors.email}</p>
              </div>
            ) : null
          }
        </div>
        <div className='form-group'>
          <label className='label-style'>Contraseña</label>
          <div className='icon-inside-input'>
            <span className='icon icon-padlock' />
            <input
              type='password'
              name='password'
              className={`form-control inputStyle ${classNamePassword}`}
              placeholder='-----'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {
            formik.touched.password && formik.errors.password ? (
              <div className='text-alert-input'>
                <p>{formik.errors.password}</p>
              </div>
            ) : null
          }
        </div>
        {
          formik.errors.email && formik.errors.password ? (
            <div className='text-alert'>
              <span className='icon-error' />
              <p>Los campos son obligatorios</p>
            </div>
          ) : errorMessage ? (
            <div className='text-alert'>
              <span className='icon-error' />
              <p>{errorMessage}</p>
            </div>
          ) : null
        }
        {
          <div className='mt-4 w-100 d-flex justify-content-center'>
            <BeatLoader
              size={15}
              color='#00A3FF'
              loading={isLoading}
            />
          </div>
        }
        <button type='submit' className='btn-gradient mt-4'>Iniciar Sesión</button>
      </form>
    </>
  )
}
