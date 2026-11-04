import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { automovelService, clienteLookup, pedidoService } from '../services/pedidoService'

// Mapa de cores/rotulos por status para exibicao visual.
const STATUS_LABEL = {
  CRIADO: 'Criado',
  EM_ANALISE: 'Em análise',
  APROVADO: 'Aprovado',
  REPROVADO: 'Reprovado',
  CANCELADO: 'Cancelado',
  CONTRATADO: 'Contratado'
}

// Prototipo: permite criar pedidos de aluguel e visualizar o status.
// Agentes tambem podem avaliar (parecer positivo/negativo).
export default function Pedidos() {
  const { usuario } = useAuth()
  const isAgente = usuario?.perfil === 'AGENTE'

  const [pedidos, setPedidos] = useState([])
  const [clientes, setClientes] = useState([])
  const [automoveis, setAutomoveis] = useState([])
  const [form, setForm] = useState({ clienteId: '', automovelId: '', valorMensal: '' })
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(true)

  async function carregar() {
    setCarregando(true)
    setErro(null)
    try {
      const [p, c, a] = await Promise.all([
        pedidoService.listar(),
        clienteLookup.listar(),
        automovelService.listar()
      ])
      setPedidos(p)
      setClientes(c)
      setAutomoveis(a)
    } catch {
      setErro('Erro ao carregar os dados de pedidos.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleCriar(e) {
    e.preventDefault()
    setErro(null)
    try {
      await pedidoService.criar(form.clienteId, {
        automovelId: Number(form.automovelId),
        valorMensal: Number(form.valorMensal)
      })
      setForm({ clienteId: '', automovelId: '', valorMensal: '' })
      carregar()
    } catch (err) {
      setErro(err.response?.data?.mensagem || 'Não foi possível criar o pedido.')
    }
  }

  async function handleCancelar(id) {
    try {
      await pedidoService.cancelar(id)
      carregar()
    } catch (err) {
      alert(err.response?.data?.mensagem || 'Não foi possível cancelar.')
    }
  }

  async function handleAvaliar(id, parecerPositivo) {
    try {
      await pedidoService.avaliar(id, parecerPositivo)
      carregar()
    } catch (err) {
      alert(err.response?.data?.mensagem || 'Não foi possível avaliar.')
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2>Pedidos de aluguel</h2>
      </div>

      {erro && <div className="alert alert-error">{erro}</div>}

      <form className="card" onSubmit={handleCriar}>
        <h3>Novo pedido</h3>
        <div className="form-grid">
          <label>
            Cliente
            <select name="clienteId" value={form.clienteId} onChange={handleChange} required>
              <option value="">Selecione...</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nome} ({c.cpf})</option>
              ))}
            </select>
          </label>
          <label>
            Automóvel
            <select name="automovelId" value={form.automovelId} onChange={handleChange} required>
              <option value="">Selecione...</option>
              {automoveis.map((a) => (
                <option key={a.id} value={a.id}>{a.marca} {a.modelo} - {a.placa}</option>
              ))}
            </select>
          </label>
          <label>
            Valor mensal (R$)
            <input type="number" step="0.01" min="0" name="valorMensal" value={form.valorMensal} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">Criar pedido</button>
        </div>
        {clientes.length === 0 && <p className="hint">Cadastre um cliente antes de criar pedidos.</p>}
        {automoveis.length === 0 && <p className="hint">Nenhum automóvel disponível. Cadastre automóveis na API.</p>}
      </form>

      <h3 className="mt">Meus pedidos / Todos os pedidos</h3>
      {carregando ? (
        <p>Carregando...</p>
      ) : pedidos.length === 0 ? (
        <p>Nenhum pedido cadastrado.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Automóvel</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.clienteNome}</td>
                <td>{p.automovelDescricao || '-'}</td>
                <td>{p.valorMensal != null ? `R$ ${Number(p.valorMensal).toFixed(2)}` : '-'}</td>
                <td>
                  <span className={`status status-${p.status?.toLowerCase()}`}>
                    {STATUS_LABEL[p.status] || p.status}
                  </span>
                </td>
                <td className="actions">
                  {p.status !== 'CONTRATADO' && p.status !== 'CANCELADO' && (
                    <button className="btn btn-sm btn-danger" onClick={() => handleCancelar(p.id)}>Cancelar</button>
                  )}
                  {isAgente && (p.status === 'CRIADO' || p.status === 'EM_ANALISE') && (
                    <>
                      <button className="btn btn-sm" onClick={() => handleAvaliar(p.id, true)}>Aprovar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleAvaliar(p.id, false)}>Reprovar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
