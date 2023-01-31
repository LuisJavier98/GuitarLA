
import Layout from '@/components/layout'
import styles from '../styles/grid.module.css'
import React, { Suspense } from 'react'
const LazyGuitarra = React.lazy(() => import('../components/guitarra'))

function Tienda({ guitarras }) {
  return (
    <>
      <Layout
        title='Tienda'
        description='Tienda virtual'>
        <main className='contenedor'>
          <h2 className='heading'>Nuestra Colección</h2>
          <div className={styles.grid}>
            {guitarras.map(guitarra => (
              <Suspense fallback={<div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot" ></div >
                <div className="sk-chase-dot" ></div >
              </div >}>
                <LazyGuitarra
                  guitarra={guitarra.attributes}
                  key={guitarra.id}
                />
              </Suspense>
            ))}
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Tienda

export async function getServerSideProps() {
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guitarras?populate=imagen`)
  const { data: guitarras } = await respuesta.json()
  return {
    props: {
      guitarras
    }
  }
}