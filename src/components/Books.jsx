import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { bookService } from '../services/bookService';
import BookDetail from './BookDetail';
import BookForm from './BookForm';
import './Books.css';

const Books = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    genre: ''
  });
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const genres = [
    { value: '', label: 'All Genres' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'non_fiction', label: 'Non Fiction' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'science_fiction', label: 'Science Fiction' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'romance', label: 'Romance' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'biography', label: 'Biography' },
    { value: 'history', label: 'History' },
    { value: 'poetry', label: 'Poetry' },
    { value: 'drama', label: 'Drama' }
  ];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (customFilters = filters) => {
    try {
      setLoading(true);
      setError(null);

      const activeFilters = Object.entries(customFilters).reduce((acc, [key, value]) => {
        if (value && value.trim() !== '') {
          acc[key] = value.trim();
        }
        return acc;
      }, {});

      const data = await bookService.getBooks(activeFilters);
      setBooks(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    fetchBooks(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { title: '', author: '', genre: '' };
    setFilters(clearedFilters);
    fetchBooks(clearedFilters);
  };

  const handleDeleteBook = async (bookId, bookTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
      return;
    }

    try {
      await bookService.deleteBook(bookId);
      fetchBooks();
    } catch (error) {
      alert(`Error deleting book: ${error.message}`);
    }
  };

  const handleViewBook = (bookId) => {
    setSelectedBookId(bookId);
  };

  const handleCloseBookDetail = () => {
    setSelectedBookId(null);
  };

  const handleCreateBook = () => {
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  const handleCreateSuccess = (newBook) => {
    fetchBooks();
    setShowCreateForm(false);
    alert(`Book "${newBook.title}" created successfully!`);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  const handleCloseEditForm = () => {
    setEditingBook(null);
  };

  const handleEditSuccess = (updatedBook) => {
    fetchBooks();
    setEditingBook(null);
    alert(`Book "${updatedBook.title}" updated successfully!`);
  };

  const formatGenre = (genre) => {
    return genre.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  if (loading) {
    return (
      <div className="books-container">
        <div className="loading">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="books-container">
        <div className="error">Error loading books: {error}</div>
      </div>
    );
  }

  return (
    <div className="books-container">
      <div className="books-header">
        <div className="header-content">
          <div className="header-text">
            <h1>📚 Books Library</h1>
            <p>Browse and manage the book collection</p>
          </div>
          {user?.role === 'librarian' && (
            <button
              className="btn-primary add-book-btn"
              onClick={handleCreateBook}
            >
              ➕ Add New Book
            </button>
          )}
        </div>
      </div>

      <div className="books-filters">
        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor="title-filter">Title:</label>
            <input
              id="title-filter"
              type="text"
              placeholder="Search by title..."
              value={filters.title}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="author-filter">Author:</label>
            <input
              id="author-filter"
              type="text"
              placeholder="Search by author..."
              value={filters.author}
              onChange={(e) => handleFilterChange('author', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyFilters()}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="genre-filter">Genre:</label>
            <select
              id="genre-filter"
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
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

      <div className="books-table-container">
        {books.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📖</div>
            <h3>No books found</h3>
            <p>Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <table className="books-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>ISBN</th>
                <th>Copies</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="book-title">
                    <strong>{book.title}</strong>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <span className={`genre-badge genre-${book.genre.replace(/_/g, '-')}`}>
                      {formatGenre(book.genre)}
                    </span>
                  </td>
                  <td className="isbn">{book.isbn}</td>
                  <td className="copies-count">{book.total_copies}</td>
                  <td>{formatDate(book.created_at)}</td>
                  <td className="actions">
                    <button
                      className="action-btn view-btn"
                      title="View Details"
                      onClick={() => handleViewBook(book.id)}
                    >
                      👁️
                    </button>
                    {user?.role === 'librarian' && (
                      <>
                        <button
                          className="action-btn edit-btn"
                          title="Edit Book"
                          onClick={() => handleEditBook(book)}
                        >
                          ✏️
                        </button>
                        <button
                          className="action-btn delete-btn"
                          title="Delete Book"
                          onClick={() => handleDeleteBook(book.id, book.title)}
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="books-summary">
        <p>Showing {books.length} book{books.length !== 1 ? 's' : ''}</p>
      </div>

      {selectedBookId && (
        <BookDetail
          bookId={selectedBookId}
          onClose={handleCloseBookDetail}
          onEdit={handleEditBook}
        />
      )}

      {showCreateForm && (
        <BookForm
          onClose={handleCloseCreateForm}
          onSuccess={handleCreateSuccess}
        />
      )}

      {editingBook && (
        <BookForm
          editBook={editingBook}
          onClose={handleCloseEditForm}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default Books;
