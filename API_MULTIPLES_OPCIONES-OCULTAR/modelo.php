<?php
require_once __DIR__ . '/config.php';

class Usuario {
    public static function obtenerTodos() {
        $bd = conectarBD();
        $stmt = $bd->query("SELECT id, nombre, email FROM usuarios");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public static function obtenerPorId($id){
        $bd = conectarBD();
        $stmt = $bd->prepare("SELECT id, nombre, email FROM usuarios WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
        public static function buscarPorNombre($nombre) {
        $bd = conectarBD();
        $stmt = $bd->prepare("SELECT id, nombre, email FROM usuarios WHERE nombre LIKE ?");
        $stmt->execute(["%$nombre%"]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
  public static function obtenerPorEmail($email) {
        $bd = conectarBD();
        $stmt = $bd->prepare("SELECT id, nombre, email FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>