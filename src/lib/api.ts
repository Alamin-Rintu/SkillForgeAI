const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('skillforge_token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      credentials: 'include',
      ...options,
      headers,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`API Error [${endpoint}]:`, error);
    return { success: false, message: 'Server communication error' };
  }
};
