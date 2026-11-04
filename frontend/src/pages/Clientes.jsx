import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { clienteService } from '../services/clienteService'

// Listagem de clientes (Read) com acoes de editar e remover.
export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  async function carregar() {
    setCarregando(true)
    setErro(null)
    try {
      setClientes(await clienteService.listar())
    } catch {
      setErro('Erro ao carregar clientes.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  async function handleRemover(id) {
    if (!window.confirm('Deseja realmente remover este cliente?')) return
    try {
      await clienteService.remover(id)
      carregar()
    } catch (err) {
      alert(err.response?.data?.mensagem || 'Não foi possível remover.')
    }
  }

  return (
    <div>
      <div className="page-header">
        <h2>Clientes</h2>
        <Link className="btn btn-primary" to="/clientes/novo">Novo cliente</Link>
      </div>

      {erro && <div className="alert alert-error">{erro}</div>}
      {carregando ? (
        <p>Carregando...</p>
      ) : clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Profissão</th>
              <th>Empregadoras</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.cpf}</td>
                <td>{c.profissao || '-'}</td>
                <td>{c.empregadoras?.length ?? 0}</td>
                <td className="actions">
                  <Link className="btn btn-sm" to={`/clientes/${c.id}/editar`}>Editar</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleRemover(c.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
