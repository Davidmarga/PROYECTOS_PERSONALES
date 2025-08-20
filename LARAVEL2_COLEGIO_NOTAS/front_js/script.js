
let token ='';
let user = '';

//LOGIN

document.getElementById('loginform').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

//COMPROBACION FORMATO EMAIL 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
        alert('Por favor introduce un email valido');
        return //detiene el envio
    }
    if (password.length <6 ){
        alert('la contraseña debe tener al menos 6 caracteres');
        return;
    }

    try{const resp = await fetch ('http://localhost:8000/api/login',{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email,password})
    });
    const data = await resp.json();
    if (resp.ok){
        token = data.token;
        user=data.user;
        renderPanel();
    }else{
        alert(data.message||'Error al autenticar');
    }
    }
    catch(error){
        console.error('error en la solicitud', error);
        alert('error al conectar al servidor');
    }
}

async function renderPanel() {
//sacar boton y formulario de login, y volver a presentar cuando el usuario haya hecho logout
const formLogin = document.getElementById('loginform');
formLogin.setAttribute('hidden','');
document.querySelector('H1').setAttribute('hidden','');

const div = document.getElementById('contentlogout');
div.innerHTML=`<h2>Hola,${user.name}(${user.is_admin ? 'admin':'Alumno'})</h2>
<button id = "btn-logout">Cerrar Sesion</button>
<button hidden id = "btnAgregar">Agregar usuarios</button>
<button hidden id = "btnEliminar">Eliminar usuarios</button>

<form hidden id="nuevoUsuario">
    <h3>Introducir datos para el nuevo usuario</h3>
    <label for="name">Nombre</label>
    <input type="text" id="crName" placeholder="Nombre"/>

    <label for="email">Correo</label>
    <input type="email" id="crEmail" placeholder = "Correo"/>

    <label for="contraseña">Password</label>
    <input type="password" id="crPassword" placeholder="Contraseña"/>

    <label for="confcontraseña">Confirmar Password</label>
    <input type="password" id="crConfPassword" placeholder="Repetir Contraseña"/>

    <label for="is_admin">Administrador</label>
    <input type="checkbox" id="is_admin"/>

    <button type="submit" id="sendForm">Crear Usuario</button>
</form>`;

//LOGOUT

const logoutBtn = document.getElementById('btn-logout');
logoutBtn.addEventListener('click', async () => {
    await fetch('http://localhost:8000/api/logout',{
        method:'POST',
        headers:{Authorization:`Bearer ${token}`}
    });

 formLogin.removeAttribute('hidden');
 location.reload();//recarga de nuevo toda la pagina, para que al no haber token, salga el formulario de login y nada mas 

});
const btnAgregar = document.getElementById('btnAgregar');
const btnEliminar = document.getElementById('btnEliminar');
const formNuevoUsuario=document.getElementById('nuevoUsuario');

if (user.is_admin){
    btnAgregar.removeAttribute("hidden");
    btnEliminar.removeAttribute("hidden");

    //AGREGAR NUEVOS USUARIOS

    btnAgregar.addEventListener('click',() => {
        formNuevoUsuario.removeAttribute("hidden");
    });

    formNuevoUsuario.addEventListener('submit', async(e)=>{
        e.preventDefault(); //para evitar que la pagina se recargue

        const name = document.getElementById("crName").value;
        const email = document.getElementById("crEmail").value;
        const password = document.getElementById("crPassword").value;
        const passwordCheck = document.getElementById("crConfPassword").value;
        const is_admin = document.getElementById("is_admin").checked;


if (password===passwordCheck){

    try{

    const response = await fetch ('http://localhost:8000/api/admin/usuarios',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            Authorization:`Bearer ${token}`
        },
        body : JSON.stringify({
            name,
            email,
            password,
            is_admin
        })
    });

    if(response.ok){
    alert ("Usuario creado correctamente");
    formNuevoUsuario.hidden=true;
    loadUsers();
    }
    }catch(error){
        alert ("Error al crear el usuario:");
    }
}
else{alert ("Las contraseñas no cocinciden");
    return;
}

});

//ELIMINAR USUARIOS

 btnEliminar.addEventListener('click',async ()=>{

  const resp=await fetch ('http://localhost:8000/api/usuarios',{
        headers : {
            Authorization:`Bearer ${token}`
        }
    });
   const usuarios=await resp.json();

   const usuariosNoAdmin = usuarios.filter(u=> !u.is_admin);
   if (usuariosNoAdmin.length === 0){
    alert('No hay usuarios que se puedan eliminar');
    return;
   }

   const opciones=usuariosNoAdmin.map(u=>`${u.user_id} : ${u.nombre}`).join('\n');
   const selection = prompt (`Selecciona el ID del usuario a borrar:\n${opciones}`);

   const usuarioEliminar = parseInt(selection);
   if (isNaN(usuarioEliminar)){
    alert('ID NO VALIDO');
    return;
   }

const r = await fetch (`http://localhost:8000/api/admin/usuarios/${usuarioEliminar}`,{
          method: 'DELETE',
          headers : {
            Authorization:`Bearer ${token}`
        }
});
loadUsers();
});

}

//MOSTRAR PANEL SI ES ALUMNO

