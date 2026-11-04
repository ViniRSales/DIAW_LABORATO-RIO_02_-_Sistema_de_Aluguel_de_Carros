import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Tela de login (usuario e senha). Acesso obrigatorio ao sistema.
export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setCarregando(true)
    try {
      await login(username, senha)
      navigate('/clientes')
    } catch (err) {
      setErro(err.response?.data?.mensagem || 'Falha no login. Verifique as credenciais.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="auth-container">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <h1>🚗 Aluguel de Carros</h1>
        <h2>Entrar</h2>

        {erro && <div className="alert alert-error">{erro}</div>}

        <label>
          Usuário
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>

        <button className="btn btn-primary" type="submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="auth-footer">
          Não tem conta? <Link to="/registro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  )
}
