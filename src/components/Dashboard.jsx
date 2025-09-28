import { useAuth } from '../contexts/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.email || 'User'}!</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
