import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getUsuarios,
  crearUsuario,
  eliminarUsuario,
  modificarNota,
  borrarAsignatura,
  getAsignaturas,
  asignarAsignatura,
} from '../api/Api';

const AdminPanel = () => {
  const { user, token, logout } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    passwordConfirm: '',
    is_admin: false,
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await getUsuarios(token);
    setUsuarios(data);
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    const { nombre, email, password, passwordConfirm, is_admin } = nuevoUsuario;

    if (password !== passwordConfirm) {
      return alert('Las contraseñas no coinciden');
    }

    const r = await crearUsuario(token, {
      name: nombre,
      email,
      password,
      is_admin,
    });

    if (r.ok) {
      alert('Usuario creado');
      setMostrarFormulario(false);
      cargarUsuarios();
    } else {
      const data = await r.json();
      alert(data.message || 'Error al crear usuario');
    }
  };

  const handleEliminarUsuario = async () => {
    const noAdmins = usuarios.filter((u) => !u.is_admin);
    if (noAdmins.length === 0) return alert('No hay usuarios no administradores');

    const opciones = noAdmins.map((u) => `${u.id}: ${u.nombre}`).join('\n');
    const seleccion = prompt(`ID del usuario a eliminar:\n${opciones}`);
    const id = parseInt(seleccion);
    if (isNaN(id)) return alert('ID inválido');

    await eliminarUsuario(token, id);
    cargarUsuarios();
  };

  const handleModificarNota = async (userId, asigId) => {
    const nuevaNota = prompt('Nueva nota');
    if (nuevaNota === null) return;
    await modificarNota(token, userId, asigId, nuevaNota);
    cargarUsuarios();
  };

  const handleBorrarAsignatura = async (userId, asigId) => {
    if (!window.confirm('¿Eliminar esta asignatura?')) return;
    await borrarAsignatura(token, userId, asigId);
    cargarUsuarios();
  };

  const handleAsignarAsignatura = async (userId) => {
    const asignaturas = await getAsignaturas(token);
    const opciones = asignaturas.map((a) => `${a.id}: ${a.nombre}`).join('\n');
    const seleccion = prompt(`Selecciona id asignatura:\n${opciones}`);
    const id = parseInt(seleccion);
    if (isNaN(id)) return alert('ID inválido');

    const r = await asignarAsignatura(token, userId, id);
    if (r.message) alert(r.message);
    cargarUsuarios();
  };

  return (
    
 <div className="container mt-4">

  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2>Hola, {user.name} (admin)</h2>
    <button className="btn btn-outline-danger" onClick={logout}>Cerrar sesión</button>
  </div>

  <div className="mb-3">
    <button className="btn btn-success me-2" onClick={() => setMostrarFormulario(true)}>Agregar usuario</button>
    <button className="btn btn-danger" onClick={handleEliminarUsuario}>Eliminar usuario</button>
  </div>


{mostrarFormulario && (
  <form onSubmit={handleCrearUsuario} className="mb-4">
    <div className="mb-2">
      <input className="form-control" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
    </div>
    <div className="mb-2">
      <input className="form-control" placeholder="Email" value={nuevoUsuario.email} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />
    </div>
    <div className="mb-2">
      <input className="form-control" type="password" placeholder="Password" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
    </div>
    <div className="mb-2">
      <input className="form-control" type="password" placeholder="Confirmar" value={nuevoUsuario.passwordConfirm} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, passwordConfirm: e.target.value })} />
    </div>
    <div className="form-check mb-2">
      <input type="checkbox" className="form-check-input" checked={nuevoUsuario.is_admin} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, is_admin: e.target.checked })} />
      <label className="form-check-label">Admin</label>
    </div>
    <button type="submit" className="btn btn-primary">Crear</button>
  </form>
)}

<h3>Usuarios</h3>
{usuarios.map((u) => (
  <div key={u.id} className="card mb-3">
    <div className="card-body">
      <strong>{u.nombre} ({u.email})</strong>
      <ul className="list-group list-group-flush my-2">
        {u.asignaturas.map((a) => (
          <li key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{a.nombre}: {a.nota ?? '-'}</span>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleModificarNota(u.id, a.id)}>Modificar</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleBorrarAsignatura(u.id, a.id)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
      {!u.is_admin && (
        <button className="btn btn-sm btn-secondary" onClick={() => handleAsignarAsignatura(u.id)}>Asignar asignatura</button>
      )}
    </div>
  </div>
))}
    </div>
  );
};

export default AdminPanel;