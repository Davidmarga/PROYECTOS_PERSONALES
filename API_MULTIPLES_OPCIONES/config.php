<?php
function conectarBD() {
    $host = 'localhost';
    $dbname = 'mi_base';
    $usuario = 'root';
    $password = '';

    try {
        return new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $usuario, $password);
    } catch (PDOException $e) {
        die("Error al conectar a la BD: " . $e->getMessage());
    }
}
?>