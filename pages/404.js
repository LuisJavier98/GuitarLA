import Layout from '@/components/layout'
import Link from 'next/link'
import React from 'react'

function Pagina404() {
  return (
    <Layout
      title='Pagina No Encontrada'>
      <p className='error'>Pagina No Encontrada</p>
      <Link className='error-enlace' href={'/'}>Ir a inicio</Link>
    </Layout>
  )
}

export default Pagina404