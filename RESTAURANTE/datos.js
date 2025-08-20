


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
    const menuContenedor = document.getElementById("menu");

    menuRestaurante.forEach(plato =>{

        const item = document.createElement("div");
        item.className= "contenedor";

        const imagen = document.createElement("img");
        imagen.className="imagen";
        imagen.src=plato.enlace;
        imagen.alt = `imagen de ${plato.nombre}`;

        const grupo = document.createElement("div");
        grupo.className="input-group";

        const articulo = document.createElement("p");
        articulo.className="info";
        articulo.innerHTML=plato.nombre;

        const precio = document.createElement("p");
        precio.className="info2";
        precio.innerHTML=plato.precio.toFixed(2) + "€";

        const cantidad = document.createElement("input");
        cantidad.type="number";
        cantidad.placeholder = "cantidad";

        const ok = document.createElement("button");
        ok.textContent="Confirmar";

            // Añadir elementos al grupo
           grupo.appendChild(articulo);
           grupo.appendChild(precio);
           grupo.appendChild(cantidad);
           grupo.appendChild(ok);

    // Añadir imagen y grupo al item
           item.appendChild(imagen);
           item.appendChild(grupo);

    // Añadir item al contenedor principal
           menuContenedor.appendChild(item);

ok.addEventListener("click", () => {
    const cantidadValor = parseInt (cantidad.value);

    if (isNaN(cantidadValor) || cantidadValor <= 0) {
    alert("Por favor, introduce una cantidad válida.");
    return;
      }
const total = (plato.precio*cantidadValor).toFixed(2);
totalPedido+= parseFloat(total);

const lista = document.getElementById("lista-pedido");
const totalElemento = document.getElementById("total-final");

const pedidoItem = document.createElement ("li");
pedidoItem.textContent = `${cantidadValor} x ${plato.nombre} (${plato.precio.toFixed(2)}€) = ${total}€`;
lista.appendChild(pedidoItem);
totalElemento.textContent = `Total: ${totalPedido.toFixed(2)}€`;

cantidad.value="";

});
    });
}

window.addEventListener("DOMContentLoaded",cargarComida);


