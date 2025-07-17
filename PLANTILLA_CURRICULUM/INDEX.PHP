<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Introducir datos</title>
<script>
    let contadorexp = 1;
    let contadorform = 1;
    let contadorapt = 1;

    function agregarExperiencia(){
        contadorexp++;

        const nuevoInput = document.createElement("input");
        nuevoInput.type="text";
        nuevoInput.name="experiencia"+contadorexp;
        nuevoInput.id="experiencia"+contadorexp;
        nuevoInput.className="campo-texto";
        nuevoInput.placeholder="Experiencia"+contadorexp;

        const salto1 =document.createElement("br");
        const salto2 =document.createElement("br");

        const contenedor = document.getElementById("experiencias");
        contenedor.appendChild(salto1);
        contenedor.appendChild(nuevoInput);
        contenedor.appendChild(salto2);
    }
    function agregarFormacion(){
        contadorform++;

        const nuevoInput =document.createElement("input");
        nuevoInput.type="text";
        nuevoInput.name="formacion"+contadorform;
        nuevoInput.id="formacion"+contadorform;
        nuevoInput.placeholder="Formacion"+contadorform;
        nuevoInput.className="campo-texto";

        const salto1 =document.createElement("br");
        const salto2 =document.createElement("br");

        const contenedor = document.getElementById("formaciones");
        contenedor.appendChild(salto1);
        contenedor.appendChild(nuevoInput);
        contenedor.appendChild(salto2);
    }

        function agregarAptitud(){
        contadorapt++;

        const nuevoInput =document.createElement("input");
        nuevoInput.type="text";
        nuevoInput.name="aptitud"+contadorapt;
        nuevoInput.id="aptitud"+contadorapt;
        nuevoInput.placeholder="Aptitud"+contadorapt;
        nuevoInput.className="campo-texto";

        const salto1 =document.createElement("br");
        const salto2 =document.createElement("br");

        const contenedor = document.getElementById("aptitudes");
        contenedor.appendChild(salto1);
        contenedor.appendChild(nuevoInput);
        contenedor.appendChild(salto2);
    }


</script>
<link rel="stylesheet" href="estilos.css">
</head>

<body>
    <h1>INTRODUCIR DATOS PERSONALES</h1>
    <form id="formulario" action=PLANTILLA.PHP method="post" class="formulario-cv">
        <label for= "nombre" class="etiqueta">Nombre:</label><br>
        <input type="text" id="nombre" name="nombre" class="campo-texto"> <br><br>
        <label for="telefono" class="etiqueta"> Telefono </label><br>
        <input type="text" id="telefono" name="telefono" class="campo-texto"><br><br>
        <label for="email" class="etiqueta"> Email<br>
        <input type="text" id="email" name="email" class="campo-texto"><br><br>
        <div id="formaciones" class="bloque-formacion">
            <label for="formacion1" class="etiqueta">Formacion:</label><br>
            <input type="text" id="formacion1" name="formacion1" class="campo-texto"><br><br>
        </div>
        <button type="button" onclick="agregarFormacion()"class="boton-agregar">Agregar formacion</button><br><br>

        <div id="experiencias"class="bloque-experiencia">
            <label for="experiencia1"class="etiqueta">Experiencia: </label><br>
            <input type="text"id="experiencia1"name="experiencia1"class="campo-texto"><br><br>
        </div>
        <button type="button" onclick="agregarExperiencia()"class="boton-agregar">Agregar experiencia</button><br><br>

        <div id="aptitudes"class="bloque-aptitudes">
            <label for="aptitud1"class="etiqueta">Aptitud: </label><br>
            <input type="text"id="aptitud1"name="aptitud1"class="campo-texto"><br><br>
        </div>
        <button type="button" onclick="agregarAptitud()"class="boton-agregar">Agregar aptitud</button><br><br>


     

        <input type="submit" value="Enviar"class="boton-enviar">
        <div id="errores" class="errores"></div>


    </form>
    <script src="script.js"></script>
</body>
</html>