import Layout from '@/components/layout'
import React, { Suspense } from 'react'
import Post from '../components/post'
import styles from '../styles/grid.module.css'


function Blog({ posts }) {
  return (
    <>
      <Layout
        title='Blog'
        description='Blog de musica,venta de guitarras ,consejos,guitarLA'>
        <main className='contenedor'>
          <h1 className='heading'>Blog</h1>
          <div className={styles.grid}>
            {posts.map(post => (


              <Post post={post.attributes} />

            ))}
          </div >
        </main >
      </Layout >
    </>
  )
}

export default Blog

export async function getStaticProps() {
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?populate=imagen`)
  const { data: posts } = await respuesta.json()
  return {
    props: {
      posts
    }
  }
}
