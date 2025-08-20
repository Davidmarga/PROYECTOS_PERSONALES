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
<h1>clasificacion para los concursos</h1>
<form id="formularioselecconcurso"action="datos_concursos.php" method="POST">
<label for="nombre">Nombre:</label>
<select id="nn" name="nn">
<?php
$database = "bbdd_aplicacion_pesca";
$host = "localhost";
$user = "root";
$password = "";
$conexion =	mysqli_connect($host,$user,$password,$database);
		if (!$conexion)
			die("<br>Error de conexión con la base de datos: " . mysqli_connect_error());

 $sql = "SELECT DISTINCT concurso FROM resultados";
 $resultado = mysqli_query($conexion, $sql);

 if ($resultado) {
     while ($fila = mysqli_fetch_assoc($resultado)) {
         $nombre = $fila['concurso'];
         echo "<option value='$nombre'>$nombre</option>";
     }
 } else {
     echo "<option value=''>Error al obtener datos</option>";
 }
 ?>

</select>
<p class="fila-formulario"><input type="submit" name="Publicar"></p>
</form>







<a href="index.php">
<button type="button">Volver</button>
</a>


    <footer class="headfoot">
            <div><p class="txtheadfoot">David Margalejo 2025 Gracias por usar nuestra aplicacion</p></div>
        </footer>
    </body>
</html>