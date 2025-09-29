import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      setCurrentPage(hash || 'dashboard')
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleLogout = () => {
    logout()
  }

  const isActive = (page) => {
    return currentPage === page ? 'nav-link active' : 'nav-link'
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
              <a href="#dashboard" className={isActive('dashboard')}>Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="#books" className={isActive('books')}>Books</a>
            </li>
            {user?.role === 'librarian' && (
              <li className="nav-item">
                <a href="#reservations" className={isActive('reservations')}>Reservations</a>
              </li>
            )}
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
