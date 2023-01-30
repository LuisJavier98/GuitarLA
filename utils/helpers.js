export const formatearFecha = fecha => {
  const fechaNueva = new Date(fecha)
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }
  return fechaNueva.toLocaleDateString('es-ES', options)
}