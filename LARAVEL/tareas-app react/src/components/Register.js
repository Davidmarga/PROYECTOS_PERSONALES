import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const res = await AuthService.register(name, email, password, passwordCheck);
      const data = res.data;

      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al registrar usuario';
      alert(msg);
    }
  };

  return (
    <div>
      <h2>Crear nuevo usuario</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <br />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <br />
        <input
          type="password"
          value={passwordCheck}
          onChange={e => setPasswordCheck(e.target.value)}
          placeholder="Repetir contraseña"
          required
        />
        <br />
        <button type="submit">Crear usuario</button>
      </form>
    </div>
  );
}

export default Register;