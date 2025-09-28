export const getBookCoverUrl = (isbn, size = 'M') => {
  if (!isbn) return null;

  const cleanIsbn = isbn.replace(/[-\s]/g, '');

  return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-${size}.jpg`;
};
