import Layout from "@/components/layout"
import Image from "next/image"
import Styles from '../styles/nosotros.module.css'


function Nosotros({ carrito }) {
  return (
    <>
      <Layout
        carrito={carrito}
        title='Nosotros'
        description='Sobre nosotros GuitarLA'>
        <main className="contenedor">
          <h2 className="heading">Nosotros</h2>
          <div className={Styles.contenido}>
            <Image src="/img/nosotros.jpg" width={1000} height={800} alt="imagen sobre nosotros" />
            <div >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur omnis hic error nisi necessitatibus officia explicabo totam exercitationem dicta vitae impedit perferendis id accusantium vel tempore nesciunt, quam amet deserunt?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus mollitia deserunt ad libero iste distinctio, explicabo porro cum quidem suscipit nobis ipsum maxime omnis placeat ducimus fugit voluptatibus natus rem!
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Nosotros