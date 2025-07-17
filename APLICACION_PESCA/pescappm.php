<?php

	function crearConexion() {
		
		$database = "bbdd_aplicacion_pesca";
		$host = "localhost";
		$user = "root";
		$password = "";

		$conexion =	mysqli_connect($host,$user,$password,$database);
		if (!$conexion)
		die("<br>Error de conexión con la base de datos: " . mysqli_connect_error());
	
		return $conexion;
	}

	function cerrarConexion($conexion) {
	mysqli_close($conexion);
	}


    function guardarManga($dni, $nombre, $concurso, $year,$puntos){
        $conexion=crearConexion();
		
        $consulta = "INSERT INTO resultados (dni, nombre, concurso, ano, puntos) VALUES ('$dni', '$nombre', '$concurso', '$year', '$puntos')";
        if (mysqli_query($conexion, $consulta)) {
            echo "<br>Manga guardada correctamente.";
        } else {
            echo "<br>Error al guardar la manga: " . mysqli_error($conexion);
        }
	
	mysqli_close($conexion);
	}

	function guardarUsuario($dni,$nombre,$telefono,$email, $lugar_residencia, $fecha_nacimiento){
		$conexion=crearConexion();
		$consulta = "INSERT INTO usuarios (dni, nombre, telefono, email, lugar_residencia, fecha_nacimiento) VALUES ('$dni', '$nombre', '$telefono', '$email', '$lugar_residencia', '$fecha_nacimiento')";
        if (mysqli_query($conexion, $consulta)) {
            echo "<br>Usuario guardado correctamente.";
        } else {
            echo "<br>Error al crear usuario: " . mysqli_error($conexion);
        }

	}

       
function getusuarios() {
	$conexion=crearConexion();
	$consulta = "SELECT dni, nombre, telefono, email, lugar_residencia, fecha_nacimiento FROM usuarios ORDER BY nombre"; 
	$result = mysqli_query($conexion, $consulta);
	if (mysqli_num_rows($result) > 0) {
		return $result;
	} else { 
		echo "error";
	}
	mysqli_close($conexion);
    }


function getpuntuacion($consultaconcurso) {
	$conexion=crearConexion();
	$consulta = "SELECT dni, nombre, concurso, ano, puntos FROM resultados WHERE concurso='$consultaconcurso' ORDER BY puntos DESC"; 
	$result = mysqli_query($conexion, $consulta);
	if (mysqli_num_rows($result) > 0) {
		return $result;
	} else { 
		echo "error";
	}
	mysqli_close($conexion);
	}

	function getranking() {
		$conexion=crearConexion();
		$consulta = "SELECT dni, nombre, puntos_acumulados FROM ranking ORDER BY puntos_acumulados DESC"; 
		$result = mysqli_query($conexion, $consulta);
		if (mysqli_num_rows($result) > 0) {
			return $result;
		} else { 
			return false;
		}
		mysqli_close($conexion);
		}

function actualizarusuario($dni,$nombre,$telefono,$email, $lugar_residencia, $fecha_nacimiento){
		$conexion=crearConexion();
		$consulta = "UPDATE usuarios set nombre='$nombre', telefono='$telefono', email='$email', lugar_residencia='$lugar_residencia', fecha_nacimiento='$fecha_nacimiento' where dni = '$dni'";
        if (mysqli_query($conexion, $consulta)) {
            echo "<br>Usuario modificado correctamente.";
        } else {
            echo "<br>Error al modificar usuario: " . mysqli_error($conexion);
        }

	}

function traerusuariomodificar($dni){
$conexion=crearConexion();
	$consulta = "SELECT dni, nombre, telefono, email, lugar_residencia, lugar_nacimiento FROM usuarios where dni=$dni"; 
	$result = mysqli_query($conexion, $consulta);
	if (mysqli_num_rows($result) > 0) {
		return $result;
	} else { 
		echo "error";
	}
	mysqli_close($conexion);
}

function getusuariorank() {
	$conexion=crearConexion();
	$consulta = "SELECT dni, nombre, puntos FROM resultados ORDER BY puntos DESC"; 
	$result = mysqli_query($conexion, $consulta);
	if (mysqli_num_rows($result) > 0) {
		$resultadosarray =[];
		while ($fila = mysqli_fetch_assoc ($result)) {
			$dni = $fila ["dni"];
			$nombre=$fila["nombre"];
			$puntos=(int)$fila["puntos"];

			if (!isset($resultadosarray[$dni])) {
			$resultadosarray[$dni] =[
			"dni"=>$dni,
			"nombre"=>$nombre,
			"total_puntos"=>0
            ];
		}
		$resultadosarray[$dni]['total_puntos'] += $puntos;

	}
	mysqli_close($conexion);
	return $resultadosarray;
	}
	else { 
		mysqli_close($conexion);
		return false;
	}
	
	}

	function guardarusuariorank() {
		$conexion=crearConexion();
		$datos_ranking = getusuariorank();
		if (is_array($datos_ranking)&&!empty($datos_ranking)) {
			mysqli_query($conexion, "TRUNCATE TABLE ranking");
				foreach ($datos_ranking as $dni => $datos) {
					$nombre = $datos['nombre'];
                    $puntos_acumulados = $datos['total_puntos'];
        $consulta = "INSERT INTO ranking (dni, nombre, puntos_acumulados) VALUES ( 
		        '" . $dni . "',
                '" . $nombre . "',
                " . $puntos_acumulados . ")";
		$result = mysqli_query($conexion, $consulta);
		if (!$result) {
			error_log("Error al insertar en ranking: " . mysqli_error($conexion));
			}
		}
		
	}
	
		else { 
			echo "error";
		}
		mysqli_close($conexion);
	}
    ?>