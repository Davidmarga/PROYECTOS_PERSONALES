const BASE_URL = 'http://localhost:8000/api';

export const loginRequest = async (email, password) => {
  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.message || 'Error al autenticar');
  return data;
};

export const logoutRequest = async (token) =>
  fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAlumnoAsignaturas = async (token) => {
  const r = await fetch(`${BASE_URL}/alumno/asignaturas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return r.json();
};

export const getUsuarios = async (token) => {
  const r = await fetch(`${BASE_URL}/admin/usuarios`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return r.json();
};

export const crearUsuario = async (token, usuario) => {
  const res = await fetch(`${BASE_URL}/admin/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usuario),
  });
  return res;
};

export const eliminarUsuario = async (token, userId) => {
  return fetch(`${BASE_URL}/admin/usuarios/${userId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const modificarNota = async (token, userId, asigId, nota) => {
  return fetch(`${BASE_URL}/admin/usuarios/${userId}/asignaturas/${asigId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nota }),
  });
};

export const borrarAsignatura = async (token, userId, asigId) => {
  return fetch(`${BASE_URL}/admin/usuarios/${userId}/asignaturas/${asigId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAsignaturas = async (token) => {
  const r = await fetch(`${BASE_URL}/asignaturas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return r.json();
};

export const asignarAsignatura = async (token, userId, asignatura_id) => {
  return fetch(`${BASE_URL}/admin/usuarios/${userId}/asignaturas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ asignatura_id }),
  });
};