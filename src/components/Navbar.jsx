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
              <a href="#" className="nav-link">Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Books</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Members</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Reservations</a>
            </li>
          </ul>
        </div>

        <div className="navbar-user">
          <span className="user-info">
            Welcome, {user?.email || 'User'}
          </span>
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
