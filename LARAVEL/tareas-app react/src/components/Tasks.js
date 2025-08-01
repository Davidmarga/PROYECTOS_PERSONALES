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
    <div>
      <button onClick={() => {localStorage.removeItem('token'); navigate('/login');}}>Cerrar sesión</button>
      <h2>Tareas</h2>
      <ul>{tasks.map(t => <li key={t.user.name}>{t.user.name} {t.title} {t.is_completed?'✅':'❌'}</li>)}</ul>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Título" required />
        <input name="description" placeholder="Descripción" />
        <input name="user_id" type="number" placeholder="User ID" required />
        <input name="category_id" type="number" placeholder="Category ID" required />
        <label><input name="completed" type="checkbox" /> Completada</label>
        <button type="submit">Crear tarea</button>
      </form>
    </div>
  );
}