const divUsuarios = document.getElementById('contentusuarios');//EN OTRO DIV PORQUE SI LO PONGO EN EL MISMO DABA PROBLEMAS
if (!user.is_admin){
    
    const r = await fetch ('http://localhost:8000/api/alumno/asignaturas',{//esta api viene con un request en la que se le deberia pasar el usuario,
                                                                          //  pero como pasa por sanctum, con el token, nos devolvera el usuario directamente
        headers:{Authorization: `Bearer ${token}`}//si no ponemos nada de method post, es que el metodo es get
    });
    const dataalumno = await r.json();
    divUsuarios.innerHTML+=`<h3>Mis asignaturas</h3>`;
    dataalumno.asignaturas.forEach (a =>{
        divUsuarios.innerHTML += `<p> ${a.nombre}: ${a.nota ?? '-'}</p>`;
    });
}else{
    //user es admin
    divUsuarios.innerHTML += `<h3>Panel Administrador</h3>
    <div id="admin-content"></div>`;
   loadUsers();
   document.getElementById('contentlogout').classList.add('show');
   document.getElementById('contentusuarios').classList.add('show');
}
}

//MOSTRAR ALUMNOS A ADMINISTRADOR

async function loadUsers(){
    const r = await fetch ('http://localhost:8000/api/admin/usuarios',{
        headers:{Authorization: `Bearer ${token}`}//aqui lo mismo, como no pongo method post es get, y con get esta ruta nos lleva al metodo index all, 
        // vamos a pasar el token por sanctum, por lo que el user va a ser el admin, y aunque la funcion de laravel no acepte parametros, comprueba 
        // que el usuario que la esta ejecutando sea el admin.


    });
    const users = await r.json();
    const div2 = document.getElementById('admin-content');
    div2.innerHTML="";//cada vez que hagamos load users, vaciar los users que habia

users.forEach(u=> {
    const userDiv = document.createElement('div');
    const info = document.createElement('strong');
    info.textContent=`${u.nombre} (${u.email})`;
    userDiv.appendChild(info);

    const ul = document.createElement('ul');
    u.asignaturas.forEach(a=>{
        console.log('Asignatura:', a);
        const li = document.createElement('li');
        li.innerHTML = `
        <span class="asignatura-info">${a.nombre}: ${a.nota ?? '-'}</span>
        <div class="botones">
        <button data-user="${u.id}" data-asig="${a.id}" class="btnModif">modificar</button>
        <button data-user="${u.id}" data-asig="${a.id}" class="btnDel">borrar</button>
        </div>`;
        ul.appendChild(li);
    });
    userDiv.appendChild(ul);
    const btnAdd = document.createElement('button');
    btnAdd.textContent='añadir asignatura';
    btnAdd.classList.add('btnAdd');
    btnAdd.dataset.user = u.id;
    if(u.is_admin===false){
    userDiv.appendChild(btnAdd);}
    div2.appendChild(userDiv);
});

//Eventos para los botones
console.log("Botones modificar:");

document.querySelectorAll('.btnModif').forEach(btn =>{
    btn.addEventListener('click',()=>{
        const userId = btn.dataset.user;
        const asignaturaId = btn.dataset.asig;
        modifNota(userId,asignaturaId);

console.log(btn.dataset.user, btn.dataset.asig);


    });
 });
 
document.querySelectorAll('.btnDel').forEach(btn =>{
    btn.addEventListener('click',()=>{
        const userId = btn.dataset.user;
        const asignaturaId = btn.dataset.asig;
        delAsig(userId,asignaturaId);
    });
});

document.querySelectorAll('.btnAdd').forEach(btn =>{
    btn.addEventListener('click',()=>{
        const userId = btn.dataset.user;
        adAsig(userId);
    });
});

}

async function modifNota(userId, asignaturaId) {
    const nuevaNota = prompt('Introduce la nueva nota');
    if (nuevaNota === null) return;

    await fetch(`http://localhost:8000/api/admin/usuarios/${userId}/asignaturas/${asignaturaId}`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({nota:nuevaNota})
    });
    loadUsers();
}

async function delAsig (userId,asignaturaId){
    if (!confirm('Seguro que quieres eliminar esta asignatura?')) return;

    await fetch(`http://localhost:8000/api/admin/usuarios/${userId}/asignaturas/${asignaturaId}`,{
        method : 'DELETE',
        headers:{
        Authorization:`Bearer ${token}`
        }
    });
loadUsers();
}
async function adAsig(userId){
    // 1º obtener todas las asignaturas y asig id (es lo que hay que pasar por post)
    const resp = await fetch('http://localhost:8000/api/asignaturas',{
        headers:{
        Authorization: `Bearer ${token}`
        }
    });
    const asignaturas = await resp.json();

    // creamos un select

    const opciones = asignaturas.map(a=>`${a.id}: ${a.nombre}`).join('\n');
    const selection = prompt (`Selecciona el ID de la asignatura a asignar:\n${opciones}`);

    const asignatura_id = parseInt(selection);
    if (isNaN(asignatura_id)){
        alert('ID NO VALIDO');
        return;
    }
    
    // enviamos al backend la asignaturaid que hemos cogido

    const r = await fetch (`http://localhost:8000/api/admin/usuarios/${userId}/asignaturas`,{
        method : 'POST',
        headers:{
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body : JSON.stringify({asignatura_id})

    });

    const data = await r.json ();
    if (!r.ok){
        alert(data.message||'error al asignar');
    }
loadUsers();
}