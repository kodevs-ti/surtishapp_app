import React, { useState } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import BeatLoader from 'react-spinners/BeatLoader'
import { signUp } from '../services/users'
import { setToken } from '../lib'

const schema = Yup.object().shape({
  email: Yup.string().email('Email No Valido').required('Campo Obligatorio'),
  password: Yup.string().required('Campo Obligatorio')
})

export default function Form () {
  const [errorMessage, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (dataToSend) => {
    setError('')
    setIsLoading(true)
    const response = await signUp(dataToSend)
    const responseJSON = await response.json()
    const {
      success,
      data
    } = responseJSON
    setIsLoading(false)
    if (success) {
      setToken(data.token)
      Router.push('/menu')
      return
    }
    setError('Credenciales Invalidas')
  }
  const classNameEmail = errors.email ? 'inputErrorEmail' : null
  const classNamePassword = errors.password ? 'inputErrorPassword' : null
  return (
    <>
      <form
        className='form-login'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='form-group'>
          <label className='label-style'> Email
          </label>
          <div className='icon-inside-input'>
            <span className='icon icon-user' />
            <input
              type='text'
              name='email'
              ref={register}
              className={`form-control inputStyle ${classNameEmail}`}
              placeholder='john@ejemplo.com'
            />
          </div>
          <div className='text-alert-input'>
            <p> {errors.email?.message}</p>
          </div>
        </div>
        <div className='form-group'> <label className='label-style'> Contraseña  </label>
          <div className='icon-inside-input'> <span className='icon icon-padlock' />
            <input
              type='password'
              name='password'
              ref={register}
              className={`form-control inputStyle ${classNamePassword}`}
              placeholder='-----'
            />
          </div>
          <div className='text-alert-input'>
            <p> {errors.password?.message}</p>
          </div>
        </div> 
        {
          errors.password ? (
            <div className='text-alert'>
              <span className='icon-error' />
              <p> Los campos son obligatorios</p>
            </div>
          ) : errorMessage ? (
            <div className='text-alert'>
              <span className='icon-error' />
              <p> {errorMessage}</p>
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
        <button
          type='submit'
          className='btn-gradient mt-4'
        > Iniciar Sesión
        </button>
      </form>
    </>
  )
}
