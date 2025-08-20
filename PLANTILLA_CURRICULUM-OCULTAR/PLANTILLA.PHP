<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Plantilla Curriculum</title>
</head>

<body>
    <h2>Curriculum vitae:</h2>
    <h3>Nombre: <?php echo $_POST['nombre'];?></h3>
    <h3>Telefono: <?php echo $_POST['telefono'];?></h3>
    <h3>Email: <?php echo $_POST['email'];?> </h3>  

    <h3>Formacion:</h3>
    <ul>
    <?php 
    foreach ($_POST as $key => $value){
        if (strpos($key,'formacion')===0 && !empty($value)) {
            echo "<li>" . htmlspecialchars($value) . "</li>";
        }
    }
    ?>
    </ul>

     <h3>Experiencia:</h3>
    <ul>
    <?php 
    foreach ($_POST as $key => $value){
        if (strpos($key,'experiencia')===0 && !empty($value)) {
            echo "<li>" . htmlspecialchars($value) . "</li>";
        }
    }
    ?>
    </ul>

     <h3>Aptitudes:</h3>
    <ul>
    <?php 
    foreach ($_POST as $key => $value){
        if (strpos($key,'aptitud')===0 && !empty($value)) {
            echo "<li>" . htmlspecialchars($value) . "</li>";
        }
    }
    ?>
    </ul>


    <form action="GENERAR_PDF.PHP" method="post">
<?php
foreach ($_POST as $key => $value){
echo '<input type="hidden" name="'. htmlspecialchars($key) . '" value = "' . htmlspecialchars($value).'">';

}
?>
<input type="submit" value="Descargar en PDF">
    </form>
</body>