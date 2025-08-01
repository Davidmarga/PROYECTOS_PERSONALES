import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await AuthService.login(email, password);
      const data = res.data;

      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } catch (err) {
      const msg = err.response?.data?.message || 'Credenciales inválidas';
      alert(msg);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Crear nuevo usuario</Link></p>
    </div>
  );
}

export default Login;