import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { bookService } from '../services/bookService';
import BookCover from './BookCover';
import './BookDetail.css';

const BookDetail = ({ bookId, onClose }) => {
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await bookService.getBook(bookId);
      setBook(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    if (!window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      return;
    }

    try {
      await bookService.deleteBook(book.id);
      alert('Book deleted successfully!');
      onClose();
    } catch (error) {
      alert(`Error deleting book: ${error.message}`);
    }
  };

  const formatGenre = (genre) => {
    return genre.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="book-detail-overlay">
        <div className="book-detail-modal">
          <div className="loading">Loading book details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-detail-overlay">
        <div className="book-detail-modal">
          <div className="book-detail-header">
            <h2>Error</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          <div className="error">Error loading book: {error}</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="book-detail-overlay" onClick={onClose}>
      <div className="book-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="book-detail-header">
          <h2>Book Details</h2>
          <button className="close-btn" onClick={onClose} title="Close">✕</button>
        </div>

        <div className="book-detail-content">
          <div className="book-detail-main">
            <div className="book-cover-large-section">
              <BookCover
                isbn={book.isbn}
                title={book.title}
                size="L"
                width="200px"
                height="300px"
                className="book-cover-large"
              />
            </div>

            <div className="book-info-section">
              <div className="book-title-section">
                <h1>{book.title}</h1>
                <p className="book-author">by {book.author}</p>
                <span className={`genre-badge-large genre-${book.genre.replace(/_/g, '-')}`}>
                  {formatGenre(book.genre)}
                </span>
              </div>

              <div className="book-details-grid">
                <div className="detail-item">
                  <label>Book ID:</label>
                  <span>#{book.id}</span>
                </div>

                <div className="detail-item">
                  <label>ISBN:</label>
                  <span className="isbn-value">{book.isbn}</span>
                </div>

                <div className="detail-item">
                  <label>Total Copies:</label>
                  <span className="copies-value">{book.total_copies}</span>
                </div>

                <div className="detail-item">
                  <label>Registered:</label>
                  <span>{formatDate(book.created_at)}</span>
                </div>

                <div className="detail-item">
                  <label>Last Updated:</label>
                  <span>{formatDate(book.updated_at)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="book-detail-actions">
            {user?.role === 'librarian' ? (
              <div className="librarian-actions">
                <button
                  className="btn-primary"
                  onClick={() => alert(`Edit functionality for: ${book.title}`)}
                >
                  ✏️ Edit Book
                </button>
                <button
                  className="btn-danger"
                  onClick={handleDeleteBook}
                >
                  🗑️ Delete Book
                </button>
                <button
                  className="btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="member-actions">
                <button
                  className="btn-primary"
                  onClick={() => alert(`Reserve functionality for: ${book.title}`)}
                >
                  📚 Reserve Book
                </button>
                <button
                  className="btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
