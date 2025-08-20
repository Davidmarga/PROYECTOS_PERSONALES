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
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h2 className="mb-4">Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
      </form>
      <p className="mt-3 text-center">
        ¿No tienes cuenta? <Link to="/register">Crear nuevo usuario</Link>
      </p>
    </div>
  </div>
</div>
  );
}

export default Login;