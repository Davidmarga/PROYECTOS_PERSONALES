import React, { useEffect, useState } from 'react';
import taskService from '../services/task.service';
import { useNavigate } from 'react-router-dom';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');
    async function fetch() {
      try {
        const res = await taskService.getTasks(token);
        setTasks(res.data);
      } catch {
        navigate('/login');
      }
    }
    fetch();
  }, [token, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const task = {
      title: form.title.value,
      description: form.description.value,
      user_id: form.user_id.value,
      category_id: form.category_id.value,
      completed: form.completed.checked
    };
    await taskService.createTask(token, task);
    form.reset();
    const res = await taskService.getTasks(token);
    setTasks(res.data);
  };

  return (
    <div className="container mt-4">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2>Tareas</h2>
    <button
      className="btn btn-outline-danger"
      onClick={() => {
        localStorage.removeItem('token');
        navigate('/login');
      }}
    >
      Cerrar sesión
    </button>
  </div>

  <ul className="list-group mb-4">
    {tasks.map(t => (
      <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span><strong>{t.user.name}</strong>: {t.title}</span>
        <span>{t.is_completed ? '✅' : '❌'}</span>
      </li>
    ))}
  </ul>

  <h4>Crear nueva tarea</h4>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <input name="title" className="form-control" placeholder="Título" required />
    </div>
    <div className="mb-3">
      <input name="description" className="form-control" placeholder="Descripción" />
    </div>
    <div className="mb-3">
      <input name="user_id" type="number" className="form-control" placeholder="User ID" required />
    </div>
    <div className="mb-3">
      <input name="category_id" type="number" className="form-control" placeholder="Category ID" required />
    </div>
    <div className="form-check mb-3">
      <input name="completed" type="checkbox" className="form-check-input" id="completedCheck" />
      <label className="form-check-label" htmlFor="completedCheck">Completada</label>
    </div>
    <button type="submit" className="btn btn-primary">Crear tarea</button>
  </form>
</div>
  );
}