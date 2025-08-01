import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const register = (name, email, password, password_confirmation) => {
  return axios.post(`${API_URL}/register`, { name, email, password, password_confirmation });
};

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

const AuthService = { register, login };
export default AuthService;