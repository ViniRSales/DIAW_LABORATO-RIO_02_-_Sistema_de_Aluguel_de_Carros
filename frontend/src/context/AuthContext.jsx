import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

// Provedor de autenticacao: guarda o usuario logado e expoe login/registro/logout.
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('usuario')
    return salvo ? JSON.parse(salvo) : null
  })

  function persistir(data) {
    localStorage.setItem('token', data.token)
    const dadosUsuario = { username: data.username, perfil: data.perfil }
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario))
    setUsuario(dadosUsuario)
  }

  async function login(username, senha) {
    const { data } = await api.post('/auth/login', { username, senha })
    persistir(data)
    return data
  }

  async function registrar(dados) {
    const { data } = await api.post('/auth/registrar', dados)
    persistir(data)
    return data
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout, autenticado: !!usuario }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
