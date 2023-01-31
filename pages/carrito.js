import Layout from '@/components/layout'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/carrito.module.css'

export default function Carrito({ carrito, actualizarCantidad, eliminarProducto, compraRealizada }) {
  return (
    <Layout title='carrito' carrito={carrito}>
      <main className='contenedor'>
        <h1 className='heading'>
          Carrito
        </h1>
        <div className={styles.contenido}>
          <div className={styles.carrito}>
            <h2>Articulos</h2>
            {carrito.length === 0 ? 'No hay productos aún' : (
              carrito.map(producto => (
                <div key={producto.id} className={styles.producto}>
                  <div>
                    <Image width={250} height={480} src={producto.imagen} alt={producto.nombre} />
                  </div>
                  <div>
                    <p className={styles.nombre}>{producto.nombre}</p>
                    <div className={styles.cantidad}>
                      <p>Cantidad</p>
                      <select className={styles.select} value={producto.cantidad} onChange={(e) => { actualizarCantidad({ id: producto.id, cantidad: +e.target.value }) }} id="cantidad" defaultValue={0} >
                        <option value="0" disabled  >-- Seleccione --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                    </div>
                    <p className={styles.precio}>$<span>{producto.precio}</span></p>
                    <p className={styles.subtotal}>Subtotal:$<span>{producto.cantidad * producto.precio}</span></p>
                    <button className={styles.eliminar} onClick={() => eliminarProducto(producto.id)} type='button'>X</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <aside className={styles.resumen}>
            <h3>Resumen del Pedido</h3>
            <p>Total a pagar:<span>
              ${carrito.length !== 0 ? carrito.reduce((a, b) => a + b.cantidad * b.precio, 0) : '0'}
            </span>
            </p>
            <input className={styles.comprar} type="submit" value='COMPRAR' onClick={compraRealizada} />
          </aside>
        </div>
      </main>
    </Layout>

  )
}
