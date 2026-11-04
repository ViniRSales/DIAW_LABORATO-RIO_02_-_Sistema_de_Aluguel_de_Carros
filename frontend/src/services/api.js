import axios from 'axios'

// Cliente HTTP configurado com a URL base da API (variavel de ambiente Vite).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
})

// Interceptor: anexa o token JWT (quando existir) em todas as requisicoes.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor de resposta: em caso de 401, limpa a sessao e redireciona ao login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
