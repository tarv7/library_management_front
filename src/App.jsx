import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Books from './components/Books'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import './App.css'

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove the '#' from hash
      if (hash) {
        setCurrentPage(hash)
      } else {
        setCurrentPage('dashboard')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'books':
        return <Books />
      case 'reservations':
        return <div style={{padding: '2rem', textAlign: 'center'}}>Reservations page coming soon...</div>
      case 'members':
        return <div style={{padding: '2rem', textAlign: 'center'}}>Members page coming soon...</div>
      case 'dashboard':
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <Navbar />
          {renderPage()}
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
