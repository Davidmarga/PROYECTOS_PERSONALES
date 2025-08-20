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
    //include "pescappm.php";
    include "pescappc.php";


    //guardarusuariorank();
    
    
     ?>

<table>
    <tr>
        <th>dni</th>
        <th>nombre</th>
        <th>puntuacion_acumulada</th>
    </tr>
    <?php  echo mostrarranking(); ?> </table>

 
</table>
<a href="index.php">
<button type="button">Volver</button>
</a>

    <footer class="headfoot">
            <div><p class="txtheadfoot">David Margalejo 2025 Gracias por usar nuestra aplicacion</p></div>
        </footer>
    </body>
</html>