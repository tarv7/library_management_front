import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { librarianService } from '../services/librarianService';
import './LibrarianDashboard.css';

const LibrarianDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await librarianService.getLibrarianDashboard();
        setDashboardData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'librarian') {
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

  const { librarian, statistics, books_due_today, members_with_overdue_books } = dashboardData;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-main">
            <h1>Librarian Dashboard</h1>
            <p className="header-subtitle">Library management and oversight</p>
          </div>
          <div className="librarian-info">
            <div className="librarian-avatar">
              <span>{librarian.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="librarian-details">
              <h2>Welcome, {librarian.name}!</h2>
              <p>{librarian.email_address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card total-books">
          <div className="stat-icon">📚</div>
          <h3>Total Books</h3>
          <p className="stat-number">{statistics.total_books}</p>
        </div>
        <div className="stat-card borrowed-books">
          <div className="stat-icon">📖</div>
          <h3>Borrowed Books</h3>
          <p className="stat-number">{statistics.total_borrowed_books}</p>
        </div>
        <div className="stat-card due-today">
          <div className="stat-icon">⏰</div>
          <h3>Due Today</h3>
          <p className="stat-number">{statistics.books_due_today_count}</p>
        </div>
        <div className="stat-card overdue-members">
          <div className="stat-icon">⚠️</div>
          <h3>Members with Overdue</h3>
          <p className="stat-number">{statistics.members_with_overdue_books_count}</p>
        </div>
      </div>

      {books_due_today && books_due_today.length > 0 && (
        <div className="section due-today-section">
          <h3>📅 Books Due Today</h3>
          <div className="books-list">
            {books_due_today.map((item) => (
              <div key={item.reservation_id} className="book-card due-today-card">
                <div className="book-header">
                  <h4>{item.book.title}</h4>
                  <span className="due-badge">Due Today</span>
                </div>
                <div className="book-details">
                  <p><strong>Author:</strong> {item.book.author}</p>
                  <p><strong>Genre:</strong> {item.book.genre}</p>
                  <p><strong>ISBN:</strong> {item.book.isbn}</p>
                  <p><strong>Borrowed on:</strong> {formatDate(item.borrowed_on)}</p>
                </div>
                <div className="member-info-card">
                  <p><strong>Member:</strong> {item.member.name}</p>
                  <p><strong>Email:</strong> {item.member.email_address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {members_with_overdue_books && members_with_overdue_books.length > 0 && (
        <div className="section overdue-section">
          <h3>🚨 Members with Overdue Books</h3>
          <div className="members-list">
            {members_with_overdue_books.map((memberData) => (
              <div key={memberData.member_id} className="member-card">
                <div className="member-header">
                  <div className="member-avatar-small">
                    {memberData.member_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="member-info">
                    <h4>{memberData.member_name}</h4>
                    <p>{memberData.member_email}</p>
                  </div>
                  <span className="overdue-count">
                    {memberData.overdue_books.length} overdue
                  </span>
                </div>
                <div className="overdue-books-list">
                  {memberData.overdue_books.map((book) => (
                    <div key={book.reservation_id} className="overdue-book-item">
                      <div className="book-title">{book.book.title}</div>
                      <div className="book-meta">
                        <span>by {book.book.author}</span>
                        <span className="days-overdue">{book.days_overdue} days overdue</span>
                      </div>
                      <div className="book-dates">
                        <span>Borrowed: {formatDate(book.borrowed_on)}</span>
                        <span>Due: {formatDate(book.due_on)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!books_due_today || books_due_today.length === 0) &&
       (!members_with_overdue_books || members_with_overdue_books.length === 0) && (
        <div className="empty-state">
          <div className="empty-icon">✅</div>
          <h3>All Good!</h3>
          <p>No books due today and no overdue books. Great job managing the library!</p>
        </div>
      )}
    </div>
  );
};

export default LibrarianDashboard;
