import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { reservationService } from '../services/reservationService';
import BookCover from './BookCover';
import './Reservations.css';

const Reservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    book_id: '',
    user_id: '',
    situation: ''
  });

  const situations = [
    { value: '', label: 'All Reservations' },
    { value: 'not_returned', label: 'Active (Not Returned)' },
    { value: 'returned', label: 'Returned' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'due_today', label: 'Due Today' }
  ];

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async (customFilters = filters) => {
    try {
      setLoading(true);
      setError(null);

      const activeFilters = Object.entries(customFilters).reduce((acc, [key, value]) => {
        if (value && value.trim() !== '') {
          acc[key] = value.trim();
        }
        return acc;
      }, {});

      const data = await reservationService.getReservations(activeFilters);
      setReservations(data.reservations || []);
      setMetadata(data.metadata || null);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    fetchReservations(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { book_id: '', user_id: '', situation: '' };
    setFilters(clearedFilters);
    fetchReservations(clearedFilters);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  const formatGenre = (genre) => {
    return genre.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'not_returned':
        return 'status-active';
      case 'returned':
        return 'status-returned';
      case 'overdue':
        return 'status-overdue';
      case 'due_today':
        return 'status-due-today';
      default:
        return 'status-active';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'not_returned':
        return 'Active';
      case 'returned':
        return 'Returned';
      case 'overdue':
        return 'Overdue';
      case 'due_today':
        return 'Due Today';
      default:
        return 'Active';
    }
  };  // Redirect if not librarian
  if (user?.role !== 'librarian') {
    return (
      <div className="reservations-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>Only librarians can access the reservations page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="reservations-container">
        <div className="loading">Loading reservations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reservations-container">
        <div className="error">Error loading reservations: {error}</div>
      </div>
    );
  }

  return (
    <div className="reservations-container">
      <div className="reservations-header">
        <div className="header-content">
          <div className="header-text">
            <h1>📋 Reservations Management</h1>
            <p>Manage and track all book reservations</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {metadata?.statistics && (
        <div className="statistics-cards">
          <div className="stat-card active">
            <div className="stat-number">{metadata.statistics.active_count}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card overdue">
            <div className="stat-number">{metadata.statistics.overdue_count}</div>
            <div className="stat-label">Overdue</div>
          </div>
          <div className="stat-card due-today">
            <div className="stat-number">{metadata.statistics.due_today_count}</div>
            <div className="stat-label">Due Today</div>
          </div>
          <div className="stat-card returned">
            <div className="stat-number">{metadata.statistics.returned_count}</div>
            <div className="stat-label">Returned</div>
          </div>
        </div>
      )}

      <div className="reservations-filters">
        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor="book-id-filter">Book ID:</label>
            <input
              id="book-id-filter"
              type="number"
              placeholder="Enter book ID..."
              value={filters.book_id}
              onChange={(e) => handleFilterChange('book_id', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="user-id-filter">User ID:</label>
            <input
              id="user-id-filter"
              type="number"
              placeholder="Enter user ID..."
              value={filters.user_id}
              onChange={(e) => handleFilterChange('user_id', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="situation-filter">Status:</label>
            <select
              id="situation-filter"
              value={filters.situation}
              onChange={(e) => handleFilterChange('situation', e.target.value)}
            >
              {situations.map((situation) => (
                <option key={situation.value} value={situation.value}>
                  {situation.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-actions">
            <button onClick={handleApplyFilters} className="btn-primary">
              🔍 Search
            </button>
            <button onClick={handleClearFilters} className="btn-secondary">
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      <div className="reservations-table-container">
        {reservations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No reservations found</h3>
            <p>Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Member</th>
                <th>Borrowed</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Returned</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="book-info">
                    <div className="book-details">
                      <BookCover
                        isbn={reservation.book.isbn}
                        title={reservation.book.title}
                        size="S"
                        width="40px"
                        height="60px"
                        className="reservation-book-cover"
                      />
                      <div className="book-text">
                        <strong>{reservation.book.title}</strong>
                        <div className="book-author">by {reservation.book.author}</div>
                        <span className={`genre-badge-small genre-${reservation.book.genre.replace(/_/g, '-')}`}>
                          {formatGenre(reservation.book.genre)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="member-info">
                    <div className="member-details">
                      <strong>{reservation.user.name}</strong>
                      <div className="member-email">{reservation.user.email_address}</div>
                      <span className="member-id">ID: #{reservation.user.id}</span>
                    </div>
                  </td>
                  <td>{formatDate(reservation.borrowed_on)}</td>
                  <td>{formatDate(reservation.due_on)}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </td>
                  <td>
                    {reservation.returned_at ? (
                      <span className="returned-date">
                        {formatDate(reservation.returned_at)}
                      </span>
                    ) : (
                      <span className="not-returned">Not returned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="reservations-summary">
        <p>
          Showing {reservations.length} reservation{reservations.length !== 1 ? 's' : ''}
          {metadata?.total_count && metadata.total_count !== reservations.length &&
            ` of ${metadata.total_count} total`
          }
        </p>
      </div>
    </div>
  );
};

export default Reservations;
