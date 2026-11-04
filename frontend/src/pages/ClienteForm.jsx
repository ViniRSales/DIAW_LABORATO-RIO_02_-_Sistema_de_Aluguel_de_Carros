import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { clienteService } from '../services/clienteService'

const MAX_EMPREGADORAS = 3

const estadoInicial = {
  rg: '',
  cpf: '',
  nome: '',
  endereco: '',
  profissao: '',
  empregadoras: []
}

// Formulario de criacao e edicao de cliente, incluindo as entidades
// empregadoras (maximo de 3) com seus rendimentos.
export default function ClienteForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const edicao = Boolean(id)

  const [form, setForm] = useState(estadoInicial)
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (edicao) {
      clienteService
        .buscar(id)
        .then((c) =>
          setForm({
            rg: c.rg || '',
            cpf: c.cpf || '',
            nome: c.nome || '',
            endereco: c.endereco || '',
            profissao: c.profissao || '',
            empregadoras: c.empregadoras || []
          })
        )
        .catch(() => setErro('Erro ao carregar o cliente.'))
    }
  }, [id, edicao])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function adicionarEmpregadora() {
    if (form.empregadoras.length >= MAX_EMPREGADORAS) return
    setForm({ ...form, empregadoras: [...form.empregadoras, { nome: '', rendimento: '' }] })
  }

  function atualizarEmpregadora(indice, campo, valor) {
    const lista = form.empregadoras.map((item, i) =>
      i === indice ? { ...item, [campo]: valor } : item
    )
    setForm({ ...form, empregadoras: lista })
  }

  function removerEmpregadora(indice) {
    setForm({ ...form, empregadoras: form.empregadoras.filter((_, i) => i !== indice) })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setSalvando(true)

    const payload = {
      ...form,
      empregadoras: form.empregadoras.map((emp) => ({
        nome: emp.nome,
        rendimento: Number(emp.rendimento)
      }))
    }

    try {
      if (edicao) {
        await clienteService.atualizar(id, payload)
      } else {
        await clienteService.criar(payload)
      }
      navigate('/clientes')
    } catch (err) {
      setErro(err.response?.data?.mensagem || 'Erro ao salvar o cliente.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2>{edicao ? 'Editar cliente' : 'Novo cliente'}</h2>
      </div>

      {erro && <div className="alert alert-error">{erro}</div>}

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Nome
            <input name="nome" value={form.nome} onChange={handleChange} required />
          </label>
          <label>
            RG
            <input name="rg" value={form.rg} onChange={handleChange} required />
          </label>
          <label>
            CPF
            <input name="cpf" value={form.cpf} onChange={handleChange} required />
          </label>
          <label>
            Profissão
            <input name="profissao" value={form.profissao} onChange={handleChange} />
          </label>
          <label className="full">
            Endereço
            <input name="endereco" value={form.endereco} onChange={handleChange} required />
          </label>
        </div>

        <div className="empregadoras">
          <div className="page-header">
            <h3>Entidades empregadoras (máx. 3)</h3>
            <button
              type="button"
              className="btn btn-sm"
              onClick={adicionarEmpregadora}
              disabled={form.empregadoras.length >= MAX_EMPREGADORAS}
            >
              Adicionar
            </button>
          </div>

          {form.empregadoras.length === 0 && <p>Nenhuma entidade empregadora.</p>}

          {form.empregadoras.map((emp, i) => (
            <div className="empregadora-row" key={i}>
              <input
                placeholder="Nome da entidade"
                value={emp.nome}
                onChange={(e) => atualizarEmpregadora(i, 'nome', e.target.value)}
                required
              />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Rendimento"
                value={emp.rendimento}
                onChange={(e) => atualizarEmpregadora(i, 'rendimento', e.target.value)}
                required
              />
              <button type="button" className="btn btn-sm btn-danger" onClick={() => removerEmpregadora(i)}>
                Remover
              </button>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button className="btn" type="button" onClick={() => navigate('/clientes')}>Cancelar</button>
          <button className="btn btn-primary" type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  )
}
