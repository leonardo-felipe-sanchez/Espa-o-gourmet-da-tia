const baseurl = import.meta.process.env.VITE_URL || 'http://localhost:3000/api';

export const API_URL = baseurl ? baseurl.replace(/\/$/, '') : 'http://localhost:3000/api';