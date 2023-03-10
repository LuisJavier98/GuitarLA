import Layout from "@/components/layout";
import { formatearFecha } from "@/utils/helpers";
import Image from "next/image";
import styles from '../../styles/blog.module.css'

export default function Post({ post, carrito }) {
  const { titulo, contenido, imagen, publishedAt } = post[0].attributes
  return (
    <Layout
      carrito={carrito}
      title={titulo}>
      <article className={`${styles.post} ${styles['mt-3']}`}>
        <Image src={imagen.data.attributes.url} width={1000} height={400} alt={`imagen blog ${titulo}`} />
        <div className={styles.contenido}>
          <h3>{titulo}</h3>
          <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
          <p className={styles.texto}>{contenido}</p>
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
  const { data } = await respuesta.json()
  const paths = data.map(path => {
    return { params: { url: path.attributes.url } }
  })
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  console.log(params)
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?filters[url]=${params.url}&populate=imagen`)
  const { data: post } = await respuesta.json()
  return {
    props: {
      post
    }
  }
}

