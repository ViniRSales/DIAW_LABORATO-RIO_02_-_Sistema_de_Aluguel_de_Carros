import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from './Logo.jsx'

// Layout com barra de navegacao presente nas telas internas.
export default function Layout() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <header className="navbar">
        <div className="navbar-brand"><Logo size={24} /> Aluguel de Carros</div>
        <nav className="navbar-links">
          <Link to="/automoveis">Frota</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/pedidos">Pedidos</Link>
        </nav>
        <div className="navbar-user">
          <span>{usuario?.username} ({usuario?.perfil})</span>
          <button className="btn btn-sm" onClick={handleLogout}>Sair</button>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}
