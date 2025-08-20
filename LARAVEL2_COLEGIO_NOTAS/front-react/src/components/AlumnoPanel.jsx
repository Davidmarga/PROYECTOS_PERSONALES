import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAlumnoAsignaturas } from '../api/Api';

export default function AlumnoPanel() {
  const { token, user,logout } = useAuth();
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getAlumnoAsignaturas(token);
      setAsignaturas(data.asignaturas);
    };
    load();
  }, [token]);

 return (
  <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Hola, {user.name} (Alumno)</h2>
      <button className="btn btn-outline-danger" onClick={logout}>Cerrar sesión</button>
    </div>

    <h3>Mis asignaturas</h3>
    <ul className="list-group">
      {asignaturas.map((a) => (
        <li className="list-group-item d-flex justify-content-between" key={a.id}>
          <span>{a.nombre}</span>
          <span>{a.nota ?? '-'}</span>
        </li>
      ))}
    </ul>
  </div>
);
}