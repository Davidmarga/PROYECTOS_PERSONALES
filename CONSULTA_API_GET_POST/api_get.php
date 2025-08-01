<?php
// api_get.php

$nombre = $_GET['nombre'] ?? '';
$email = $_GET['email'] ?? '';
$mensaje = $_GET['mensaje'] ?? '';

if (!$nombre || !$email || !$mensaje) {
  http_response_code(400);
  echo json_encode([
    'estado' => 'error',
    'mensaje' => 'Faltan parámetros en GET'
  ]);
  exit;
}

echo json_encode([
  'estado' => 'ok',
  'mensaje' => "GET recibido correctamente. Nombre: $nombre, Email: $email, Mensaje: $mensaje"
]);