<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TaskController;

Route::resource('tasks', TaskController::class);

// Ruta adicional para cambiar el estado de completado
Route::patch('/tasks/{task}/toggle-completed', [TaskController::class, 'toggleCompleted'])->name('tasks.toggleCompleted');

Route::redirect('/', '/tasks');