
let totalPedido=0

class comida {
constructor(nombre,precio){
    this.nombre=nombre;
    this.precio=precio;
    this.enlace="imagenes/"+this.nombre+".jpg"
  }    
}

const menuRestaurante=[
    new comida("agua", 1.50),
    new comida("bowl",10.90),
    new comida("burguer",14.90),
    new comida("cerveza",2.90),
    new comida("cola",3.50),
    new comida("fajitas", 14.90),
    new comida("fideos",12.90),
    new comida("hotdog",10.90),
    new comida("lasaña", 14.90),
    new comida("paella",16.90),
    new comida("pan",3.90),
    new comida("pasta",12.90),
    new comida("tortitas",6.90),
    new comida("tradicional",16.90),
];


function cargarComida(){
    let contador=0
    const clases=document.getElementsByClassName("info");
    const imagenes = document.getElementsByClassName("imagen");
    const botones = document.getElementsByTagName("button");
    const inputs = document.getElementsByTagName("input");

    for (let i=0;i<menuRestaurante.length; i++){
        if (clases [contador]){
            clases[contador].textContent=menuRestaurante[i].nombre;
        }
            contador++;
        if (clases[contador]){
            clases[contador].textContent=menuRestaurante[i].precio.toFixed(2) + "€";
            }
            contador++;
        if(imagenes[i]){
            imagenes[i].src=menuRestaurante[i].enlace;
            imagenes[i].alt=`imagen de ${menuRestaurante[i].nombre}`;
        }
        if (botones[i]&& inputs[i]) {
            botones[i].addEventListener("click", function(){
            const cantidad = parseInt(inputs[i].value);
            if (isNaN(cantidad)||cantidad<=0){
                alert("por favor introduce una cantidad valida");
                return;
            }
            const nombre = menuRestaurante[i].nombre;
            const precio =menuRestaurante[i].precio;
            const total=(precio*cantidad).toFixed(2);

            const lista = document.getElementById("lista-pedido");
            const totalElemento = document.getElementById("total-final");

            totalPedido += precio*cantidad

            totalElemento.textContent = `Total: ${totalPedido.toFixed(2)} €`;

            const item = document.createElement("li");

            item.textContent = `${cantidad} × ${nombre} (${precio.toFixed(2)} €) = ${total} €`;
            lista.appendChild(item);

             inputs[i].value = "";
        });      
    }
}
}

window.addEventListener("DOMContentLoaded",cargarComida);


