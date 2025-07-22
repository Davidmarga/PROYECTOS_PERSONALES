<?php
require_once __DIR__ . '/modelo.php';

class UsuarioController {
    public static function listarUsuarios() {
        return Usuario::obtenerTodos();
    }
     public static function obtenerUsuarioPorId($id) {
        return Usuario::obtenerPorId($id);
    }
        public static function buscarNombre($nombre) {
        return Usuario::buscarPorNombre($nombre);
    }
       public static function obtenerPorEmail($email) {
        return Usuario::obtenerPorEmail($email);
    }
}
?>