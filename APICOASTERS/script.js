let allCoasters = [];
let selectedCoaster = null;
let savedCoasters=[];
let credits=0;
async function cargarCoasters() {
  try {
    const resp = await fetch('http://localhost:3000/coasters');
    const data = await resp.json();
    allCoasters = data.member;
    mostrarCoasters(allCoasters);
  } catch (error) {
    console.error('Error cargando coasters:', error);
  }
}

function mostrarCoasters(lista) {
  const select = document.getElementById('coasterSelect');
  select.innerHTML = ''; // Limpiar opciones

  lista.forEach(coaster => {
    const option = document.createElement('option');
    option.value = coaster.id;
    option.textContent = coaster.name;
    select.appendChild(option);
  });

    if (lista.length === 1) {
    select.value = lista[0].id;
    const event = new Event('change');
    select.dispatchEvent(event);
  }
}

function filtrarCoasters(texto) {
  const textoLower = texto.toLowerCase();
  const filtrados = allCoasters.filter(coaster =>
    coaster.name.toLowerCase().includes(textoLower)
  );
  mostrarCoasters(filtrados);
}

document.getElementById('searchInput').addEventListener('input', e => {
  filtrarCoasters(e.target.value);
});

function filtrarParques(texto){
const textoLower = texto.toLowerCase();
const filtrados = allCoasters.filter(coaster =>
(coaster.park.name?.toLowerCase()??'').includes(textoLower)
  );
  mostrarCoasters(filtrados);
}

document.getElementById('parkInput').addEventListener('input', e => {
  filtrarParques(e.target.value);
});


document.getElementById('coasterSelect').addEventListener('change', async e => {
  const idSeleccionado = e.target.value;
  const selectedCoaster = allCoasters.find(c => c.id == idSeleccionado);

  if (selectedCoaster) {
    const name = selectedCoaster.name ?? 'Desconocido'; 
    const rank = selectedCoaster.rank ?? '9999';
    const parkName = selectedCoaster.park.name ?? 'Desconocido';
    const id = selectedCoaster.id;


    try{
        const resp = await fetch(`http://localhost:3000/coasters/${id}`);
        const data2= await resp.json();

        const country = data2.park?.country?.name?.replace('country.','') ?? 'Desconocido'; 
        const picture = data2.mainImage?.path ?? '';
        const manufacturer = data2.manufacturer?.name ?? 'Desconocido';
        const modelo = data2.model?.name ?? 'Desconocido';
        const imgHTML = picture ? `<img src="https://pictures.captaincoaster.com/1440x1440/${picture}" alt="${name}"/>` : '';
    


 contenedor=document.getElementById('selectedCoaster');
 contenedor.innerHTML = `
  <div class="coaster-content">
    <div class="coaster-text">
      <p>Nombre: ${name}</p>
      <p>Ranking: ${rank}</p>
      <p>Parque: ${parkName}</p>
      <p>País: ${country}</p>
      <p>Fabricante: ${manufacturer}</p>
      <p>Modelo: ${modelo}</p>
    </div>
      <div class="coaster-img">
      ${imgHTML}
    </div>
  </div>
`;
  const botonGuardar=document.createElement('button');
  botonGuardar.textContent='Guardar';
  botonGuardar.id='guardarCoaster';
  botonGuardar.addEventListener('click',() => {
    guardarCoaster(id,name,rank,parkName,country,manufacturer,modelo,picture);
  });
  contenedor.appendChild(botonGuardar);
} 
catch (error) {
    console.error('Error al obtener detalles de la coaster:', error);
    document.getElementById('selectedCoaster').innerHTML = '<p>Error al obtener detalles.</p>';
  }
  }
});

function guardarCoaster(id, name, rank, parkName, country, manufacturer, modelo, picture){
const data = {
    id,
    name,
    rank,
    parkName,
    country,
    manufacturer,
    modelo,
    picture
};
fetch('controller.php',{
    method:'post',
    headers:{
        'content-type' : 'application/json'
    },
    body: JSON.stringify(data)
})
.then(resp=>resp.json())
.then(result=>{
    if (result.success){
        alert('coaster guardada correctamente');
        cargarGuardadas();
    }
    else {
        alert ('error al guardar: ' + result.message);
    }
})
.catch(error=>{
    console.error('error en la peticion', error);
    alert('esta coaster ya esta guardada');
});
}

