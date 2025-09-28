import { useState } from 'react'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AuthPage />
      </div>
    </AuthProvider>
  )
}

export default App
