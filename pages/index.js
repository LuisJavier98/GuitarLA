import { Inter } from '@next/font/google'
import styles from '../styles/grid.module.css'
import Layout from '@/components/layout'
import Curso from '@/components/curso'
import React, { Suspense } from 'react'
const LazyGuitarra = React.lazy(() => import('../components/guitarra'))
const LazyPost = React.lazy(() => import('../components/post'))

const inter = Inter({ subsets: ['latin'] })


export default function Home({ guitarras, posts, curso, carrito }) {
  return (
    <>
      <Layout
        carrito={carrito}
        title='Pagina principal'
        description='Blod de musica , venta de guitarras y mas'
      >
        <main className='contenedor'>
          <h1 className='heading'>Nuestra Coleccion</h1>
          <div className={styles.grid}>
            {guitarras?.map(guitarra => (
              <Suspense key={guitarra.id} fallback={<div className="sk-chase">
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
        <Curso curso={curso} />
        <section>
          <h2 className='heading'>Blog</h2>
          <div className={styles.grid}>
            {posts?.map(post => (
              <Suspense key={post.id} fallback={<div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot" ></div >
                <div className="sk-chase-dot" ></div >
              </div >}>
                <LazyPost post={post.attributes} key={post.id} />
              </Suspense>
            ))}
          </div>
        </section>
      </Layout>
    </>
  )
}
export async function getServerSideProps() {
  const [resGuitarras, resPosts, resCurso] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guitarras?populate=imagen`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?populate=imagen`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/curso?populate=imagen`)
  ])

  const [{ data: guitarras }, { data: posts }, { data: curso }] = await Promise.all([
    resGuitarras.json(),
    resPosts.json(),
    resCurso.json()
  ])
  return {
    props: {
      guitarras,
      posts,
      curso
    }
  }
}
