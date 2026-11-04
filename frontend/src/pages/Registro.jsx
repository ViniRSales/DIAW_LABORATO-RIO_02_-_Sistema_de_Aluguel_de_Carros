import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Tela de cadastro de usuario (cliente ou agente).
export default function Registro() {
  const { registrar } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', senha: '', email: '', perfil: 'CLIENTE' })
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setCarregando(true)
    try {
      await registrar(form)
      navigate('/automoveis')
    } catch (err) {
      setErro(err.response?.data?.mensagem || 'Não foi possível concluir o cadastro.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="auth-container">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>🚗 Aluguel de Carros</h1>
        <h2>Cadastro</h2>

        {erro && <div className="alert alert-error">{erro}</div>}

        <label>
          Usuário
          <input name="username" value={form.username} onChange={handleChange} required minLength={3} />
        </label>
        <label>
          Senha
          <input type="password" name="senha" value={form.senha} onChange={handleChange} required minLength={6} />
        </label>
        <label>
          E-mail
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          Perfil
          <select name="perfil" value={form.perfil} onChange={handleChange}>
            <option value="CLIENTE">Cliente</option>
            <option value="AGENTE">Agente</option>
          </select>
        </label>

        <button className="btn btn-primary" type="submit" disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </div>
  )
}
