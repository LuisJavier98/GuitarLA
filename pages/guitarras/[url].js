import Layout from '@/components/layout'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../../styles/guitarras.module.css'


function Producto({ guitarra, agregarCarrito, eliminarProducto, actualizarCantidad }) {
  const { nombre, descripcion, imagen, precio } = guitarra[0].attributes
  const [cantidad, setcantidad] = useState(0)
  const [arregloGuitarras, setarregloGuitarras] = useState([])

  console.log(arregloGuitarras)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cantidad <= 0) {
      window.alert('Please select a quantity')
    }
    const guitarraSeleccionada =
    {
      id: guitarra[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }
    agregarCarrito(guitarraSeleccionada)

  }
  return (
    <Layout
      title={`Guitarra ${nombre}`}
    >
      <div className={styles.guitarra}>
        {
          imagen ?
            <Image src={imagen.data.attributes.url} width={600} height={400} alt={`Imagen guitarra ${nombre}`} />
            :
            <div className="sk-chase">
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot" ></div >
              <div className="sk-chase-dot" ></div >
            </div >
        }


        <div className={styles.contenido}>
          <h3>{nombre}</h3>
          <p className={styles.descripcion}>{descripcion}</p>
          <p className={styles.precio}>${precio}</p>
          <form onSubmit={handleSubmit} className={styles.formulario}>
            <label htmlFor="cantidad">Cantidad:</label>
            <select onChange={(e) => { setcantidad(+e.target.value) }} id="cantidad" defaultValue={0} >
              <option value="0" disabled  >-- Seleccione --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input type="submit" value='AGREGAR AL CARRITO' />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Producto

export async function getStaticPaths() {
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guitarras`)
  const { data } = await respuesta.json()
  const paths = data.map(guitarra => ({
    params: {
      url: guitarra.attributes.url
    }
  }))
  return {
    paths,
    fallback: false //Genracion de pagina 404
  }
}

export async function getStaticProps({ params }) {
  const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guitarras?filters[url]=${params.url}&populate=imagen`)
  const { data: guitarra } = await respuesta.json()
  return {
    props: {
      guitarra
    }
  }
}