import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const memberService = {
  async getMemberDashboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/members/dashboard`, {
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
      console.error('Member dashboard error:', error);
      throw error;
    }
  }
};
