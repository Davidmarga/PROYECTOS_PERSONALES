<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/controlador.php';

$usuarios = UsuarioController::listarUsuarios();
echo json_encode($usuarios);
?>