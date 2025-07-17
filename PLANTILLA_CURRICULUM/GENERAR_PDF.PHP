<?php
require __DIR__ . '/vendor/autoload.php';
use Dompdf\Dompdf;
$dompdf = new Dompdf();
ob_start();
?>
    <h2>Curriculum de: <?php echo $_POST['nombre']; ?></h2>
    <p>Teléfono: <?php echo $_POST['telefono']; ?></p>
    <p>Email: <?php echo $_POST['email']; ?></p>

    <h3>Formación:</h3>
    <ul>
        <?php
        foreach ($_POST as $key => $value) {
            if (strpos($key, 'formacion') === 0 && !empty($value)) {
                echo "<li>" . htmlspecialchars($value) . "</li>";
            }
        }
        ?>
    </ul>

    <h3>Experiencia:</h3>
    <ul>
        <?php
        foreach ($_POST as $key => $value) {
            if (strpos($key, 'experiencia') === 0 && !empty($value)) {
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
<?php
$html = ob_get_clean();
// Cargar el HTML en dompdf
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

// Descargar el archivo
$dompdf->stream("curriculum.pdf", ["Attachment" => 1]); // 1 = descarga; 0 = ver en navegador
exit;
?>