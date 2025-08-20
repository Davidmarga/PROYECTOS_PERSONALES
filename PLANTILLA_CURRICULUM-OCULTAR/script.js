document.addEventListener("DOMContentLoaded", function(){
      
    
    const formulario = document.getElementById("formulario");
    const erroresDiv = document.getElementById("errores");

    formulario.addEventListener("submit", function (event){
        console.log("validacion activada");
        erroresDiv.innerHTML=""; //para limpiar errores anteriores
        let errores = [];

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();

        if (nombre===""){
            errores.push("el nombre es obligatorio.");
        }

        if (telefono === "" || !/^\d+$/.test(telefono)) {
            errores.push("El teléfono debe contener solo números.");
        }

        if (email ===""|| !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
            errores.push("el email no es valido");
        }


        if (errores.length>0) {
            event.preventDefault(); //evitamos el envio
            errores.forEach(error=>{
                const p = document.createElement("p");
                p.textContent=error;
                p.style.color="red";
                erroresDiv.appendChild(p);
            });
        }
    });
});