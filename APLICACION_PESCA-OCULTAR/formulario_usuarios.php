<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="david margalejo">
        <title>aplicacion gestion pesca</title>
        <link rel="icon" type="image/x-icon" href="recursos/cabecera.ico">
        <link rel="stylesheet" href="css/Appesca.css">
    </head>

<body>

<header class="headfoot">
<div><p class="txtheadfoot">APLICACION PARA LA GESTION DE COMPETICIONES DE PESCA DEPORTIVA</p></div>
</header>

<h1>Formulario para registrar un nuevo participante</h1>
<h2> Introducir datos</h2>
        <form id="formulariousuario" action="pescappc.php" method="POST">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre">

        <label for="dni">DNI:</label>
        <input type="text" id="dni" name="dni">
        <span id="errorDni" style="color: red;"></span><br><br>

        <label for="telefono">Teléfono:</label>
        <input type="text" id="telefono" name="telefono">
        <span id="errorTelefono" style="color: red;"></span><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
        <span id="errorEmail" style="color: red;"></span><br><br>

        <label for="lugar_residencia">Lugar de residencia:</label>
        <input type="text" id="lugar_residencia" name="lugar_residencia">

        <label for="fecha_nacimiento">Fecha de nacimiento:</label>
        <input type="text" id="fecha_nacimiento" name="fecha_nacimiento">
        <input type="hidden" name="accion" value="guardar_usuario">
<br><br>
<p class="fila-formulario"><input type="submit" name="Publicar"></p>
    </form>
    <br>
    <a href="index.php">
<button type="button">Volver</button>
</a>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const formulario = document.getElementById('formulariousuario');
            const dniInput = document.getElementById('dni');
            const telefonoInput = document.getElementById('telefono');
            const emailInput = document.getElementById('email');
            const errorDni = document.getElementById('errorDni');
            const errorTelefono = document.getElementById('errorTelefono');
            const errorEmail = document.getElementById('errorEmail');

            formulario.addEventListener('submit', function(event) {
                let errores = false;

                if (!validarDni(dniInput.value)) {
                    errorDni.textContent = 'DNI no válido.';
                    errores = true;
                } else {
                    errorDni.textContent = '';
                }

                if (!/^\d{9}$/.test(telefonoInput.value)) {
                    errorTelefono.textContent = 'Teléfono no válido (9 dígitos).';
                    errores = true;
                } else {
                    errorTelefono.textContent = '';
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                    errorEmail.textContent = 'Email no válido.';
                    errores = true;
                } else {
                    errorEmail.textContent = '';
                }

                if (errores) {
                    event.preventDefault(); 
                }
            });

           function validarDni(dni) {
                const regexDni = /^\d{8}[A-Z]$/;

                return regexDni
            }
        });
    </script>

<footer class="headfoot">
            <div><p class="txtheadfoot">David Margalejo 2025 Gracias por usar nuestra aplicacion</p></div>
        </footer>
    </body>
</html>
