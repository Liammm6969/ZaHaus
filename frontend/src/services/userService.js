const API_URL = import.meta.env.VITE_API_BASE_URL + '/users';

export const getAllUsers = async () => {
  const username = localStorage.getItem('username');
  const response = await fetch(API_URL, {
    headers: { 'username': username }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const updateUserRole = async (userId, role, username) => {
  const localUsername = localStorage.getItem('username');
  const body = { role };
  if (username !== undefined) body.username = username;
  const response = await fetch(`${API_URL}/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'username': localUsername
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const deleteUser = async (userId) => {
  const username = localStorage.getItem('username');
  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'DELETE',
    headers: { 'username': username }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
