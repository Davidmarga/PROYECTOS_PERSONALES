let idGlobal = 1

class Tarea{
    constructor (id, descripcion){
        this.id = id;
        this.descripcion = descripcion;
        this.completada=false;
    }
}
let listaDeTareas = [];

function mostrarTareas(){
    const Tareas =document.getElementById("lista");
    Tareas.innerHTML="";

    const filtro = document.getElementById("filtro")?.value || "todas";
    
    const tareasFiltradas = listaDeTareas.filter(t=>{
        if (filtro === "completadas") return t.completada;
        if (filtro === "pendientes") return !t.completada;
        return true; //para todas
    });

    for(let i=0; i<tareasFiltradas.length; i++){
        const tarea = tareasFiltradas[i];
        const tareaElement = document.createElement("li");
        tareaElement.innerHTML='<strong> Tarea: </strong>' + tarea.descripcion + " " + 'Completada:' + (tarea.completada ? "✅" : "❌") + '<button onclick="marcarTareaCompletada('+ tarea.id + ')">Completada</button>' + '<button onclick="eliminarTarea(' + tarea.id + ')"> Eliminar </button>' + '<button onclick ="modificarTarea('+ tarea.id + ')">Modificar</button>';
        Tareas.appendChild(tareaElement);
    }
}
function agregarTarea(){
    let descripcion = document.getElementById("tarea").value;
    const nuevaTarea = new Tarea (idGlobal,descripcion); 
    listaDeTareas.push(nuevaTarea);
    idGlobal++
    document.getElementById("tarea").value="";
    guardarenlocalstorage();
    mostrarTareas();
}
function marcarTareaCompletada(id){
    const tarea = listaDeTareas.find((t)=> t.id === id);
    if (tarea){
        tarea.completada = !tarea.completada;
    }
    guardarenlocalstorage();
    mostrarTareas();
}
function modificarTarea(id){
    const tarea = listaDeTareas.find((t)=> t.id === id);
    if(tarea){
        const nuevaDescripcion =prompt("Editar tarea:", tarea.descripcion);
        if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== "") {
            tarea.descripcion=nuevaDescripcion;
            guardarenlocalstorage();
            mostrarTareas();
    }
}
}

function eliminarTarea(id){
    const index = listaDeTareas.findIndex((t)=>t.id === id);
    listaDeTareas.splice(index,1); //el 1 indica eliminar solo 1 elemento
    guardarenlocalstorage();
    mostrarTareas();
}
function guardarenlocalstorage(){
    localStorage.setItem("tareas", JSON.stringify(listaDeTareas));
    localStorage.setItem("ultimoId", idGlobal.toString());
}
function cargardesdelocalstorage(){
    const tareasGuardadas = localStorage.getItem("tareas");
    const ultimoIdGuardado = localStorage.getItem("ultimoId");

    if(tareasGuardadas){
        const tareasParseadas = JSON.parse(tareasGuardadas);
      listaDeTareas = tareasParseadas.map(t => {
    const tarea = new Tarea(t.id, t.descripcion);
    tarea.completada = t.completada; // ✅ Copiamos también su estado
    return tarea;
});
    }
       if (ultimoIdGuardado) {
        idGlobal = parseInt(ultimoIdGuardado);
}
mostrarTareas();
}


window.onload=cargardesdelocalstorage;