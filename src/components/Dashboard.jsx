import { useAuth } from '../contexts/AuthContext'
import MemberDashboard from './MemberDashboard'
import LibrarianDashboard from './LibrarianDashboard'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()

  if (user?.role === 'member') {
    return <MemberDashboard />
  }

  if (user?.role === 'librarian') {
    return <LibrarianDashboard />
  }

  // Genereric dashboard for other roles or no role
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, <strong>{user?.name || 'User'}</strong>!</p>
          <p className="user-role-info">You are logged in as a <strong>{user?.role || 'user'}</strong></p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
