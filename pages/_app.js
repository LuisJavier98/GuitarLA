import '@/styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) : []
  const [carrito, setCarrito] = useState(carritoLS ?? [])
  const [paginaLista, setpaginaLista] = useState(false)
  useEffect(() => {
    setpaginaLista(true)
  }, [])


  const agregarCarrito = guitarra => {
    if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
      const carritoActualizado = carrito.map(guitarraState => {
        if (guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad;
        }
        return guitarraState;
      });
      setCarrito([...carritoActualizado]);
    } else {
      setCarrito([...carrito, guitarra]);
    }
  }

  const eliminarProducto = id => {
    const carritoActualizado = carrito.filter(producto => producto.id != id)
    setCarrito(carritoActualizado)
    window.localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  const actualizarCantidad = guitarra => {
    const carritoActualizado = carrito.map(guitarraState => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = parseInt(guitarra.cantidad)
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
    window.localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito])

  return paginaLista ? <Component
    carrito={carrito}
    agregarCarrito={agregarCarrito}
    eliminarProducto={eliminarProducto}
    actualizarCantidad={actualizarCantidad}
    {...pageProps} /> : null
}
