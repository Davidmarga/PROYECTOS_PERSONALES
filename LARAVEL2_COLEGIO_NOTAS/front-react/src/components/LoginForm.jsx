import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginRequest } from '../api/Api';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor introduce un email válido');
      return;
    }
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const data = await loginRequest(email, password);
      login(data.token, data.user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
<form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
  <h1 className="mb-4">Iniciar Sesión</h1>
  <div className="mb-3">
    <input
      type="email"
      className="form-control"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="password"
      className="form-control"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
  <button type="submit" className="btn btn-primary w-100">Login</button>
</form>
  );
}