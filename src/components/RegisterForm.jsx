import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './AuthForm.css'

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member'
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Password confirmation is required'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.role) {
      newErrors.role = 'Role is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})
    setSuccessMessage('')

    try {
      const response = await register(formData)

      setSuccessMessage('Registration successful! You can now login with your credentials.')

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'member'
      })

      setTimeout(() => {
        if (onSwitchToLogin) {
          onSwitchToLogin()
        }
      }, 2000)

    } catch (error) {
      console.error('Registration error:', error)

      if (error.status === 422 && error.errors) {
        const backendErrors = {}

        if (error.errors.email_address) {
          backendErrors.email = error.errors.email_address[0]
        }
        if (error.errors.password) {
          backendErrors.password = error.errors.password[0]
        }
        if (error.errors.name) {
          backendErrors.name = error.errors.name[0]
        }
        if (error.errors.role) {
          backendErrors.role = error.errors.role[0]
        }

        setErrors(backendErrors)
      } else {
        setErrors({
          general: error.message || 'Registration failed. Please try again.'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form-container">
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {errors.general && (
        <div className="error-message general-error">
          {errors.general}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Enter your name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter your email"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={errors.role ? 'error' : ''}
        >
          <option value="member">Member</option>
          <option value="librarian">Librarian</option>
        </select>
        {errors.role && <span className="error-message">{errors.role}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'error' : ''}
          placeholder="Enter a password"
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'error' : ''}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>

      <div className="switch-form">
        <p>
          Already have an account?
          <button
            type="button"
            className="link-button"
            onClick={onSwitchToLogin}
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm
