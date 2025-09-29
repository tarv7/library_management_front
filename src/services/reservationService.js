import { authService } from './authService';

const API_BASE_URL = 'http://localhost:3000';

export const reservationService = {
  async borrowBook(bookId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/books/${bookId}/reservations`, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          throw {
            status: 422,
            errors: data
          };
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Book borrow error:', error);
      throw error;
    }
  }
};
