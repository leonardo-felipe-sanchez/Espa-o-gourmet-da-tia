const baseurl = import.meta.env.VITE_URL || 'localhost:3000/api';

export const API_URL = baseurl ? baseurl.replace(/\/$/, '') : 'localhost:3000/api';