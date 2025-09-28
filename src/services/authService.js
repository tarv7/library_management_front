import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:3000';

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

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          user: {
            email_address: userData.email,
            password: userData.password,
            password_confirmation: userData.confirmPassword,
            name: userData.name,
            role: userData.role
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          throw {
            status: 422,
            errors: data
          };
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
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
  },

  getUserFromToken() {
    const token = this.getToken();
    if (!token) {
      console.log('No token found');
      return null;
    }

    try {
      const decoded = jwtDecode(token);

      return {
        id: decoded.user_id,
        email: decoded.email_address,
        name: decoded.name,
        role: decoded.role,
        createdAt: decoded.created_at,
        exp: decoded.exp
      };
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  },

  isTokenValid() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  },

  isLibrarian() {
    const user = this.getUserFromToken();
    return user?.role === 'librarian';
  },

  isMember() {
    const user = this.getUserFromToken();
    return user?.role === 'member';
  }
};
