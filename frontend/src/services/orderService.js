const API_URL = '/api/orders';

export const createOrder = async (items, shippingAddress) => {
  const username = localStorage.getItem('username');
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username
    },
    body: JSON.stringify({
      items: items.map(item => ({
        menuItem: item._id,
        quantity: item.quantity || 1
      })),
      shippingAddress
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getMyOrders = async () => {
  const username = localStorage.getItem('username');
  const response = await fetch(`${API_URL}/my-orders`, {
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

export const getAllOrders = async () => {
  const username = localStorage.getItem('username');
  const response = await fetch(API_URL, {
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

export const updateOrderStatus = async (orderId, status) => {
  const username = localStorage.getItem('username');
  const response = await fetch(`${API_URL}/${orderId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'username': username
    },
    body: JSON.stringify({ status })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const updatePaymentStatus = async (orderId, paymentStatus) => {
  const username = localStorage.getItem('username');
  const response = await fetch(`${API_URL}/${orderId}/payment`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'username': username
    },
    body: JSON.stringify({ paymentStatus })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}; 