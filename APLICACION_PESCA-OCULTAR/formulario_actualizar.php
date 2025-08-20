<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="david margalejo">
        <title>aplicacion gestion pesca</title>
        <link rel="icon" type="image/x-icon" href="recursos/cabecera.ico">
        <link rel="stylesheet" href="css/Appesca.css">
        <script src="js/scripts.js"></script>
    </head>

    <body>

<header class="headfoot">
<div><p class="txtheadfoot">APLICACION PARA LA GESTION DE COMPETICIONES DE PESCA DEPORTIVA</p></div>
</header>


<?php
include "pescappc.php";
?>
<?php 

$dni = $_GET["dni"];
$nombre = $_GET["nombre"];
$telefono = $_GET["telefono"];
$email = $_GET["email"];
$lugar_residencia = $_GET["lugar_residencia"];
$fecha_nacimiento = $_GET["fecha_nacimiento"];

echo "<h2>Datos del Participante a Modificar</h2>";
echo '<form action="pescappc.php" method="post">';
echo   '<p class="fila-formulario"><label>Nombre: </label><input type="text" name="mnombre"value="'.$nombre.'"></p>';
echo  '<p class="fila-formulario" id="jsdni"><label>DNI: </label><input type="text" name="mdni"value="'.$dni.'"readonly></p>';
echo  '<p class="fila-formulario" id="jstelf"><label>Telefono: </label><input type="text" name="mtelefono"value="'.$telefono.'"></p>';
echo  '<p class="fila-formulario"><label>Email: </label><input type="text" name="memail"value="'.$email.'"></p>';
echo  '<p class="fila-formulario"><label>Lugar de residencia: </label><input type="text" name="mlugar_residencia"value="'.$lugar_residencia.'"></p>';
echo  '<p class="fila-formulario"><label>Fecha de nacimiento: </label><input type="text" name="mfecha_nacimiento"value="'.$fecha_nacimiento.'"></p>';
echo  '<input type="hidden" name="accion" value="actualizar_usuarios">';
echo '<p class="fila-formulario"><input type="submit" name="Publicar"></p>';
echo '</form>';

?>



<a href="index.php">
<button type="button">Volver</button>
</a>
                        
                        
                        
  <footer class="headfoot">
            <div><p class="txtheadfoot">David Margalejo 2025 Gracias por usar nuestra aplicacion</p></div>
        </footer>
    </body>
</html>