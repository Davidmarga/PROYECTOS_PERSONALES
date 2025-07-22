<?php
require_once __DIR__ . '/config.php';

class Usuario {
    public static function obtenerTodos() {
        $bd = conectarBD();
        $stmt = $bd->query("SELECT id, nombre, email FROM usuarios");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>