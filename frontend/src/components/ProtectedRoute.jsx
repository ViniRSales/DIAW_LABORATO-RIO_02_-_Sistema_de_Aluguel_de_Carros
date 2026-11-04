import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Impede acesso a rotas internas sem autenticacao.
export default function ProtectedRoute({ children }) {
  const { autenticado } = useAuth()
  if (!autenticado) {
    return <Navigate to="/login" replace />
  }
  return children
}
