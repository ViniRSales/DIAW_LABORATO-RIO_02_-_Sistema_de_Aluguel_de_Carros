import { useState } from 'react'
import CarIcon from './CarIcon.jsx'
import { carImageUrl } from '../services/carImage'

// Exibe a foto real do carro (CDN por marca/modelo). Caso a imagem
// nao carregue, faz fallback para a ilustracao SVG por categoria.
export default function CarImage({ marca, modelo, categoria }) {
  const [erro, setErro] = useState(false)

  if (erro) {
    return <CarIcon categoria={categoria || ''} size={130} />
  }

  return (
    <img
      className="car-photo"
      src={carImageUrl(marca, modelo)}
      alt={`${marca} ${modelo}`}
      loading="lazy"
      onError={() => setErro(true)}
    />
  )
}
