import React from 'react'
import Head from 'next/head'

export default function Index ({ children }) {
  return (
    <>
      <Head>
        <title>SurtiShapp</title>
        <link rel='icon' href='/favicon.ico' />
        <link href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Marvel:ital,wght@0,400;0,700;1,400;1,700&display=swap' rel='stylesheet' />
        <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.1/css/all.css' integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf' crossOrigin='anonymous' />
        <meta
          name='Description'
          content='SurtiShapp,'
        />
      </Head>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-md-8 mx-auto p-0 relative-position'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
