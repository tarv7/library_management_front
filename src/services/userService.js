import { authService } from './authService';

const API_BASE_URL = 'http://localhost:3000';

export const userService = {
  async getMembers() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/members`, {
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
      console.error('Members fetch error:', error);
      throw error;
    }
  }
};
