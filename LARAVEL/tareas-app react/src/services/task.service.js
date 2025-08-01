import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const getTasks = (token) => axios.get(`${API_URL}/tasks`, {
  headers: { Authorization: `Bearer ${token}` }
});

const createTask = (token, task) => axios.post(`${API_URL}/tasks`, task, {
  headers: { Authorization: `Bearer ${token}` }
});

export default { getTasks, createTask };