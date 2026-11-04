import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Clientes from './pages/Clientes.jsx'
import ClienteForm from './pages/ClienteForm.jsx'
import Pedidos from './pages/Pedidos.jsx'

// Rotas da aplicacao. As rotas internas exigem autenticacao.
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<ClienteForm />} />
        <Route path="/clientes/:id/editar" element={<ClienteForm />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Route>

      <Route path="*" element={<Navigate to="/clientes" replace />} />
    </Routes>
  )
}
