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
  },

  async getReservations(filters = {}) {
    try {
      const queryParams = new URLSearchParams();

      if (filters.book_id) queryParams.append('book_id', filters.book_id);
      if (filters.user_id) queryParams.append('user_id', filters.user_id);
      if (filters.situation) queryParams.append('situation', filters.situation);

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/api/v1/reservations${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: authService.getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Reservations fetch error:', error);
      throw error;
    }
  },

  async returnBook(bookId, reservationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/books/${bookId}/reservations/${reservationId}`, {
        method: 'PUT',
        headers: authService.getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Book return error:', error);
      throw error;
    }
  }
};
