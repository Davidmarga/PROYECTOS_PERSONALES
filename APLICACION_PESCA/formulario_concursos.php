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


<h1>Formulario para registrar una competicion</h1>
<h2> Datos participante y concurso</h2>
<form id="formularioconcurso"action="pescappc.php" method="POST">

<label for="nombre">Nombre:</label>
<input type="text" id="nombrec" name="nombrec">

<label for="dni">DNI:</label>
<input type="text" id="dnic" name="dnic">
<span id="errorDni" style="color: red;"></span><br><br>

<label for="concurso">Concurso:</label>
<input type="text" id="concurso" name="concurso">

<label for="ano">Año:</label>
<input type="text" id="ano" name="ano">

<h2> Capturas</h2>

<p><label>Captura1: </label><input type="number" name="1"></p>
 <p><label>Captura2: </label><input type="number" name="2"></p>
 <p><label>Captura3: </label><input type="number" name="3"></p>
 <p><label>Captura4: </label><input type="number" name="4"></p>
 <p><label>Captura5: </label><input type="number" name="5"></p>
 <p><label>Captura6: </label><input type="number" name="6"></p>
 <p><label>Captura7: </label><input type="number" name="7"></p>
 <p><label>Captura8: </label><input type="number" name="8"></p>
 <p><label>Captura9: </label><input type="number" name="9"></p>
 <input type="hidden" name="accion" value="procesar_concurso">
<p class="fila-formulario"><input type="submit" name="Publicar"></p>

</form>
<a href="index.php">
<button type="button">Volver</button>
</a>
 
<script>
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioconcurso');
    const dniInput = document.getElementById('dnic');
    formulario.addEventListener('submit', function(event) {
        let errores = false;
        if (!validarDni(dniInput.value)) {
                    errorDni.textContent = 'DNI no válido.';
                    errores = true;
                } else {
                    errorDni.textContent = '';
                }
                if (errores) {
                    event.preventDefault(); 
                }

            });

            function validarDni(dni) {
                const regexDni = /^\d{8}[A-Z]$/;

                return regexDni
            }
        }
    );

</script>
                        
                        
  <footer class="headfoot">
            <div><p class="txtheadfoot">David Margalejo 2025 Gracias por usar nuestra aplicacion</p></div>
        </footer>
    </body>
</html>
       