async function cargarGuardadas(){
    try{
        const resp = await fetch('controller.php'); //get por defecto, asi que llamara al metodo que tenemos con get
        const data = await resp.json();

        if (data.success){
            savedCoasters=data.data; // guardamos toda la respuesta en esta variable
            llenarFiltros(savedCoasters); // llamamos a esta funcion con todas las coasters de nuestra bbdd
            mostrarGuardadas(savedCoasters); //de momento mostramos todas
        }else{
            console.error(data.message);
           }
        }
        catch (error){
            console.error ('error al cargar coasters', error);
        }
}

function llenarFiltros(lista){
    //usamos set para obtener valores unicos
    const countries = new Set();
    const manufacturers = new Set();
    const parks = new Set();

    lista.forEach(c =>{
        if(c.Country) countries.add(c.Country);
        if(c.Manufacturer) manufacturers.add(c.Manufacturer);
        if(c.ParkName) parks.add(c.ParkName);
    });
llenarSelect('filterCountry', countries);
llenarSelect('filterManufacturer', manufacturers);
llenarSelect('filterPark', parks);
}

function llenarSelect(idSelect, itemsSet){
    const select = document.getElementById(idSelect);
    select.innerHTML= '<option value="">Todos</option>'; // limpiamos la opcion por defecto
    Array.from(itemsSet).sort().forEach(item=>{
        const option = document.createElement('option');
        option.value = item;
        option.textContent=item;
        select.appendChild(option);
    });
}

function filtrarGuardadas(){
    const country = document.getElementById('filterCountry').value;
    const manufacturer = document.getElementById('filterManufacturer').value;
    const park = document.getElementById('filterPark').value;

    const filtrados = savedCoasters.filter(c=>{
        return (country === '' || c.Country === country)
        && (manufacturer === '' || c.Manufacturer === manufacturer)
        && (park === '' || c.ParkName === park);
        
    });
    mostrarGuardadas(filtrados);
}


function mostrarGuardadas(lista){
    console.log('Mostrando coasters guardadas:', lista);
    const contenedor = document.getElementById('guardadas');
    contenedor.innerHTML="";
    credits=0;

    lista.forEach(coaster => {
        const div = document.createElement('div');
        div.innerHTML=`
        <h3>${coaster.Name}</h3>
      <p>Parque: ${coaster.ParkName} | País: ${coaster.Country} | Modelo: ${coaster.Modelo} |Fabricante: ${coaster.Manufacturer} | Ranking: ${coaster.Rank}</p>
      <img src="https://pictures.captaincoaster.com/1440x1440/${coaster.Picture}" alt="${coaster.Name}" width="300"/>
      <button onclick="borrarCoaster('${coaster.Id}')">Borrar</button>
      <hr/>`;
    contenedor.appendChild(div);
    credits++;
    const sumaCredits = document.getElementById('credits');
    sumaCredits.innerHTML=`Total de credits: ${credits}`;
        
    });
}

function borrarCoaster(id){
if (!confirm('¿Seguro que quieres borrar esta coaster?')) return;
  
        fetch(`controller.php?id=${id}`, {
      method: 'DELETE',
  })
  
  .then(resp=> resp.json())
  .then(result=>{
    if(result.success){
        alert ('coaster borrada correctamente');
        cargarGuardadas();

    } else{
        alert('error al borrar' + result.message);
    }
  })
.catch(error=>{
    console.error('error en la peticion delete:', error);
    alert('error en la peticion');
});
}

window.onload = function(){
cargarGuardadas();
document.getElementById('filterCountry').addEventListener('change', filtrarGuardadas);
document.getElementById('filterManufacturer').addEventListener('change', filtrarGuardadas);
document.getElementById('filterPark').addEventListener('change', filtrarGuardadas);
cargarCoasters();
} ;



