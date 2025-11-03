// src/lib/api.ts
const API_URL = 'http://localhost:8000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Helper function to make authenticated requests
const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  register: async (userData: any) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }
    
    return response.json();
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Events API
export const eventsAPI = {
  getAll: (params?: any) => {
    const queryParams = new URLSearchParams(params).toString();
    return authenticatedFetch(`${API_URL}/events?${queryParams}`);
  },

  getById: (id: number) => {
    return authenticatedFetch(`${API_URL}/events/${id}`);
  },

  create: (eventData: any) => {
    return authenticatedFetch(`${API_URL}/events`, {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  update: (id: number, eventData: any) => {
    return authenticatedFetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  delete: (id: number) => {
    return authenticatedFetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
    });
  },
};

// Venues API
export const venuesAPI = {
  getAll: () => {
    return authenticatedFetch(`${API_URL}/venues`);
  },

  getById: (id: number) => {
    return authenticatedFetch(`${API_URL}/venues/${id}`);
  },
};

// Bookings API
export const bookingsAPI = {
  getAll: () => {
    return authenticatedFetch(`${API_URL}/bookings`);
  },

  create: (bookingData: any) => {
    return authenticatedFetch(`${API_URL}/bookings`, {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  updateStatus: (id: number, status: string) => {
    return authenticatedFetch(`${API_URL}/bookings/${id}/status?status=${status}`, {
      method: 'PUT',
    });
  },
};

// Tickets API
export const ticketsAPI = {
  getTypes: (eventId?: number) => {
    const params = eventId ? `?event_id=${eventId}` : '';
    return authenticatedFetch(`${API_URL}/tickets/types${params}`);
  },

  createType: (ticketTypeData: any) => {
    return authenticatedFetch(`${API_URL}/tickets/types`, {
      method: 'POST',
      body: JSON.stringify(ticketTypeData),
    });
  },

  purchase: (ticketData: any) => {
    return authenticatedFetch(`${API_URL}/tickets`, {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  },

  getMyTickets: () => {
    return authenticatedFetch(`${API_URL}/tickets/my-tickets`);
  },
};

// Staff API
export const staffAPI = {
  getAll: () => {
    return authenticatedFetch(`${API_URL}/staff`);
  },
};

// Vendors API
export const vendorsAPI = {
  getAll: () => {
    return authenticatedFetch(`${API_URL}/vendors`);
  },
};

// Speakers API
export const speakersAPI = {
  getAll: (eventId?: number) => {
    const params = eventId ? `?event_id=${eventId}` : '';
    return authenticatedFetch(`${API_URL}/speakers${params}`);
  },
};

// Inventory API
export const inventoryAPI = {
  getEquipment: () => {
    return authenticatedFetch(`${API_URL}/inventory/equipment`);
  },

  getSupplies: () => {
    return authenticatedFetch(`${API_URL}/inventory/supplies`);
  },

  getBookings: () => {
    return authenticatedFetch(`${API_URL}/inventory/bookings`);
  },
};

// Access Control API
export const accessControlAPI = {
  scanTicket: (ticketId: string, gate: string) => {
    return authenticatedFetch(`${API_URL}/access/scan/${ticketId}?gate=${gate}`, {
      method: 'POST',
    });
  },

  getLogs: (eventId?: number) => {
    const params = eventId ? `?event_id=${eventId}` : '';
    return authenticatedFetch(`${API_URL}/access/logs${params}`);
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboard: () => {
    return authenticatedFetch(`${API_URL}/analytics/dashboard`);
  },

  getRevenueByMonth: () => {
    return authenticatedFetch(`${API_URL}/analytics/revenue-by-month`);
  },
};

