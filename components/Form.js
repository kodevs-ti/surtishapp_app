import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Form () {
  // validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Campos Obligatorios'),
      password: Yup.string().required('Campos Obligatorios')
    }),
    onSubmit: value => {
      console.log('enviando')
      console.log(value)
    }
  })

  const classNameEmail = formik.touched.email && formik.errors.email ? 'inputErrorEmail' : null
  const classNamePassword = formik.touched.password && formik.errors.password ? 'inputErrorPassword' : null
  return (
    <>
      <form className='form-login' onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label className='label-style'>Correo de Usuario</label>
          <div className='icon-inside-input'>
            <span className='icon icon-user' />
            <input
              type='email'
              name='email'
              className={`form-control inputStyle ${classNameEmail}`}
              placeholder='john@ejemplo.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
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
        </div>
        {
          formik.errors.email && formik.errors.password ? (
            <div className='text-alert'>
              <span className='icon-error' />
              <p>Campos obligatorios</p>
            </div>
          ) : null
        }
        <button type='submit' className='btn-gradient mt-5'>Iniciar Sesión</button>
      </form>
    </>
  )
}
