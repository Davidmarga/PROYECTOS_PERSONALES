// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //


const Npartidas=document.querySelector('input[name="partidas"]');
const nombreJugador=document.querySelector('input[name="nombre"]');
let Partidahtml=document.getElementById('actual');
let Totalpartidashtml=document.getElementById('total');
let Partidaactual=0

console.log(Npartidas);
console.log(nombreJugador);
console.log(Partidahtml);
console.log(Totalpartidashtml);
console.log(Partidaactual);

var maquinaeleccion=document.getElementsByTagName('img')[3];

var Usuarioeleccion = 'piedra';

let maquinaeleccionclase

var imprimeresultado = document.getElementById('historial');
var resultado;

var botonJugar=document.getElementsByTagName('button')[0];
let Usuariopiedra=document.getElementsByTagName('img')[0];
let Usuariopapel=document.getElementsByTagName('img')[1];
let Usuariotijera=document.getElementsByTagName('img')[2];
Usuariopiedra.src = "img/piedraJugador.png";
Usuariopapel.src = "img/papelJugador.png";
Usuariotijera.src = "img/tijeraJugador.png";

Usuariopiedra.onclick=function(){
    Usuariopiedra.classList.add ('seleccionado');
    Usuariopiedra.classList.remove ('noSeleccionado');
    Usuariopapel.classList.add ('noSeleccionado');
    Usuariopapel.classList.remove ('seleccionado');
    Usuariotijera.classList.add ('noSeleccionado');
    Usuariotijera.classList.remove ('seleccionado');
    Usuarioeleccion='piedra'
};

Usuariopapel.onclick=function(){
    Usuariopiedra.classList.add ('noSeleccionado');
    Usuariopiedra.classList.remove ('seleccionado');
    Usuariopapel.classList.add ('seleccionado');
    Usuariopapel.classList.remove ('noSeleccionado');
    Usuariotijera.classList.add ('noSeleccionado');
    Usuariotijera.classList.remove ('seleccionado');
    Usuarioeleccion='papel'
};

Usuariotijera.onclick=function(){
    Usuariopiedra.classList.add ('noSeleccionado');
    Usuariopiedra.classList.remove ('seleccionado');
    Usuariopapel.classList.add ('noSeleccionado');
    Usuariopapel.classList.remove ('seleccionado');
    Usuariotijera.classList.add ('seleccionado');
    Usuariotijera.classList.remove ('noSeleccionado');
    Usuarioeleccion='tijera'
};


botonJugar.onclick=function(){
    if(nombreJugador.value.length<4){
        nombreJugador.classList.add ('fondoRojo')
        }
        else if (!isNaN(parseInt(nombreJugador.value.charAt(0)))){
            nombreJugador.classList.add ('fondoRojo')
        }

        else{
            nombreJugador.classList.remove('fondoRojo')

            if(Npartidas.value==0){
                Npartidas.classList.add('fondoRojo')
            }
            else if(Npartidas.value!==0){
                Npartidas.classList.remove('fondoRojo')    
    Totalpartidashtml.innerHTML=Npartidas.value;
    nombreJugador.disabled=true;
    Npartidas.disabled=true;
  
    

}



var botonYa=document.getElementsByTagName('button')[1];

botonYa.onclick=function(){
  
    if (Partidaactual<Npartidas.value){
       
        Partidaactual++;
        Partidahtml.innerHTML=Partidaactual;
    console.log(Partidaactual);
    let numero = parseInt(Math.random()*posibilidades.length);
    let eleccionMaquina = posibilidades[numero];
    if (eleccionMaquina==="piedra"){
    maquinaeleccion.src="img/piedraOrdenador.png";
    }
    else if (eleccionMaquina==="papel"){
        maquinaeleccion.src="img/papelOrdenador.png";
        }
    else if (eleccionMaquina==="tijera"){
        maquinaeleccion.src="img/tijeraOrdenador.png";
         }

if (eleccionMaquina===Usuarioeleccion){
    resultado="empate"
}
else if (eleccionMaquina==='piedra'&&Usuarioeleccion==='papel'){
    resultado="gana" + " " +nombreJugador.value
}
else if (eleccionMaquina==='piedra'&&Usuarioeleccion==='tijera'){
    resultado= "gana la maquina"
}
else if (eleccionMaquina==='papel'&&Usuarioeleccion==='tijera'){
    resultado= "gana" + " " + nombreJugador.value
}
else if (eleccionMaquina==='papel'&&Usuarioeleccion==='piedra'){
   resultado= "gana la maquina"
}
else if (eleccionMaquina==='tijera'&&Usuarioeleccion==='piedra'){
  resultado= "gana" + " " + nombreJugador.value
}
else if (eleccionMaquina==='tijera'&&Usuarioeleccion==='papel'){
    resultado= "gana la maquina"
}

imprimeresultado.innerHTML +="<li>"+resultado+"</li>";
}
}
}
};

var resetbutton=document.getElementsByTagName('button')[2];
resetbutton.onclick=function(){

    nombreJugador.disabled=false;
    Npartidas.disabled=false;
    Npartidas.value="0";
    Partidaactual=0;
    Partidahtml.innerHTML="0";
    Totalpartidashtml.innerHTML="0";
    maquinaeleccion.src="img/defecto.png";
    imprimeresultado.innerHTML += "<li>"+"Nueva partida"+"</li>";
}