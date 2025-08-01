<!DOCTYPE html>
<html>
<head>
    <title>Listado de Tareas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light p-4">
    <div class="container">
        <h1 class="mb-4">Listado de Tareas</h1>

        <a href="{{ route('tasks.create') }}" class="btn btn-primary mb-3">+ Nueva Tarea</a>

        <form method="GET" action="{{ route('tasks.index') }}" class="row mb-4 g-2">
    <div class="col-md-3">
        <select name="user_id" class="form-select">
            <option value="">-- Todos los usuarios --</option>
            @foreach (\App\Models\User::all() as $user)
                <option value="{{ $user->id }}" {{ request('user_id') == $user->id ? 'selected' : '' }}>
                    {{ $user->name }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="col-md-3">
        <select name="category_id" class="form-select">
            <option value="">-- Todas las categorías --</option>
            @foreach (\App\Models\Category::all() as $category)
                <option value="{{ $category->id }}" {{ request('category_id') == $category->id ? 'selected' : '' }}>
                    {{ $category->name }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="col-md-3">
        <select name="status" class="form-select">
            <option value="">-- Todas --</option>
            <option value="completed" {{ request('status') == 'completed' ? 'selected' : '' }}>Completadas</option>
            <option value="pending" {{ request('status') == 'pending' ? 'selected' : '' }}>Pendientes</option>
        </select>
    </div>

    <div class="col-md-3 d-flex gap-2">
        <button type="submit" class="btn btn-primary">Filtrar</button>
        <a href="{{ route('tasks.index') }}" class="btn btn-secondary">Limpiar</a>
    </div>
</form>

        <table class="table table-bordered table-hover bg-white">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Usuario</th>
                    <th>Categoría</th>
                    <th>¿Completada?</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($tasks as $task)
                    <tr>
                        <td>{{ $task->id }}</td>
                        <td>{{ $task->title }}</td>
                        <td>{{ $task->description }}</td>
                        <td>{{ $task->user->name ?? 'N/A' }}</td>
                        <td>{{ $task->category->name ?? 'Sin categoría' }}</td>
                        <td>
                            <form action="{{ route('tasks.toggleCompleted', $task->id) }}" method="POST" style="display:inline;">
                            @csrf
                             @method('PATCH')
                              <button type="submit" class="btn btn-sm {{ $task->is_completed ? 'btn-success' : 'btn-outline-secondary' }}">
                                 {{ $task->is_completed ? 'Completada' : 'Pendiente' }}
                                 </button>
                             </form>
                        </td>
                        <td>
                            <a href="{{ route('tasks.edit', $task->id) }}" class="btn btn-sm btn-warning">Editar</a>

                            <form action="{{ route('tasks.destroy', $task->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-sm btn-danger" onclick="return confirm('¿Eliminar esta tarea?')">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7">No hay tareas.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</body>
</html>