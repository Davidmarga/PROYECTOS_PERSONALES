<?php 

	include "pescappm.php";


    function calcularPuntuacion() {

    $sumapuntos=0;

        for ($i = 1; $i<=9; $i++) {
			$valor=0;
            if (isset($_POST[$i])){
				$valor=20+((int)$_POST[$i]*20);}
				else
				{
					$valor=0;
				}
			
        $sumapuntos+=$valor;
}
return (int)$sumapuntos;
 }

if (isset($_POST['accion'])) {
   $accion = $_POST['accion'];

    switch ($accion) {
        case 'guardar_usuario':
            if (isset($_POST['dni']) && isset($_POST['nombre'])) {
                guardarUsuario($_POST['dni'], $_POST['nombre'], $_POST['telefono'], $_POST['email'], $_POST['lugar_residencia'], $_POST['fecha_nacimiento']);
                header("Location: pagina_exito.php");
                exit();
            } else {
                echo "Faltan datos para guardar el usuario.";
            }
            break;
        case 'procesar_concurso':
            $puntos = calcularPuntuacion();
            guardarManga($_POST['dnic'], $_POST['nombrec'], $_POST['concurso'], $_POST['ano'], $puntos);
            header("Location: pagina_concurso_exito.php");
            exit();
            break;
        case 'actualizar_usuarios':
            actualizarusuario($_POST['mdni'], $_POST['mnombre'], $_POST['mtelefono'], $_POST['memail'], $_POST['mlugar_residencia'], $_POST['mfecha_nacimiento']);
			header("Location: pagina_actualizar_exito.php");
            exit();
            break;
        default:
            echo "Acción no válida.";
    }
}

?>


<?php

function mostrarusuarios(){
	$datos=getusuarios();
	if (is_string($datos)){
		echo $datos;
	}else{
		while ($fila = mysqli_fetch_assoc($datos)){
		echo "<tr>\n
		<td> ". $fila["dni"]. "</td>\n
		<td> ". $fila["nombre"]. "</td>\n
		<td> ". $fila["telefono"]. "</td>\n
		<td> ". $fila["email"]. "</td>\n
		<td> ". $fila["lugar_residencia"]. "</td>\n
		<td> ". $fila["fecha_nacimiento"]. "</td>\n
		<td> <a href = \"formulario_actualizar.php?dni=".urlencode($fila["dni"]). "&" .
     "nombre=" . urlencode($fila["nombre"]) . "&" .
     "telefono=" . urlencode($fila["telefono"]) . "&" .
     "email=" . urlencode($fila["email"]) . "&" .
     "lugar_residencia=" . urlencode($fila["lugar_residencia"]) . "&" .
     "fecha_nacimiento=" . urlencode($fila["fecha_nacimiento"]) .
     "\">modificar datos</a></td>\n";"\">modificar datos</a> </td>\n
			</tr>";
   }
  }
}

function mostrarpuntuaciones($concurso){
	$datos=getpuntuacion($concurso);
	if (is_string($datos)){
		echo $datos;
	}else{
		while ($fila = mysqli_fetch_assoc($datos)){
		echo "<tr>\n
		<td> ". $fila["dni"]. "</td>
		<td> ". $fila["nombre"]. "</td>
		<td> ". $fila["concurso"]. "</td>
		<td> ". $fila["ano"]. "</td>
		<td> ". $fila["puntos"]. "</td>
			</tr>";
   }
  }
}
function mostrarconcursos(){
	$datos=getpuntuacion($_GET['nombrec']);
	if (is_string($datos)){
		echo $datos;
	}else{
		while($fila=mysqli_fetch_assoc($datos)){
		echo "<tr>/n
		<td>".$fila["concurso"]."</td>
		</tr>";
	}
 }
}
function mostrarusuarioactualizar($dni){
	$datos=traerusuariomodificar($dni);
	if (is_string($datos)){
		echo $datos;
	}else{
		$fila = mysqli_fetch_assoc($datos);
		return$fila;

			}

}

function mostrarranking(){
	guardarusuariorank();
	$resultado="";
	$datos=getranking();
	if (is_string($datos)){
		echo $datos;
	}else{
		while ($fila = mysqli_fetch_assoc($datos)){
		$resultado.= "<tr>
		<td> ". $fila["dni"]. "</td>
		<td> ". $fila["nombre"]. "</td>
		<td> ". $fila["puntos_acumulados"]. "</td>
			</tr>";
   }
  }
 return $resultado;
}

?>





