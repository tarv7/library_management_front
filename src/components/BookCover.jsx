import { useState } from 'react';
import { getBookCoverUrl } from '../utils/bookUtils';
import './BookCover.css';

const BookCover = ({
  isbn,
  title,
  size = 'M',
  width = '60px',
  height = '90px',
  className = '',
  showFallback = true
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const coverUrl = getBookCoverUrl(isbn, size);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!isbn || imageError) {
    if (!showFallback) return null;

    return (
      <div
        className={`book-cover-fallback ${className}`}
        style={{ width, height }}
        title={title}
      >
        <div className="book-cover-icon">📚</div>
      </div>
    );
  }

  return (
    <div className={`book-cover-container ${className}`} style={{ width, height }}>
      {!imageLoaded && (
        <div className="book-cover-loading" style={{ width, height }}>
          <div className="loading-spinner-small"></div>
        </div>
      )}
      <img
        src={coverUrl}
        alt={`Cover of ${title}`}
        className={`book-cover-image ${imageLoaded ? 'loaded' : ''}`}
        style={{ width, height }}
        onError={handleImageError}
        onLoad={handleImageLoad}
        title={title}
      />
    </div>
  );
};

export default BookCover;
