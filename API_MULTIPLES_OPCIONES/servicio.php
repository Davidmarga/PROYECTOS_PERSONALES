<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/controlador.php';

$action = $_GET['action'] ?? 'all';

switch ($action) {
    case 'all':
$usuarios = UsuarioController::listarUsuarios();
echo json_encode($usuarios);
break;

    case 'byId':
        if (isset($_GET['id'])) {
            $usuario = UsuarioController::obtenerUsuarioPorId($_GET['id']);
            echo json_encode($usuario);
        } else {
            echo json_encode(["error" => "ID no proporcionado"]);
        }
        break;

    case 'search':
        if (isset ($_GET['nombre'])) {
             $usuarios = UsuarioController::buscarNombre($_GET['nombre']);
            echo json_encode($usuarios);
        } else {
            echo json_encode(["error" => "Nombre no proporcionado"]);
        }
        break;

    case 'email':
        if (isset($_GET['email'])) {
            $usuario = UsuarioController::obtenerPorEmail($_GET['email']);
            echo json_encode($usuario);
        } else {
            echo json_encode(["error" => "Email no proporcionado"]);
        }
        break;

    default:
        echo json_encode(["error" => "Acción no válida"]);
}
?>