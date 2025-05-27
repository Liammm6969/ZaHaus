const API_URL = 'http://localhost:5000/api/auth';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    if (!data.user || !data.user.username) {
      throw new Error('Invalid response from server');
    }

    // Store username for future requests
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('userRole', data.user.role || 'user');
    return data;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const signup = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    if (!data.user || !data.user.username) {
      throw new Error('Invalid response from server');
    }

    // Store username for future requests
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('userRole', data.user.role || 'user');
    return data;
  } catch (error) {
    throw new Error(error.message || 'Signup failed');
  }
};

export const getCurrentUser = async () => {
  try {
    const username = localStorage.getItem('username');
    if (!username) {
      return null;
    }

    const response = await fetch(`${API_URL}/me`, {
      headers: {
        'username': username
      }
    });

    if (!response.ok) {
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      return null;
    }

    const data = await response.json();
    if (!data.user || !data.user.username) {
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      return null;
    }

    return data.user;
  } catch (error) {
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('userRole');
}; 