import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CarImage from '../components/CarImage.jsx'
import { automovelService } from '../services/pedidoService'

// Catalogo visual de automoveis da frota, com cards modernos (paleta azul).
export default function Automoveis() {
  const navigate = useNavigate()
  const [automoveis, setAutomoveis] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [filtro, setFiltro] = useState('Todas')

  useEffect(() => {
    automovelService
      .listar()
      .then(setAutomoveis)
      .catch(() => setErro('Erro ao carregar a frota de automóveis.'))
      .finally(() => setCarregando(false))
  }, [])

  const categorias = useMemo(() => {
    const set = new Set(automoveis.map((a) => a.categoria).filter(Boolean))
    return ['Todas', ...Array.from(set)]
  }, [automoveis])

  const lista = useMemo(
    () => (filtro === 'Todas' ? automoveis : automoveis.filter((a) => a.categoria === filtro)),
    [automoveis, filtro]
  )

  return (
    <div>
      <div className="catalogo-hero">
        <div>
          <h2>Nossa frota</h2>
          <p>Escolha o carro ideal e crie seu pedido de aluguel em poucos cliques.</p>
        </div>
        <span className="catalogo-badge">{automoveis.length} veículos disponíveis</span>
      </div>

      {erro && <div className="alert alert-error">{erro}</div>}

      {categorias.length > 1 && (
        <div className="chips">
          {categorias.map((c) => (
            <button
              key={c}
              className={`chip ${filtro === c ? 'chip-active' : ''}`}
              onClick={() => setFiltro(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {carregando ? (
        <p>Carregando frota...</p>
      ) : lista.length === 0 ? (
        <p>Nenhum automóvel disponível.</p>
      ) : (
        <div className="car-grid">
          {lista.map((a) => (
            <article className="car-card" key={a.id}>
              <div className="car-card-art">
                <span className="car-cat-tag">{a.categoria || 'Veículo'}</span>
                <CarImage marca={a.marca} modelo={a.modelo} categoria={a.categoria} />
              </div>
              <div className="car-card-body">
                <h3>{a.marca} {a.modelo}</h3>
                <div className="car-specs">
                  <span className="spec">📅 {a.ano}</span>
                  <span className="spec">🚗 {a.placa}</span>
                  <span className="spec">🏢 {proprietarioLabel(a.tipoProprietario)}</span>
                </div>
                <div className="car-card-footer">
                  <div className="car-price">
                    {a.valorDiaria != null ? (
                      <>
                        <strong>R$ {Number(a.valorDiaria).toFixed(2)}</strong>
                        <small>/ diária</small>
                      </>
                    ) : (
                      <small>Consulte valores</small>
                    )}
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => navigate('/pedidos')}>
                    Alugar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function proprietarioLabel(tipo) {
  switch (tipo) {
    case 'CLIENTE':
      return 'Cliente'
    case 'EMPRESA':
      return 'Empresa'
    case 'BANCO':
      return 'Banco'
    default:
      return '-'
  }
}
