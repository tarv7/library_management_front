import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { memberService } from '../services/memberService';
import BookCover from './BookCover';
import './MemberDashboard.css';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await memberService.getMemberDashboard();
        setDashboardData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'member') {
      fetchDashboardData();
    }
  }, [user]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">Error loading data: {error}</div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { member, borrowed_books, overdue_books, summary } = dashboardData;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-main">
            <h1>Member Dashboard</h1>
            <p className="header-subtitle">Manage your books and reservations</p>
          </div>
          <div className="member-info">
            <div className="member-avatar">
              <span>{member.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="member-details">
              <h2>Welcome, {member.name}!</h2>
              <p>{member.email_address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Borrowed Books</h3>
          <p className="stat-number">{summary.total_borrowed_books}</p>
        </div>
        <div className="stat-card overdue">
          <h3>Overdue Books</h3>
          <p className="stat-number">{summary.total_overdue_books}</p>
        </div>
      </div>

      {overdue_books && overdue_books.length > 0 && (
        <div className="section overdue-section">
          <h3>📚 Overdue Books</h3>
          <div className="books-list">
            {overdue_books.map((item) => (
              <div key={item.reservation_id} className="book-card overdue-card">
                <div className="book-content">
                  <div className="book-cover-section">
                    <BookCover
                      isbn={item.book.isbn}
                      title={item.book.title}
                      size="M"
                      width="70px"
                      height="105px"
                      className="book-cover-medium"
                    />
                  </div>
                  <div className="book-info">
                    <div className="book-header">
                      <h4>{item.book.title}</h4>
                      <span className="overdue-badge">{item.days_overdue} days overdue</span>
                    </div>
                    <div className="book-details">
                      <p><strong>Author:</strong> {item.book.author}</p>
                      <p><strong>Genre:</strong> {item.book.genre}</p>
                      <p><strong>ISBN:</strong> {item.book.isbn}</p>
                      <p><strong>Borrowed on:</strong> {formatDate(item.borrowed_on)}</p>
                      <p><strong>Due date:</strong> {formatDate(item.due_on)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {borrowed_books && borrowed_books.length > 0 && (
        <div className="section">
          <h3>📖 Borrowed Books</h3>
          <div className="books-list">
            {borrowed_books.map((item) => (
              <div key={item.reservation_id} className="book-card">
                <div className="book-content">
                  <div className="book-cover-section">
                    <BookCover
                      isbn={item.book.isbn}
                      title={item.book.title}
                      size="M"
                      width="70px"
                      height="105px"
                      className="book-cover-medium"
                    />
                  </div>
                  <div className="book-info">
                    <div className="book-header">
                      <h4>{item.book.title}</h4>
                    </div>
                    <div className="book-details">
                      <p><strong>Author:</strong> {item.book.author}</p>
                      <p><strong>Genre:</strong> {item.book.genre}</p>
                      <p><strong>ISBN:</strong> {item.book.isbn}</p>
                      <p><strong>Borrowed on:</strong> {formatDate(item.borrowed_on)}</p>
                      <p><strong>Due date:</strong> {formatDate(item.due_on)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!borrowed_books || borrowed_books.length === 0) && (!overdue_books || overdue_books.length === 0) && (
        <div className="empty-state">
          <p>You don't have any borrowed books at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;
