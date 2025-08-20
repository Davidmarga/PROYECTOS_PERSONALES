<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Usuarios desde API</title>
</head>
<body>
    <h2>Buscar usuarios</h2>

<button onclick="cargarTodos()">Todos</button>

<input type="number" id="buscarId" placeholder="ID">
<button onclick="buscarPorId()">Buscar por ID</button>

<input type="text" id="buscarNombre" placeholder="Nombre">
<button onclick="buscarPorNombre()">Buscar por nombre</button>

<input type="text" id="buscarEmail" placeholder="Email">
<button onclick="buscarPorEmail()">Buscar por email</button>

<ul id="usuarios"></ul>

<script>

function cargarTodos() {
    fetchUsuarios('http://localhost/PROYECTOS_PERSONALES/API_MULTIPLES_OPCIONES/servicio.php?action=all');
}

function buscarPorId() {
    const id = document.getElementById('buscarId').value;
    if (id) {
        fetchUsuarios(`http://localhost/PROYECTOS_PERSONALES/API_MULTIPLES_OPCIONES/servicio.php?action=byId&id=${id}`);
    }
}

function buscarPorNombre() {
    const nombre = document.getElementById('buscarNombre').value;
    if (nombre) {
        fetchUsuarios(`http://localhost/PROYECTOS_PERSONALES/API_MULTIPLES_OPCIONES/servicio.php?action=search&nombre=${encodeURIComponent(nombre)}`);
    }
}

function buscarPorEmail() {
    const email = document.getElementById('buscarEmail').value;
    if (email) {
        fetchUsuarios(`http://localhost/PROYECTOS_PERSONALES/API_MULTIPLES_OPCIONES/servicio.php?action=email&email=${encodeURIComponent(email)}`);
    }
}

function fetchUsuarios(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('usuarios');
            lista.innerHTML = '';
            if (Array.isArray(data)) {
                data.forEach(usuario => {
                    const item = document.createElement('li');
                    item.textContent = `${usuario.nombre} (${usuario.email})`;
                    lista.appendChild(item);
                });
            } else if (data && data.nombre) {
                const item = document.createElement('li');
                item.textContent = `${data.nombre} (${data.email})`;
                lista.appendChild(item);
            } else {
                const item = document.createElement('li');
                item.textContent = 'No se encontraron resultados.';
                lista.appendChild(item);
            }
        })
        .catch(err => console.error('Error al obtener datos:', err));
}
</script>
</body>
</html>