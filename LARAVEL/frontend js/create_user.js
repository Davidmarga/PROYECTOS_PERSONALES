const API_URL = 'http://localhost:8000/api'; // Cambia si tu backend corre en otro puerto/dominio
const createUserForm = document.getElementById('createUserForm');

// Crear nuevo usuario

    createUserForm.addEventListener('submit',async (e) => {
    e.preventDefault();

    // limpiar errores por si los tengo de antes, cada vez que le de al boton de submit
    document.querySelectorAll('.error').forEach(error => error.textContent = "");
    document.querySelectorAll('input').forEach(error => error.classList.remove('invalid'));
    document.getElementById('success-msg').textContent = '';


    const name = document.getElementById("usuario");
    const email = document.getElementById("email");
    const password = document.getElementById("contraseña");
    const passwordCheck = document.getElementById("contraseñaCheck");

    let hasError = false;

    if (!name.value.trim()){
        setError(name,'El nombre es obligatorio');
        hasError = true;
    }
    if (!email.value.trim()|| !email.value.includes('@')){
        setError(email, 'Email invalido.');
        hasError = true;
    }
    if (!password.value || password.value.length <6){
        setError(password, 'la contraseña debe tener al menos 6 caracteres.')
        hasError = true;
    }
    if (password.value !== passwordCheck.value) {
    setError(contraseñaCheck, 'Las contraseñas no coinciden.');
    hasError = true;
    }

    if (hasError) return;


    try {
        const res = await fetch (`${API_URL}/register`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
                password_confirmation: passwordCheck.value,
                })
        });

        const data = await res.json();
        if (!res.ok){  
        alert(data.message || 'Error al registrar usuario');
            return;
        }

        document.getElementById('success-msg').textContent = 'Usuario creado correctamente';
        createUserForm.reset();
    } catch (error){
    alert('algo ha fallado');
    }
});

function setError(field, message){
    field.classList.add('invalid');
    const errorDiv = document.getElementById(`error-${field.id}`);
    if (errorDiv) errorDiv.textContent = message;    
}