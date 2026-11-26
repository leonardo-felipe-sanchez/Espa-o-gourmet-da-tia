const baseurl = import.meta.process.env.FRONTEND_URL || 'http://localhost:3000/api';

export const API_URL = baseurl ? baseurl.replace(/\/$/, '') : 'http://localhost:3000/api';