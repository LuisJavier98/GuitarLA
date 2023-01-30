import Head from 'next/head'
import React from 'react'
import Footer from './footer'
import Header from './header'

function Layout({ children, title = '', description = '' }) {
  return (
    <>
      <Head>
        <title>{`GuitarLA-${title}`}</title>
        <meta name='description' content={description} />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout