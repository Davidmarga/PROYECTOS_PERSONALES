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
<div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h2 className="mb-4">Crear nuevo usuario</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={passwordCheck}
            onChange={e => setPasswordCheck(e.target.value)}
            placeholder="Repetir contraseña"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Crear usuario</button>
      </form>
    </div>
  </div>
</div>
  );
}

export default Register;