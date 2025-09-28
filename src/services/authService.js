const API_BASE_URL = '';

export const authService = {
  async login(emailAddress, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          user: {
            email_address: emailAddress,
            password: password
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(emailAddress, password, confirmPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          user: {
            email_address: emailAddress,
            password: password,
            password_confirmation: confirmPassword
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('authToken');
  },

  getToken() {
    return localStorage.getItem('authToken');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  getAuthHeaders() {
    const token = this.getToken();
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    } : {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }
};
