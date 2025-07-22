<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Usuarios desde API</title>
</head>
<body>
    <h1>Usuarios</h1>
    <ul id="usuarios"></ul>

    <script>
        fetch('http://localhost/PROYECTOS_PERSONALES/API_SENCILLA/servicio.php')
            .then(res => res.json())
            .then(data => {
                const lista = document.getElementById('usuarios');
                data.forEach(usuario => {
                    const item = document.createElement('li');
                    item.textContent = `${usuario.nombre} (${usuario.email})`;
                    lista.appendChild(item);
                });
            })
            .catch(error => console.error('Error al obtener usuarios:', error));
    </script>
</body>
</html>