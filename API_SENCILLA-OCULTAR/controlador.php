<?php
require_once __DIR__ . '/modelo.php';

class UsuarioController {
    public static function listarUsuarios() {
        return Usuario::obtenerTodos();
    }
}
?>