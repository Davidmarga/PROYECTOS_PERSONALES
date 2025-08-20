<?php

// Permitir CORS si es necesario (para desarrollo local)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Incluimos el modelo
require_once 'model.php';

//si la peticion es get, lanzamos el metodo para traer la info de la bbdd

if ($_SERVER['REQUEST_METHOD']==='GET'){
    $coasters = modelGet(); //ya viene una array directamente, porque lo hemos procesado en el modelo, si del modelo hubieramos devuelto result, seria un json que hay que procesar aqui para meter en un array, pero ya lo hemos hecho en el modelo, para que salieran ordenados los resultados
    
    if($coasters&&count($coasters)>0){

        echo json_encode(['success' => true, 'data' => $coasters]);
    }else{
        echo json_encode(['success' => false, 'message' =>'datos no encontrados']);
    }
    exit;
}

// Leer los datos enviados por POST y comprobar si el metodo es post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        echo json_encode(['success' => false, 'message' => 'No se recibieron datos']);
        exit;
    }

$id= $input['id'];
$name= $input['name'];
$rank= $input['rank'];
$parkName= $input['parkName'];
$country= $input['country'];
$manufacturer= $input['manufacturer'];
$modelo=$input['modelo'];
$picture= $input['picture'];

// Guardamos los datos en la BD
$resultado= modelGuardar($id, $name, $rank, $parkName, $country, $manufacturer, $modelo, $picture);


if ($resultado) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar en la base de datos']);
}
}

//si la peticion es delete, lanzamos el metodo borrar

if ($_SERVER['REQUEST_METHOD']==='DELETE'){
    if(isset($_GET['id'])){
        $id=$_GET['id'];
        $resultado=modelDelete($id);
        if($resultado){
            echo json_encode(['success'=>true, 'message', 'coaster borrada correctamente']);
        }else{
            echo json_encode(['success'=>false, 'message'=>'error al borrar la coaster']);
        }
    }else{
        echo json_encode(['succes' => false, 'message' => 'falta el id para borrar']);
    }
    exit;
}

//ya si hubiera mas peticiones con el mismo metodo, tendriamos que pasar un parametro para identificar a que metodo queremos acceder, desde javascript, y aqui con un switch, dirigir la peticion al metodo que corresponda

