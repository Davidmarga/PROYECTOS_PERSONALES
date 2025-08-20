<?php
// api_post.php

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$nombre = $data['nombre'] ?? '';
$email = $data['email'] ?? '';
$mensaje = $data['mensaje'] ?? '';

if (!$nombre || !$email || !$mensaje) {
  http_response_code(400);
  echo json_encode([
    'estado' => 'error',
    'mensaje' => 'Faltan datos en POST'
  ]);
  exit;
}

echo json_encode([
  'estado' => 'ok',
  'mensaje' => "POST recibido correctamente. Nombre: $nombre, Email: $email, Mensaje: $mensaje"
]);