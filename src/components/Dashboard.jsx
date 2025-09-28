import { useAuth } from '../contexts/AuthContext'
import MemberDashboard from './MemberDashboard'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()

  // Se for member, mostra o MemberDashboard
  if (user?.role === 'member') {
    return <MemberDashboard />
  }

  // Dashboard genérico para outros roles (por enquanto)
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, <strong>{user?.name || 'User'}</strong>!</p>
          <p className="user-role-info">You are logged in as a <strong>{user?.role || 'member'}</strong></p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
