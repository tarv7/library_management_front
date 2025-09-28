import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import './AuthPage.css'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Library Management System</h1>
          <p>Welcome to the library management system</p>
        </div>

        <div className="auth-toggle">
          <button
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <div className="auth-form">
          {isLogin ? <LoginForm /> : <RegisterForm onSwitchToLogin={toggleAuthMode} />}
        </div>

        {isLogin && (
          <div className="auth-footer">
            <p>
              Don't have an account?
              <button
                className="link-button"
                onClick={() => setIsLogin(false)}
              >
                Sign up here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthPage
