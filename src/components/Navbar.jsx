import { useAuth } from '../contexts/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Library Management</h2>
        </div>

        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#dashboard" className="nav-link">Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="#books" className="nav-link">Books</a>
            </li>
            <li className="nav-item">
              <a href="#reservations" className="nav-link">Reservations</a>
            </li>
          </ul>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <span className="user-name">Welcome, {user?.name || 'User'}</span>
            <span className="user-role">({user?.role || 'member'})</span>
          </div>
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
