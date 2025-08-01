const API_URL = 'http://localhost:8000/api'; // Cambia si tu backend corre en otro puerto/dominio
let token = localStorage.getItem('token');

// Referencias al DOM
const loginSection = document.getElementById('login-section');
const tasksSection = document.getElementById('tasks-section');
const loginForm = document.getElementById('login-form');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const logoutBtn = document.getElementById('logout-btn');


// Mostrar la UI adecuada
function updateUI() {
    if (token) {
        loginSection.style.display = 'none';
        tasksSection.style.display = 'block';
        fetchTasks();
    } else {
        loginSection.style.display = 'block';
        tasksSection.style.display = 'none';
    }
}

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) throw new Error('Credenciales inválidas');

        const data = await res.json();
        token = data.token;
        localStorage.setItem('token', token);
        updateUI();
    } catch (error) {
        alert(error.message);
    }
});



// Logout
logoutBtn.addEventListener('click', async () => {
    await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.removeItem('token');
    token = null;
    updateUI();
});

// Obtener tareas
async function fetchTasks() {
    try {
        const res = await fetch(`${API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const tasks = await res.json();

        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.title} (${task.is_completed ? '✅' : '❌'}) - Usuario: ${task.user?.name ?? 'Sin nombre'} - Categoría: ${task.category?.name ?? 'Sin categoría'}`;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener tareas', error);
    }
}

// Crear tarea
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevaTarea = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        user_id: parseInt(document.getElementById('user_id').value),
        category_id: parseInt(document.getElementById('category_id').value),
        completed: document.getElementById('completed').checked
    };

    try {
        const res = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(nuevaTarea)
        });

        if (!res.ok) throw new Error('Error al crear la tarea');

        const task = await res.json();
        alert('Tarea creada');
        fetchTasks();
        taskForm.reset();
    } catch (error) {
        alert(error.message);
    }
});

// Al iniciar la página
updateUI();