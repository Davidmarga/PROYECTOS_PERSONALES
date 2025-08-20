<?php

function conexion () {
$database = 'apicoasters';
$host = 'localhost';
$user = 'root';
$password = '';

$conexion = mysqli_connect ($host, $user, $password, $database);
if(!$conexion)
    die ('error de conexion con la base de datos' . mysqli_connect_error());
return $conexion;
}


function modelGuardar($id, $name, $rank, $parkName, $country, $manufacturer, $modelo, $picture){
    $conexion = conexion();
    $stmt=$conexion->prepare("INSERT INTO coasters (Id, Name, Rank, ParkName, Country, Manufacturer, Modelo, Picture) VALUES (?,?,?,?,?,?,?,?)");
    if (!$stmt) {
        throw new Exception("Error en prepare: " . $conexion->error);
    }
    
    $stmt->bind_param("isisssss", $id, $name, $rank, $parkName, $country, $manufacturer, $modelo, $picture);
   
    if (!$stmt->execute()) {
        throw new Exception("Error al ejecutar: " . $stmt->error);
    }

    $stmt->close();
    $conexion->close();
    return true;
}

function modelGet(){
    $conexion = conexion ();
    $consulta = "SELECT * FROM coasters ORDER BY `Rank` ASC";
    $result = mysqli_query($conexion,$consulta);
    $coasters = [];
    if (mysqli_num_rows ($result)>0 ){ 
        while($row = mysqli_fetch_assoc($result)){
            $coasters[] = $row;
        }
        mysqli_close($conexion);
        return $coasters;
    }
    else {
        echo "error";
        mysqli_close($conexion);
        return[];
    }
}

function modelDelete($id){
    $conexion=conexion();
    $consulta= "DELETE FROM coasters where Id=$id";
    $resultado = mysqli_query($conexion,$consulta);
    mysqli_close($conexion);
    return $resultado;
}





