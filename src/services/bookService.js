import { authService } from './authService';

const API_BASE_URL = 'http://localhost:3000';

export const bookService = {
  async getBooks(filters = {}) {
    try {
      const queryParams = new URLSearchParams();

      if (filters.title) queryParams.append('title', filters.title);
      if (filters.author) queryParams.append('author', filters.author);
      if (filters.genre) queryParams.append('genre', filters.genre);

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/api/v1/books${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: authService.getAuthHeaders(),
        mode: 'cors',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Books fetch error:', error);
      throw error;
    }
  }
};
