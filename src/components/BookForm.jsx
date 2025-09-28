import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { bookService } from '../services/bookService';
import BookCover from './BookCover';
import './BookForm.css';

const BookForm = ({ onClose, onSuccess, editBook = null }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    title: editBook?.title || '',
    author: editBook?.author || '',
    genre: editBook?.genre || '',
    isbn: editBook?.isbn || '',
    total_copies: editBook?.total_copies || 1
  });

  const genres = [
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

  const isEditing = !!editBook;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setValidationErrors({});

      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        genre: formData.genre,
        isbn: formData.isbn.trim(),
        total_copies: parseInt(formData.total_copies)
      };

      let result;
      if (isEditing) {
        // TODO: Implement update book
        result = { ...editBook, ...bookData };
      } else {
        result = await bookService.createBook(bookData);
      }

      onSuccess(result);
      onClose();
    } catch (error) {
      if (error.status === 422) {
        setValidationErrors(error.errors);
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-overlay" onClick={onClose}>
      <div className="book-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="book-form-header">
          <h2>{isEditing ? 'Edit Book' : 'Create New Book'}</h2>
          <button className="close-btn" onClick={onClose} title="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="book-form-content">
          <div className="book-form-main">
            <div className="book-preview-section">
              <div className="preview-label">Book Preview:</div>
              <BookCover
                isbn={formData.isbn}
                title={formData.title || 'Book Title'}
                size="L"
                width="180px"
                height="270px"
                className="book-cover-preview"
              />
            </div>

            <div className="book-form-fields">
              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter book title"
                  className={validationErrors.title ? 'error' : ''}
                  disabled={loading}
                />
                {validationErrors.title && (
                  <div className="field-errors">
                    {validationErrors.title.map((error, index) => (
                      <span key={index} className="field-error">{error}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="author">Author *</label>
                <input
                  id="author"
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Enter author name"
                  className={validationErrors.author ? 'error' : ''}
                  disabled={loading}
                />
                {validationErrors.author && (
                  <div className="field-errors">
                    {validationErrors.author.map((error, index) => (
                      <span key={index} className="field-error">{error}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="genre">Genre *</label>
                  <select
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => handleInputChange('genre', e.target.value)}
                    className={validationErrors.genre ? 'error' : ''}
                    disabled={loading}
                  >
                    <option value="">Select a genre</option>
                    {genres.map((genre) => (
                      <option key={genre.value} value={genre.value}>
                        {genre.label}
                      </option>
                    ))}
                  </select>
                  {validationErrors.genre && (
                    <div className="field-errors">
                      {validationErrors.genre.map((error, index) => (
                        <span key={index} className="field-error">{error}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="total_copies">Copies *</label>
                  <input
                    id="total_copies"
                    type="number"
                    min="1"
                    value={formData.total_copies}
                    onChange={(e) => handleInputChange('total_copies', e.target.value)}
                    placeholder="Number of copies"
                    className={validationErrors.total_copies ? 'error' : ''}
                    disabled={loading}
                  />
                  {validationErrors.total_copies && (
                    <div className="field-errors">
                      {validationErrors.total_copies.map((error, index) => (
                        <span key={index} className="field-error">{error}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="isbn">ISBN *</label>
                <input
                  id="isbn"
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  placeholder="978-0-7432-7356-5"
                  className={validationErrors.isbn ? 'error' : ''}
                  disabled={loading}
                />
                {validationErrors.isbn && (
                  <div className="field-errors">
                    {validationErrors.isbn.map((error, index) => (
                      <span key={index} className="field-error">{error}</span>
                    ))}
                  </div>
                )}
                <small className="form-hint">
                  Enter the ISBN to automatically load the book cover
                </small>
              </div>
            </div>
          </div>

          <div className="book-form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner-inline"></span>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {isEditing ? '✏️ Update Book' : '📚 Create Book'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
