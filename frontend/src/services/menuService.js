const API_URL = 'http://localhost:5000/api/menu';

export const getAllMenuItems = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const uploadPhoto = async (file) => {
  const username = localStorage.getItem('username');
  const formData = new FormData();
  formData.append('photo', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      'username': username
    },
    body: formData
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data.photoUrl;
};

export const createMenuItem = async (menuItem) => {
  const username = localStorage.getItem('username');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username
    },
    body: JSON.stringify(menuItem)
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const updateMenuItem = async (id, menuItem) => {
  const username = localStorage.getItem('username');
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'username': username
    },
    body: JSON.stringify(menuItem)
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const updateStock = async (id, stock) => {
  const username = localStorage.getItem('username');
  const response = await fetch(`${API_URL}/${id}/stock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'username': username
    },
    body: JSON.stringify({ stock })
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const checkStock = async (items) => {
  const response = await fetch(`${API_URL}/check-stock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items })
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const deleteMenuItem = async (id) => {
  const username = localStorage.getItem('username');
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'username': username
    }
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}; 