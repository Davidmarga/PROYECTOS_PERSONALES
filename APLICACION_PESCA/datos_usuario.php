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
<h1>lista de usuarios registrados</h1>

<?php
include "pescappc.php";
?>
<table style="border-collapse: separate; 
    width: 80%; 
    margin: 20px auto; 
    box-shadow: 2px 2px 5px #ccc; 
    border-radius: 5px;">
    <tr style=" background-color: #f0f8ff; ">
        <th style=" background-color: #337ab7; /* Color de fondo azul */
    color: white;
    font-weight: normal;
    padding-top: 15px;
    padding-bottom: 15px;"> dni </th>
        <th style=" background-color: #337ab7; /* Color de fondo azul */
    color: white;
    font-weight: normal;
    padding-top: 15px;
    padding-bottom: 15px;">nombre</th>
        <th style=" background-color: #337ab7; /* Color de fondo azul */
    color: white;
    font-weight: normal;
    padding-top: 15px;
    padding-bottom: 15px;">telefono</th>
        <th style=" background-color: #337ab7; /* Color de fondo azul */
    color: white;
    font-weight: normal;
    padding-top: 15px;
    padding-bottom: 15px;">email</th>
        <th style=" background-color: #337ab7; /* Color de fondo azul */
    color: white;
    font-weight: normal;
    padding-top: 15px;
    padding-bottom: 15px;">lugar_residencia</th>
        <th style=" background-color: #337ab7; /* Color de fondo azul */
    color: white;
    font-weight: normal;
    padding-top: 15px;
    padding-bottom: 15px;">fecha_nacimiento</th>
    <th style=" background-color: #337ab7; /* Color de fondo azul */
    color: white;
    font-weight: normal;
    padding-top: 15px;
    padding-bottom: 15px;">actualizar_datos</th>


    </tr>
    <?php mostrarusuarios();
    
    ?>
</table>
</form>
<a href="index.php">
<button type="button">Volver</button>


    <footer class="headfoot">
            <div><p class="txtheadfoot">David Margalejo 2025 Gracias por usar nuestra aplicacion</p></div>
        </footer>
    </body>
</html>