import Layout from '@/components/layout'
import React, { Suspense } from 'react'
import styles from '../styles/grid.module.css'
const LazyPost = React.lazy(() => import('../components/post'))

function Blog({ posts }) {
  return (
    <>
      <Layout
        title='Blog'
        description='Blog de musica,venta de guitarras ,consejos,guitarLA'>
        <main className='contenedor'>
          <h1 className='heading'>Blog</h1>
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
                <LazyPost post={post.attributes} />
              </Suspense >
            ))}
          </div >
        </main >
      </Layout >
    </>
  )
}

export default Blog

export async function getServerSideProps() {
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?populate=imagen`)
  const { data: posts } = await respuesta.json()
  return {
    props: {
      posts
    }
  }
}
